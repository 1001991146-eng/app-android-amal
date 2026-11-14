import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { MILESTONES, MilestoneStatus, STATUS_LABELS, progressPercent } from "@/data/milestones";
import { CheckCircle2, Circle, Loader2, Save, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectSpecForm from "@/components/dashboard/ProjectSpecForm";

const STATUS_ORDER: MilestoneStatus[] = ["not_started", "in_progress", "done"];

const statusStyles: Record<MilestoneStatus, string> = {
  not_started: "border-border text-muted-foreground",
  in_progress: "border-warning bg-warning/10 text-warning",
  done: "border-success bg-success/10 text-success",
};

const statusIcons: Record<MilestoneStatus, typeof Circle> = {
  not_started: Circle,
  in_progress: Timer,
  done: CheckCircle2,
};

const StudentDashboard = () => {
  const { user, fullName } = useAuth();
  const { toast } = useToast();
  const [statuses, setStatuses] = useState<Record<string, MilestoneStatus>>({});
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingTopic, setSavingTopic] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [{ data: profile }, { data: rows }] = await Promise.all([
        supabase.from("profiles").select("project_topic").eq("id", user.id).maybeSingle(),
        supabase.from("milestones").select("milestone_key, status").eq("user_id", user.id),
      ]);
      setTopic(profile?.project_topic ?? "");
      const map: Record<string, MilestoneStatus> = {};
      rows?.forEach((r) => {
        map[r.milestone_key] = r.status as MilestoneStatus;
      });
      setStatuses(map);
      setLoading(false);
    };
    load();
  }, [user]);

  const setStatus = async (key: string, status: MilestoneStatus) => {
    if (!user) return;
    setSavingStatus(true);
    const { error } = await supabase.from("milestones").upsert(
      { user_id: user.id, milestone_key: key, status, updated_at: new Date().toISOString() },
      { onConflict: "user_id,milestone_key" }
    );
    if (error) {
      toast({ title: "השמירה נכשלה", description: "נסו שוב בעוד רגע", variant: "destructive" });
    } else {
      setStatuses((prev) => ({ ...prev, [key]: status }));
    }
    setSavingStatus(false);
  };

  const saveTopic = async () => {
    if (!user) return;
    setSavingTopic(true);
    const { error } = await supabase
      .from("profiles")
      .update({ project_topic: topic.trim() || null })
      .eq("id", user.id);
    setSavingTopic(false);
    if (error) {
      toast({ title: "השמירה נכשלה", variant: "destructive" });
    } else {
      toast({ title: "נושא הפרויקט נשמר" });
    }
  };

  const percent = progressPercent(statuses);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">שלום, {fullName || "תלמיד/ה"} 👋</h1>
        <p className="text-muted-foreground mt-1">כאן עוקבים אחר התקדמות פרויקט הגמר שלך</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>נושא הפרויקט</CardTitle>
          <CardDescription>כתבו את נושא הפרויקט לאחר שאושר על ידי המורה</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              aria-label="נושא הפרויקט"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="לדוגמה: אפליקציה לניהול מועדון קריאה"
            />
            <Button onClick={saveTopic} disabled={savingTopic} className="gap-2 shrink-0">
              <Save className="h-4 w-4" />
              שמירה
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ההתקדמות שלי</CardTitle>
          <CardDescription>{percent}% מאבני הדרך הושלמו</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={percent} className="h-3" />
          <p className="text-sm text-muted-foreground text-left" dir="ltr">{percent}%</p>
        </CardContent>
      </Card>

      {user && <ProjectSpecForm userId={user.id} />}

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">אבני דרך</h2>
        {MILESTONES.map((m, i) => {
          const status = statuses[m.key] ?? "not_started";
          const Icon = statusIcons[status];
          return (
            <Card key={m.key}>
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <Icon
                    className={cn(
                      "h-6 w-6 mt-0.5 shrink-0",
                      status === "done" && "text-success",
                      status === "in_progress" && "text-warning",
                      status === "not_started" && "text-muted-foreground"
                    )}
                  />
                  <div className="flex-1 space-y-3">
                    <Label className="text-base font-medium">
                      {i + 1}. {m.label}
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {STATUS_ORDER.map((s) => (
                        <Button
                          key={s}
                          variant="outline"
                          size="sm"
                          type="button"
                          disabled={savingStatus}
                          aria-pressed={status === s}
                          onClick={() => setStatus(m.key, s)}
                          className={cn(
                            "px-3 py-1.5 rounded-full border text-sm transition-all",
                            status === s
                              ? statusStyles[s] + " font-bold ring-1 ring-current"
                              : "border-border text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {STATUS_LABELS[s]}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StudentDashboard;
