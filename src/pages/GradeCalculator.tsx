import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calculator, 
  BookOpen, 
  PenTool, 
  FileText,
  Trophy,
  Info,
  ArrowDown,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function GradeCalculator() {
  // ציוני קלט - לפי הרכב הציון הרשמי
  const [bookScore, setBookScore] = useState<string>(""); // ספר פרויקט
  const [oralExamScore, setOralExamScore] = useState<string>(""); // בחינה בעל פה (מתכונת)
  const [triviaDocScore, setTriviaDocScore] = useState<string>(""); // מסמך מסכם (טריוויה)
  const [triviaExamScore, setTriviaExamScore] = useState<string>(""); // בחינה טריוויה
  const [bagrootExamScore, setBagrootExamScore] = useState<string>(""); // בחינת בגרות

  const calculations = useMemo(() => {
    const book = parseFloat(bookScore) || 0;
    const oral = parseFloat(oralExamScore) || 0;
    const triviaDoc = parseFloat(triviaDocScore) || 0;
    const triviaExam = parseFloat(triviaExamScore) || 0;
    const bagrootExam = parseFloat(bagrootExamScore) || 0;

    // ציון מתכונת = 30% ספר + 70% בחינה בעל פה
    const matkonetScore = (book * 0.3) + (oral * 0.7);

    // ציון טריוויה = 30% מסמך מסכם + 70% בחינה
    const triviaScore = (triviaDoc * 0.3) + (triviaExam * 0.7);

    // ציון הגשה = 80% מתכונת + 20% טריוויה
    const submissionScore = (matkonetScore * 0.8) + (triviaScore * 0.2);

    // ציון בגרות = 50% הגשה + 50% בחינה
    const finalGrade = (submissionScore * 0.5) + (bagrootExam * 0.5);

    return {
      bookScore: Math.round(book * 10) / 10,
      oralExamScore: Math.round(oral * 10) / 10,
      matkonetScore: Math.round(matkonetScore * 10) / 10,
      triviaDocScore: Math.round(triviaDoc * 10) / 10,
      triviaExamScore: Math.round(triviaExam * 10) / 10,
      triviaScore: Math.round(triviaScore * 10) / 10,
      submissionScore: Math.round(submissionScore * 10) / 10,
      bagrootExamScore: Math.round(bagrootExam * 10) / 10,
      finalGrade: Math.round(finalGrade * 10) / 10
    };
  }, [bookScore, oralExamScore, triviaDocScore, triviaExamScore, bagrootExamScore]);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    if (score >= 55) return "text-orange-500";
    return "text-destructive";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return "bg-success/10 border-success/30";
    if (score >= 70) return "bg-warning/10 border-warning/30";
    if (score >= 55) return "bg-orange-500/10 border-orange-500/30";
    return "bg-destructive/10 border-destructive/30";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "מצוין!";
    if (score >= 80) return "טוב מאוד";
    if (score >= 70) return "טוב";
    if (score >= 55) return "עובר";
    return "צריך שיפור";
  };

  const resetAll = () => {
    setBookScore("");
    setOralExamScore("");
    setTriviaDocScore("");
    setTriviaExamScore("");
    setBagrootExamScore("");
  };

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-card mb-6">
              <Calculator className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              מחשבון ציון בגרות
            </h1>
            <p className="text-lg text-muted-foreground">
              חשב את ציון הבגרות הצפוי שלך לפי הרכב הציון הרשמי של משרד החינוך
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Section 1: הסבר הרכב הציון */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold">
                1
              </div>
              <h2 className="text-2xl font-bold text-foreground">הרכב הציון</h2>
            </div>
            
            <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground">מבנה ציון הבגרות הרשמי</span>
              </div>
              
              <div className="space-y-4">
                {/* ציון סופי */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="font-bold text-foreground">ציון בגרות סופי</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">50%</div>
                      <div className="text-muted-foreground">ציון הגשה</div>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">50%</div>
                      <div className="text-muted-foreground">בחינת בגרות בע"פ</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="h-6 w-6 text-muted-foreground" />
                </div>

                {/* ציון הגשה */}
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-accent" />
                    <span className="font-bold text-foreground">ציון הגשה (50% מהציון הסופי)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">80%</div>
                      <div className="text-muted-foreground">ציון מתכונת</div>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">20%</div>
                      <div className="text-muted-foreground">ציון טריוויה</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="h-6 w-6 text-muted-foreground" />
                </div>

                {/* מתכונת וטריוויה */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-success" />
                      <span className="font-bold text-foreground">ציון מתכונת</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between bg-background rounded-lg p-2">
                        <span className="text-muted-foreground">ספר פרויקט</span>
                        <span className="font-bold">30%</span>
                      </div>
                      <div className="flex justify-between bg-background rounded-lg p-2">
                        <span className="text-muted-foreground">בחינה בע"פ מתכונת</span>
                        <span className="font-bold">70%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                    <div className="flex items-center gap-2 mb-2">
                      <PenTool className="h-5 w-5 text-warning" />
                      <span className="font-bold text-foreground">ציון טריוויה</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between bg-background rounded-lg p-2">
                        <span className="text-muted-foreground">מסמך מסכם</span>
                        <span className="font-bold">30%</span>
                      </div>
                      <div className="flex justify-between bg-background rounded-lg p-2">
                        <span className="text-muted-foreground">בחינת טריוויה</span>
                        <span className="font-bold">70%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: מילוי ציונים */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold">
                2
              </div>
              <h2 className="text-2xl font-bold text-foreground">מילוי ציונים</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* מתכונת */}
              <div className="bg-card rounded-xl border border-success/30 shadow-card p-6 space-y-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-success" />
                  ציוני מתכונת
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bookScore" className="text-sm">ציון ספר פרויקט (30%)</Label>
                    <Input
                      id="bookScore"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      value={bookScore}
                      onChange={(e) => setBookScore(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="oralExamScore" className="text-sm">ציון בחינה בעל פה - מתכונת (70%)</Label>
                    <Input
                      id="oralExamScore"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      value={oralExamScore}
                      onChange={(e) => setOralExamScore(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                {(bookScore || oralExamScore) && (
                  <div className={cn("p-3 rounded-lg border", getScoreBgColor(calculations.matkonetScore))}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">ציון מתכונת:</span>
                      <span className={cn("text-xl font-bold", getScoreColor(calculations.matkonetScore))}>
                        {calculations.matkonetScore}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* טריוויה */}
              <div className="bg-card rounded-xl border border-warning/30 shadow-card p-6 space-y-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-warning" />
                  ציוני טריוויה
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="triviaDocScore" className="text-sm">ציון מסמך מסכם (30%)</Label>
                    <Input
                      id="triviaDocScore"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      value={triviaDocScore}
                      onChange={(e) => setTriviaDocScore(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="triviaExamScore" className="text-sm">ציון בחינת טריוויה (70%)</Label>
                    <Input
                      id="triviaExamScore"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      value={triviaExamScore}
                      onChange={(e) => setTriviaExamScore(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                {(triviaDocScore || triviaExamScore) && (
                  <div className={cn("p-3 rounded-lg border", getScoreBgColor(calculations.triviaScore))}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">ציון טריוויה:</span>
                      <span className={cn("text-xl font-bold", getScoreColor(calculations.triviaScore))}>
                        {calculations.triviaScore}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 3: ציון הגשה */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold">
                3
              </div>
              <h2 className="text-2xl font-bold text-foreground">ציון הגשה</h2>
            </div>
            
            <div className="bg-card rounded-xl border border-accent/30 shadow-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-accent" />
                <span className="font-bold text-foreground">חישוב ציון הגשה</span>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <div className="text-sm text-muted-foreground mb-2">נוסחה:</div>
                <div className="text-foreground font-mono text-sm">
                  ציון הגשה = (ציון מתכונת × 80%) + (ציון טריוויה × 20%)
                </div>
                <div className="text-foreground font-mono text-sm mt-1">
                  ציון הגשה = ({calculations.matkonetScore} × 0.8) + ({calculations.triviaScore} × 0.2)
                </div>
              </div>

              <div className={cn("p-4 rounded-lg border text-center", getScoreBgColor(calculations.submissionScore))}>
                <div className="text-sm text-muted-foreground mb-1">ציון הגשה</div>
                <div className={cn("text-4xl font-bold", getScoreColor(calculations.submissionScore))}>
                  {calculations.submissionScore}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: ציון בגרות */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold">
                4
              </div>
              <h2 className="text-2xl font-bold text-foreground">בחינת בגרות</h2>
            </div>
            
            <div className="bg-card rounded-xl border border-primary/30 shadow-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground">ציון בחינת בגרות בעל פה</span>
              </div>
              
              <div>
                <Label htmlFor="bagrootExamScore" className="text-sm">ציון בחינה בעל פה - בגרות (50% מהציון הסופי)</Label>
                <Input
                  id="bagrootExamScore"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0-100"
                  value={bagrootExamScore}
                  onChange={(e) => setBagrootExamScore(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </section>

          {/* Section 5: ציון סופי */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold">
                5
              </div>
              <h2 className="text-2xl font-bold text-foreground">ציון בגרות סופי</h2>
            </div>
            
            <div className="bg-card rounded-2xl border-2 border-primary/50 shadow-elevated p-8">
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <div className="text-sm text-muted-foreground mb-2">נוסחה:</div>
                <div className="text-foreground font-mono text-sm">
                  ציון סופי = (ציון הגשה × 50%) + (בחינת בגרות × 50%)
                </div>
                <div className="text-foreground font-mono text-sm mt-1">
                  ציון סופי = ({calculations.submissionScore} × 0.5) + ({calculations.bagrootExamScore} × 0.5)
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Trophy className={cn("h-16 w-16", getScoreColor(calculations.finalGrade))} />
                </div>
                <div className="text-sm text-muted-foreground mb-2">ציון בגרות צפוי</div>
                <div className={cn("text-7xl font-bold mb-2", getScoreColor(calculations.finalGrade))}>
                  {calculations.finalGrade || 0}
                </div>
                <p className="text-xl text-muted-foreground">
                  {calculations.finalGrade > 0 ? getScoreMessage(calculations.finalGrade) : "הכנס ציונים לחישוב"}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={resetAll}
                >
                  אפס את כל הציונים
                </Button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}
