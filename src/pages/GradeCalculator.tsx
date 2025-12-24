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

interface GradeBreakdown {
  name: string;
  weight: number;
  value: number;
}

export default function GradeCalculator() {
  // ציוני קלט
  const [matkonetScore, setMatkonetScore] = useState<string>("");
  const [bagrootExamScore, setBagrootExamScore] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);

  // הרכב הציון לפי המסמכים:
  // ציון בגרות = 50% הגשה + 50% בחינה
  // ציון הגשה = 80% מתכונת + 20% בחינת בגרות

  const calculations = useMemo(() => {
    const matkonet = parseFloat(matkonetScore) || 0;
    const bagrootExam = parseFloat(bagrootExamScore) || 0;

    // ציון הגשה = 80% מתכונת + 20% בחינת בגרות
    const submissionScore = (matkonet * 0.8) + (bagrootExam * 0.2);

    // ציון בגרות סופי = 50% הגשה + 50% בחינה (בעל פה)
    const finalGrade = (submissionScore * 0.5) + (bagrootExam * 0.5);

    return {
      matkonetScore: Math.round(matkonet * 10) / 10,
      submissionScore: Math.round(submissionScore * 10) / 10,
      bagrootExamScore: Math.round(bagrootExam * 10) / 10,
      finalGrade: Math.round(finalGrade * 10) / 10
    };
  }, [matkonetScore, bagrootExamScore]);

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
              חשב את ציון הבגרות הצפוי שלך בהתבסס על הרכב הציון הרשמי
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
                      <span className="text-muted-foreground">הגשה (פרויקט)</span>
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
                      <span className="text-muted-foreground">בחינת בגרות</span>
                      <span className="float-left font-bold">20%</span>
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
              
              <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="matkonetScore" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-success" />
                      ציון מתכונת (80% מהגשה)
                    </Label>
                    <Input
                      id="matkonetScore"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      value={matkonetScore}
                      onChange={(e) => setMatkonetScore(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bagrootExamScore" className="flex items-center gap-2">
                      <PenTool className="h-4 w-4 text-warning" />
                      ציון בחינת בגרות (50% + 20% מהגשה)
                    </Label>
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
                <h3 className="font-bold text-foreground">פירוט ציונים</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">ציון מתכונת</span>
                    <span className={cn("font-bold", getScoreColor(calculations.matkonetScore))}>
                      {calculations.matkonetScore}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">ציון בחינת בגרות</span>
                    <span className={cn("font-bold", getScoreColor(calculations.bagrootExamScore))}>
                      {calculations.bagrootExamScore}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">ציון הגשה (80% מתכונת + 20% בחינת בגרות)</span>
                    <span className={cn("font-bold", getScoreColor(calculations.submissionScore))}>
                      {calculations.submissionScore}
                    </span>
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
                onClick={() => {
                  setMatkonetScore("");
                  setBagrootExamScore("");
                }}
              >
                אפס ציונים
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Book Score Breakdown */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                הרכב ציון ספר הפרויקט (100%)
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">שער ופתיחה</div>
                  <div className="text-muted-foreground">2%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">תוכן עניינים</div>
                  <div className="text-muted-foreground">2%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">גופן אחיד</div>
                  <div className="text-muted-foreground">2%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">כותרות</div>
                  <div className="text-muted-foreground">3%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">מספרי עמודים</div>
                  <div className="text-muted-foreground">3%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">עימוד אחיד</div>
                  <div className="text-muted-foreground">3%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">מבוא ואפיון</div>
                  <div className="text-muted-foreground">5%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">דרישות וממשק</div>
                  <div className="text-muted-foreground">5%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">מדריך למשתמש</div>
                  <div className="text-muted-foreground">10%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">ארכיטקטורה (UML)</div>
                  <div className="text-muted-foreground">10%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">תרשימי זרימה</div>
                  <div className="text-muted-foreground">15%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">בסיס נתונים</div>
                  <div className="text-muted-foreground">10%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3 md:col-span-2">
                  <div className="font-medium text-foreground">מימוש הפרויקט (קוד + תיעוד)</div>
                  <div className="text-muted-foreground">25%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">סיכום אישי</div>
                  <div className="text-muted-foreground">5%</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium text-foreground">נספחים (תדפיס קוד)</div>
                  <div className="text-muted-foreground">10%</div>
                </div>
                <div className="bg-success/10 border border-success/30 rounded-lg p-3">
                  <div className="font-medium text-success">בונוס</div>
                  <div className="text-success">עד 10%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
