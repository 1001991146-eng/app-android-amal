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
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function GradeCalculator() {
  // ציוני קלט - לפי הרכב הציון הרשמי
  const [bookScore, setBookScore] = useState<string>(""); // ספר פרויקט
  const [oralExamScore, setOralExamScore] = useState<string>(""); // בחינה בעל פה (מתכונת)
  const [triviaDocScore, setTriviaDocScore] = useState<string>(""); // מסמך מסכם (טריוויה)
  const [triviaExamScore, setTriviaExamScore] = useState<string>(""); // בחינה טריוויה
  const [bagrootExamScore, setBagrootExamScore] = useState<string>(""); // בחינת בגרות
  const [showDetails, setShowDetails] = useState(true);

  // הרכב הציון לפי המסמך הרשמי:
  // ציון בגרות = 50% הגשה + 50% בחינה (בעל פה בגרות)
  // ציון הגשה = 80% מתכונת + 20% טריוויה
  // ציון מתכונת = 30% ספר פרויקט + 70% בחינה בעל פה (מתכונת)
  // ציון טריוויה = 30% מסמך מסכם + 70% בחינה

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

      {/* Grade Breakdown Info */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full bg-card rounded-xl border border-border/50 shadow-card p-5 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground">הרכב הציון הרשמי</span>
              </div>
              {showDetails ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>

            {showDetails && (
              <div className="mt-4 bg-card rounded-xl border border-border/50 shadow-card p-6 space-y-6 animate-slide-up">
                {/* ציון בגרות */}
                <div>
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    ציון בגרות סופי
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-muted-foreground">הגשה</span>
                      <span className="float-left font-bold">50%</span>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-muted-foreground">בחינה (בעל פה)</span>
                      <span className="float-left font-bold">50%</span>
                    </div>
                  </div>
                </div>

                {/* ציון הגשה */}
                <div>
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    ציון הגשה
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-muted-foreground">מתכונת</span>
                      <span className="float-left font-bold">80%</span>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-muted-foreground">טריוויה</span>
                      <span className="float-left font-bold">20%</span>
                    </div>
                  </div>
                </div>

                {/* ציון מתכונת */}
                <div>
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-success" />
                    ציון מתכונת
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-muted-foreground">ספר פרויקט</span>
                      <span className="float-left font-bold">30%</span>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-muted-foreground">בחינה בעל פה (מתכונת)</span>
                      <span className="float-left font-bold">70%</span>
                    </div>
                  </div>
                </div>

                {/* ציון טריוויה */}
                <div>
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-warning" />
                    ציון טריוויה
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-muted-foreground">מסמך מסכם</span>
                      <span className="float-left font-bold">30%</span>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-muted-foreground">בחינה</span>
                      <span className="float-left font-bold">70%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-4">הכנס ציונים</h2>
              
              {/* מתכונת */}
              <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 space-y-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-success" />
                  ציון מתכונת
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bookScore">ציון ספר פרויקט (30%)</Label>
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
                    <Label htmlFor="oralExamScore">ציון בחינה בעל פה - מתכונת (70%)</Label>
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
              </div>

              {/* טריוויה */}
              <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 space-y-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <PenTool className="h-4 w-4 text-warning" />
                  ציון טריוויה
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="triviaDocScore">ציון מסמך מסכם (30%)</Label>
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
                    <Label htmlFor="triviaExamScore">ציון בחינת טריוויה (70%)</Label>
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
              </div>

              {/* בחינת בגרות */}
              <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 space-y-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  בחינת בגרות
                </h3>
                <div>
                  <Label htmlFor="bagrootExamScore">ציון בחינה בעל פה - בגרות (50%)</Label>
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
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-4">תוצאות</h2>

              {/* Final Grade */}
              <div className="bg-card rounded-2xl border border-border/50 shadow-elevated p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Trophy className={cn("h-12 w-12", getScoreColor(calculations.finalGrade))} />
                </div>
                <div className="text-sm text-muted-foreground mb-1">ציון בגרות צפוי</div>
                <div className={cn("text-6xl font-bold mb-2", getScoreColor(calculations.finalGrade))}>
                  {calculations.finalGrade || 0}
                </div>
                <p className="text-lg text-muted-foreground">
                  {calculations.finalGrade > 0 ? getScoreMessage(calculations.finalGrade) : "הכנס ציונים לחישוב"}
                </p>
              </div>

              {/* Breakdown */}
              <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 space-y-4">
                <h3 className="font-bold text-foreground">פירוט חישוב</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-success/10 rounded-lg border border-success/30">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">ציון מתכונת</span>
                      <span className={cn("font-bold", getScoreColor(calculations.matkonetScore))}>
                        {calculations.matkonetScore}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      = (ספר × 30%) + (בחינה בע"פ × 70%)
                    </div>
                  </div>
                  
                  <div className="p-3 bg-warning/10 rounded-lg border border-warning/30">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">ציון טריוויה</span>
                      <span className={cn("font-bold", getScoreColor(calculations.triviaScore))}>
                        {calculations.triviaScore}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      = (מסמך × 30%) + (בחינה × 70%)
                    </div>
                  </div>
                  
                  <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">ציון הגשה</span>
                      <span className={cn("font-bold", getScoreColor(calculations.submissionScore))}>
                        {calculations.submissionScore}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      = (מתכונת × 80%) + (טריוויה × 20%)
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">ציון בגרות סופי</span>
                    <span className={cn("text-2xl font-bold", getScoreColor(calculations.finalGrade))}>
                      {calculations.finalGrade}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    = (הגשה × 50%) + (בחינת בגרות × 50%)
                  </p>
                </div>
              </div>

              {/* Reset */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={resetAll}
              >
                אפס ציונים
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
