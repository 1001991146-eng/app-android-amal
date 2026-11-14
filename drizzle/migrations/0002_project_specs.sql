CREATE TABLE public.project_specs (
  user_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  db_type text,
  ai_path text NOT NULL DEFAULT 'none',
  ai_commitment boolean NOT NULL DEFAULT false,
  section6 text[] NOT NULL DEFAULT '{}',
  section9 text[] NOT NULL DEFAULT '{}',
  section10 text[] NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.project_specs TO authenticated;
GRANT ALL ON public.project_specs TO service_role;
ALTER TABLE public.project_specs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own spec" ON public.project_specs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Teachers read all specs" ON public.project_specs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Users insert own spec" ON public.project_specs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own spec" ON public.project_specs FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);