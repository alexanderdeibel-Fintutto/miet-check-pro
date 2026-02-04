-- Fix the leads_admin_all policy that grants public access
-- Drop the dangerous policy that allows public role
DROP POLICY IF EXISTS "leads_admin_all" ON public.leads;

-- Recreate a secure version that only allows authenticated org owners
CREATE POLICY "leads_admin_all" ON public.leads
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM org_memberships
      WHERE org_memberships.user_id = auth.uid()
        AND org_memberships.role = 'owner'
        AND org_memberships.status = 'active'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM org_memberships
      WHERE org_memberships.user_id = auth.uid()
        AND org_memberships.role = 'owner'
        AND org_memberships.status = 'active'
    )
  );