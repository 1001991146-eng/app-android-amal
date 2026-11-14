ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers read class roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'teacher'));
COMMENT ON POLICY "Teachers read class roles" ON public.user_roles IS 'Allows the teacher dashboard to distinguish student accounts from teacher accounts.';