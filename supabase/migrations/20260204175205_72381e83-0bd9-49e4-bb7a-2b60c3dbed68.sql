-- Fix leads table RLS policies
-- The table has no org_id, so policies should use Administrator role and assigned_to

-- Remove the broken leads_admin_all policy that references non-existent org_id through org_memberships
DROP POLICY IF EXISTS "leads_admin_all" ON public.leads;

-- Remove duplicate/inconsistent policies
DROP POLICY IF EXISTS "Only admins can read leads" ON public.leads;

-- Fix the overly permissive INSERT policy - only admins should be able to create leads
DROP POLICY IF EXISTS "Authenticated can submit leads" ON public.leads;

-- Create proper INSERT policy - only Administrators can create leads
CREATE POLICY "leads_insert_admin_only" ON public.leads
  FOR INSERT
  TO authenticated
  WITH CHECK (
    has_role_by_name(auth.uid(), 'Administrator')
  );