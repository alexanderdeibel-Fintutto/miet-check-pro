-- Fix overly permissive RLS policy on roles table
-- Issue: roles_public_read - "allow_all" policy exposes authorization structure

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "allow_all" ON public.roles;

-- Allow authenticated users to read system roles (org_id IS NULL) 
-- and org-specific roles only if they are members of that org
CREATE POLICY "roles_select_scoped" ON public.roles
  FOR SELECT TO authenticated
  USING (
    org_id IS NULL  -- system roles visible to all authenticated
    OR is_org_member(auth.uid(), org_id)  -- org roles only to org members
  );

-- Allow only administrators to manage roles (INSERT/UPDATE/DELETE)
CREATE POLICY "roles_admin_manage" ON public.roles
  FOR ALL TO authenticated
  USING (has_role_by_name(auth.uid(), 'Administrator'))
  WITH CHECK (has_role_by_name(auth.uid(), 'Administrator'));