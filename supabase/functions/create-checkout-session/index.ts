import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Constants
const MAX_BODY_SIZE = 10 * 1024 // 10KB max request body

// Validation helpers
const isValidStripePrice = (priceId: unknown): priceId is string => {
  return typeof priceId === 'string' && 
         /^price_[a-zA-Z0-9]{10,}$/.test(priceId) &&
         priceId.length < 100;
};

const isValidRedirectUrl = (url: unknown): url is string => {
  if (typeof url !== 'string' || url.length > 500) return false;
  try {
    const parsed = new URL(url);
    // Allow only HTTPS and the project's domains
    const allowedHosts = [
      'id-preview--7e227598-ecf4-4726-b690-21b8b792ff2b.lovable.app',
      'localhost',
      '127.0.0.1'
    ];
    return (parsed.protocol === 'https:' || parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') && 
           allowedHosts.some(host => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
};

// Strict body validation - only allow known properties
const validateRequestBody = (body: unknown): { priceId: string; successUrl: string; cancelUrl: string } | null => {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return null;
  }
  
  const obj = body as Record<string, unknown>;
  const allowedKeys = new Set(['priceId', 'successUrl', 'cancelUrl', 'userId', 'userEmail']);
  const bodyKeys = Object.keys(obj);
  
  // Reject if unknown properties are present
  for (const key of bodyKeys) {
    if (!allowedKeys.has(key)) {
      return null;
    }
  }
  
  const { priceId, successUrl, cancelUrl } = obj;
  
  if (!isValidStripePrice(priceId)) return null;
  if (!isValidRedirectUrl(successUrl)) return null;
  if (!isValidRedirectUrl(cancelUrl)) return null;
  
  return { priceId, successUrl, cancelUrl };
};

// Sanitize user ID for metadata (allow only alphanumeric and hyphens)
const sanitizeUserId = (userId: string): string => {
  return userId.replace(/[^a-zA-Z0-9-]/g, '');
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY not configured')
      return new Response(
        JSON.stringify({ error: 'Konfigurationsfehler' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Verify auth
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const token = authHeader.replace('Bearer ', '')
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getUser(token)
    if (claimsError || !claimsData.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const user = claimsData.user

    // Check request body size
    const contentLength = req.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return new Response(
        JSON.stringify({ error: 'Anfrage zu groß' }),
        { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Read body with size limit
    const bodyText = await req.text()
    if (bodyText.length > MAX_BODY_SIZE) {
      return new Response(
        JSON.stringify({ error: 'Anfrage zu groß' }),
        { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let body: unknown
    try {
      body = JSON.parse(bodyText)
    } catch {
      return new Response(
        JSON.stringify({ error: 'Ungültiges JSON-Format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Strict validation of request body
    const validated = validateRequestBody(body)
    if (!validated) {
      return new Response(
        JSON.stringify({ error: 'Ungültige Anfrageparameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { priceId, successUrl, cancelUrl } = validated

    // Check for existing customer
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1
    })

    // Sanitize user ID for metadata
    const sanitizedUserId = sanitizeUserId(user.id)

    let customerId: string
    if (customers.data.length > 0) {
      customerId = customers.data[0].id
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: sanitizedUserId
        }
      })
      customerId = customer.id
    }

    // Create checkout session with sanitized metadata
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: sanitizedUserId
      },
      subscription_data: {
        metadata: {
          user_id: sanitizedUserId
        }
      }
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('[create-checkout-session] Error:', error)
    return new Response(
      JSON.stringify({ error: 'Ein Fehler ist aufgetreten' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
