import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { MILESTONES, MilestoneStatus, currentStage, progressPercent } from "@/data/milestones";
import { Loader2, Search, Users } from "lucide-react";

interface StudentRow {
  id: string;
  fullName: string;
  topic: string | null;
  statuses: Record<string, MilestoneStatus>;
  percent: number;
  stage: string;
  stageIndex: number;
}

const TeacherDashboard = () => {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");

  useEffect(() => {
    const load = async () => {
      const [{ data: profiles }, { data: milestones }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("id, full_name, project_topic"),
        supabase.from("milestones").select("user_id, milestone_key, status"),
        supabase.from("user_roles").select("user_id, role"),
      ]);

      // מציגים רק תלמידים (לא מורים)
      const teacherIds = new Set(
        (roles ?? []).filter((r) => r.role === "teacher").map((r) => r.user_id)
      );

      const byUser: Record<string, Record<string, MilestoneStatus>> = {};
      milestones?.forEach((m) => {
        byUser[m.user_id] = byUser[m.user_id] ?? {};
        byUser[m.user_id][m.milestone_key] = m.status as MilestoneStatus;
      });

      const rows: StudentRow[] = (profiles ?? [])
        .filter((p) => !teacherIds.has(p.id))
        .map((p) => {
          const statuses = byUser[p.id] ?? {};
          const stage = currentStage(statuses);
          return {
            id: p.id,
            fullName: p.full_name || "ללא שם",
            topic: p.project_topic,
            statuses,
            percent: progressPercent(statuses),
            stage: stage.label,
            stageIndex: MILESTONES.indexOf(stage),
          };
        })
        .sort((a, b) => a.stageIndex - b.stageIndex || a.fullName.localeCompare(b.fullName, "he"));

      setStudents(rows);
      setLoading(false);
    };
    load();
  }, []);

  // תמונת מצב: כמה תלמידים בכל שלב
  const stageStats = useMemo(() => {
    return MILESTONES.map((m) => {
      const count = students.filter((s) => s.stage === m.label).length;
      return {
        label: m.label,
        count,
        percent: students.length ? Math.round((count / students.length) * 100) : 0,
      };
    });
  }, [students]);

  const filtered = useMemo(() => {
    const q = search.trim();
    return students.filter((s) => {
      const matchesSearch =
        !q || s.fullName.includes(q) || (s.topic ?? "").includes(q);
      const matchesStage = stageFilter === "all" || s.stage === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [students, search, stageFilter]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">לוח בקרה למורה</h1>
        <p className="text-muted-foreground mt-1 flex items-center gap-2">
          <Users className="h-4 w-4" />
          {students.length} תלמידים רשומים
        </p>
      </div>

      {/* תמונת מצב כיתתית */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stageStats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardDescription className="text-sm">{s.label}</CardDescription>
              <CardTitle className="text-2xl">
                {s.count}
                <span className="text-sm font-normal text-muted-foreground mr-2">
                  ({s.percent}%)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={s.percent} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* טבלת תלמידים */}
      <Card>
        <CardHeader>
          <CardTitle>תלמידי הכיתה</CardTitle>
          <CardDescription>מיון אוטומטי: התלמידים שבשלבים המוקדמים ביותר מופיעים ראשונים</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="חיפוש לפי שם או נושא פרויקט..."
                className="pr-9"
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="sm:w-64">
                <SelectValue placeholder="סינון לפי שלב" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל השלבים</SelectItem>
                {MILESTONES.map((m) => (
                  <SelectItem key={m.key} value={m.label}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">שם התלמיד</TableHead>
                  <TableHead className="text-right">נושא הפרויקט</TableHead>
                  <TableHead className="text-right">התקדמות</TableHead>
                  <TableHead className="text-right">השלב הנוכחי</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      לא נמצאו תלמידים התואמים את החיפוש
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.fullName}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {s.topic || <span className="italic">טרם נבחר</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-32">
                        <Progress value={s.percent} className="h-2 flex-1" />
                        <span className="text-sm text-muted-foreground w-10 text-left" dir="ltr">
                          {s.percent}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          s.percent === 100
                            ? "bg-success/10 text-success"
                            : s.stageIndex <= 1
                              ? "bg-destructive/10 text-destructive"
                              : "bg-warning/10 text-warning"
                        }
                      >
                        {s.percent === 100 ? "הושלם 🎉" : s.stage}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
