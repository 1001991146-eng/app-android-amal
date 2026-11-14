// טופס "אפיון טכנולוגי ועמידה במחוון" — החישוב מתעדכן בזמן אמת עם כל סימון.
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  AI_PATHS, AiPath, ProjectSpec, SECTION10_TOPICS, SECTION6_TOPICS, SECTION9_TOPICS,
  VALID_DATABASES, evaluateSpec, specFromRow,
} from "@/data/rubricRules";
import { AlertTriangle, CheckCircle2, Info, Save, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const InfoTip = ({ text }: { text: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button type="button" aria-label="הסבר" className="text-muted-foreground hover:text-primary">
        <Info className="h-4 w-4" />
      </button>
    </TooltipTrigger>
    <TooltipContent className="max-w-xs text-right">{text}</TooltipContent>
  </Tooltip>
);

type ListKey = "section6" | "section9" | "section10";

const ProjectSpecForm = ({ userId }: { userId: string }) => {
  const { toast } = useToast();
  const [spec, setSpec] = useState<ProjectSpec>(specFromRow(null));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("project_specs").select("*").eq("user_id", userId).maybeSingle()
      .then(({ data }) => data && setSpec(specFromRow(data)));
  }, [userId]);

  const result = useMemo(() => evaluateSpec(spec), [spec]);

  const toggle = (list: ListKey, topic: string) =>
    setSpec((s) => ({
      ...s,
      [list]: s[list].includes(topic) ? s[list].filter((t) => t !== topic) : [...s[list], topic],
    }));

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("project_specs").upsert({
      user_id: userId,
      db_type: spec.dbType,
      ai_path: spec.aiPath,
      ai_commitment: spec.aiPath === "none" ? false : spec.aiCommitment,
      section6: spec.section6,
      section9: spec.section9,
      section10: spec.section10,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    toast(error ? { title: "השמירה נכשלה", variant: "destructive" } : { title: "האפיון נשמר" });
  };

  const TopicList = ({ list, topics, title, tip }: { list: ListKey; topics: string[]; title: string; tip: string }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">{title}</h3>
        <InfoTip text={tip} />
        <Badge variant="secondary">{spec[list].length} נבחרו</Badge>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {topics.map((t, i) => {
          const id = `${list}-${i}`;
          const on = spec[list].includes(t);
          return (
            <label key={id} htmlFor={id} className={cn(
              "flex items-start gap-2 rounded-lg border p-3 text-sm cursor-pointer transition-colors",
              on ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
            )}>
              <Checkbox id={id} checked={on} onCheckedChange={() => toggle(list, t)} className="mt-0.5" />
              <span>{t}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <TooltipProvider delayDuration={150}>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>אפיון טכנולוגי ועמידה במחוון</CardTitle>
              <CardDescription>סמנו את רכיבי הפרויקט — הסטטוס מתעדכן מיד</CardDescription>
            </div>
            <Badge className={cn("text-base px-4 py-1.5 gap-2",
              result.isValid ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground")}>
              {result.isValid ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {result.isValid ? "עומד בדרישות המחוון" : "חסרים רכיבים"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <ul className="grid gap-2 sm:grid-cols-2">
            {result.rules.map((r) => (
              <li key={r.key} className={cn("flex items-start gap-2 rounded-md p-2 text-sm",
                r.ok ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>
                {r.ok ? <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" /> : <XCircle className="h-4 w-4 mt-0.5 shrink-0" />}
                <span><strong>{r.label}</strong>{!r.ok && <> — {r.detail}</>}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="font-semibold">אחסון נתונים (חובה)</Label>
              <InfoTip text="סעיף 7: חובה מסד נתונים עם הוספה, עדכון, מחיקה ושליפה." />
            </div>
            <Select value={spec.dbType ?? ""} onValueChange={(v) => setSpec((s) => ({ ...s, dbType: v }))}>
              <SelectTrigger className="sm:w-72"><SelectValue placeholder="בחרו מסד נתונים" /></SelectTrigger>
              <SelectContent>
                {VALID_DATABASES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Alert className="border-warning/50 bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertDescription>SharedPreferences או קובץ JSON בלבד אינם נחשבים מסד נתונים ואינם קבילים.</AlertDescription>
            </Alert>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="font-semibold">שילוב בינה מלאכותית (חידוש תשפ"ז)</Label>
              <InfoTip text="בחרו את הדרך שבה הפרויקט משלב AI. רחפו מעל כל אפשרות להסבר." />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {AI_PATHS.map((p) => (
                <button key={p.value} type="button" aria-pressed={spec.aiPath === p.value}
                  onClick={() => setSpec((s) => ({ ...s, aiPath: p.value as AiPath }))}
                  className={cn("flex items-center justify-between gap-2 rounded-lg border p-3 text-sm text-right transition-colors",
                    spec.aiPath === p.value ? "border-primary bg-primary/5 font-semibold" : "border-border hover:bg-muted")}>
                  <span>{p.label}</span>
                  <InfoTip text={p.tip} />
                </button>
              ))}
            </div>
            {spec.aiPath !== "none" && (
              <label htmlFor="ai-commit" className={cn("flex items-start gap-2 rounded-lg border p-3 text-sm cursor-pointer",
                spec.aiCommitment ? "border-success bg-success/10" : "border-destructive bg-destructive/10")}>
                <Checkbox id="ai-commit" checked={spec.aiCommitment}
                  onCheckedChange={(v) => setSpec((s) => ({ ...s, aiCommitment: v === true }))} className="mt-0.5" />
                <span>אני מתחייב/ת לתעד בתיק הפרויקט כל קוד שנוצר ע"י AI ולעבוד לפי כללי APA <strong>(חובה)</strong></span>
              </label>
            )}
          </div>

          <TopicList list="section6" topics={SECTION6_TOPICS} title="נושאי חובה — סעיף 6"
            tip="נדרשים לפחות 2 נושאים, או נושא אחד בשילוב נתיב AI." />
          <TopicList list="section9" topics={SECTION9_TOPICS} title="נושאים מתקדמים — סעיף 9"
            tip="לפי סעיף 8: 3 נושאים מסעיף 9, או 2 מסעיף 9 + 2 מסעיף 10." />
          <TopicList list="section10" topics={SECTION10_TOPICS} title="נושאים משולבים — סעיף 10"
            tip="נחשבים כשמשלבים 2 נושאים מסעיף 9 עם לפחות 2 נושאים מכאן." />

          <Button onClick={save} disabled={saving} className="gap-2">
            <Save className="h-4 w-4" /> שמירת האפיון
          </Button>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default ProjectSpecForm;
