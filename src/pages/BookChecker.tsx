import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Circle, 
  AlertTriangle,
  Trophy,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

// דרישות ספר הפרויקט לפי המחוון הרשמי של משרד החינוך
interface BookRequirement {
  id: string;
  name: string;
  description: string;
  subItems?: string[];
}

interface BookCategory {
  id: string;
  name: string;
  weight: number;
  requirements: BookRequirement[];
}

// מחוון ספר הפרויקט - לפי המסמך הרשמי (עמוד 3)
const bookRequirements: BookCategory[] = [
  {
    id: "format",
    name: "עיצוב ופורמט",
    weight: 15,
    requirements: [
      {
        id: "cover",
        name: "שער",
        description: "דף פתיחה עם שם הפרויקט ופרטים"
      },
      {
        id: "toc",
        name: "תוכן עניינים",
        description: "רשימת פרקים ועמודים"
      },
      {
        id: "font",
        name: "גופן אחיד",
        description: "שימוש עקבי בגופן אחד"
      },
      {
        id: "headers",
        name: "כותרות",
        description: "כותרות ברורות לכל פרק"
      },
      {
        id: "page-numbers",
        name: "מספרי עמודים",
        description: "מספור עמודים רציף"
      },
      {
        id: "layout",
        name: "עימוד אחיד",
        description: "עימוד עקבי ונקי"
      }
    ]
  },
  {
    id: "intro",
    name: "מבוא ואפיון",
    weight: 5,
    requirements: [
      {
        id: "project-intro",
        name: "הצגת הפרויקט",
        description: "תיאור מטרת הפרויקט, יעדיו, מהות המערכת, תזמון הפעלתה (עמוד אחד מתומצת)"
      }
    ]
  },
  {
    id: "requirements",
    name: "דרישות מערכת וממשק",
    weight: 5,
    requirements: [
      {
        id: "system-req",
        name: "דרישות מערכת וממשק",
        description: "תיאור כללי של ממשק המשתמש, עיצוב מסכים, דגש על הנדסת אנוש, אסתטיקה, ונוחות שימוש"
      }
    ]
  },
  {
    id: "user-guide",
    name: "מדריך למשתמש",
    weight: 10,
    requirements: [
      {
        id: "guide",
        name: "מדריך למשתמש מפורט",
        description: "מדריך מפורט וברור, חייב לכלול צילומי מסך של כל מסכי האפליקציה והסברים על אופן הפעולה של כל פקד ומסך"
      }
    ]
  },
  {
    id: "architecture",
    name: "מבנה/ארכיטקטורה של הפרויקט",
    weight: 15,
    requirements: [
      {
        id: "uml",
        name: "תרשימי מחלקות (UML)",
        description: "הסבר תמציתי על הפעולות העיקריות עם קטעי קוד, תרשים מחלקות, עצי מחלקות והורשה/הכלה"
      },
      {
        id: "flow",
        name: "ארגון קבצים ותרשימי זרימה",
        description: "ארגון הקבצים בפרויקט ותרשימי זרימה שמבהירים את המבנה"
      }
    ]
  },
  {
    id: "database",
    name: "בסיס נתונים",
    weight: 10,
    requirements: [
      {
        id: "db-design",
        name: "תיאור ארגון הנתונים",
        description: "תיאור ארגון הנתונים המאוחסנים, שיטת השמירה שנבחרה, והצגת דוגמאות לכל טבלה או סוג נתון"
      }
    ]
  },
  {
    id: "implementation",
    name: "מימוש הפרויקט",
    weight: 25,
    requirements: [
      {
        id: "code",
        name: "קוד הפרויקט",
        description: "המרכיב בעל המשקל הגבוה ביותר - דגש על תכנות מונחה עצמים, שימוש במחלקות שהתלמיד יצר",
        subItems: [
          "חלוקת הקוד לפעולות עם תיעוד (Comments/Docstrings)",
          "הפרדה ברורה בין לוגיקת הממשק הגרפי לבין הלוגיקה העסקית"
        ]
      }
    ]
  },
  {
    id: "summary",
    name: "סיכום אישי",
    weight: 5,
    requirements: [
      {
        id: "personal",
        name: "רפלקציה מעמיקה",
        description: "רפלקציה מעמיקה על תהליך העבודה: מה למדת, מהן החוזקות, בדיקות האפליקציה והממשק הגרפי (לא משפט תודה)"
      }
    ]
  },
  {
    id: "bibliography",
    name: "ביבליוגרפיה ונספחים",
    weight: 10,
    requirements: [
      {
        id: "biblio",
        name: "ביבליוגרפיה לפי APA",
        description: "כל מקורות המידע, כולל קישורים ציבוריים לשיחות עם מנועי בינה מלאכותית שמהם יובא קוד",
        subItems: [
          "קוד משמעותי מאתר (GitHub, StackOverflow) או מ-AI - קישור ציבורי פעיל בביבליוגרפיה",
          "מספר המקור מצוין בתיעוד הקוד עצמו (Javadoc)",
          "קוד מאתרים / AI מסומן בצורה ברורה ומודגשת בספר"
        ]
      },
      {
        id: "appendix",
        name: "נספחים",
        description: "תדפיס קוד המחלקות כטקסט (לא כתמונה!) כולל הערות Javadoc"
      }
    ]
  }
];

export default function BookChecker() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(bookRequirements.map(c => c.id))
  );

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const toggleCategory = (id: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCategories(newExpanded);
  };

  const resetAll = () => {
    setCheckedItems(new Set());
  };

  const totalScore = useMemo(() => {
    let total = 0;
    bookRequirements.forEach(category => {
      const categoryItems = category.requirements.flatMap(req => 
        req.subItems ? req.subItems.map((_, i) => `${req.id}-${i}`) : [req.id]
      );
      const checked = categoryItems.filter(id => checkedItems.has(id)).length;
      const totalInCategory = categoryItems.length;
      total += (checked / totalInCategory) * category.weight;
    });
    return Math.round(total);
  }, [checkedItems]);

  const getCategoryProgress = (category: BookCategory) => {
    const allItems = category.requirements.flatMap(req =>
      req.subItems ? req.subItems.map((_, i) => `${req.id}-${i}`) : [req.id]
    );
    const checked = allItems.filter(id => checkedItems.has(id)).length;
    return { checked, total: allItems.length, percentage: (checked / allItems.length) * 100 };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "מצוין! ספר הפרויקט שלך מלא ומפורט";
    if (score >= 70) return "טוב מאוד! עוד קצת להשלים";
    if (score >= 50) return "בדרך הנכונה! יש עוד חלקים להוסיף";
    return "בהתחלה! יש עוד הרבה חלקים לכתוב";
  };

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-card mb-6">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              בודק ספר פרויקט
            </h1>
            <p className="text-lg text-muted-foreground">
              בדוק את ספר הפרויקט שלך לפי המחוון הרשמי של משרד החינוך
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              ספר הפרויקט = 30% מציון המתכונת
            </p>
          </div>
        </div>
      </section>

      {/* Score Card */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl border border-border/50 shadow-elevated p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Trophy className={cn("h-12 w-12", getScoreColor(totalScore))} />
              </div>
              <div className={cn("text-6xl font-bold mb-2", getScoreColor(totalScore))}>
                {totalScore}%
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                {getScoreMessage(totalScore)}
              </p>
              <Button variant="secondary" onClick={resetAll} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                אפס הכל
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {bookRequirements.map((category) => {
              const progress = getCategoryProgress(category);
              const isExpanded = expandedCategories.has(category.id);

              return (
                <div 
                  key={category.id}
                  className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-5 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <h3 className="text-lg font-bold text-foreground">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          משקל: {category.weight}% | הושלם: {progress.checked}/{progress.total}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Progress Bar */}
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-300",
                            progress.percentage >= 80 ? "bg-success" :
                            progress.percentage >= 50 ? "bg-warning" : "bg-destructive"
                          )}
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Category Content */}
                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-border/50 space-y-4">
                      {category.requirements.map((requirement) => (
                        <div key={requirement.id} className="space-y-2">
                          {/* Requirement Title */}
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-warning mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-foreground">{requirement.name}</h4>
                              <p className="text-sm text-muted-foreground">{requirement.description}</p>
                            </div>
                          </div>

                          {/* Sub Items */}
                          {requirement.subItems ? (
                            <div className="mr-6 space-y-2">
                              {requirement.subItems.map((item, index) => {
                                const itemId = `${requirement.id}-${index}`;
                                const isChecked = checkedItems.has(itemId);
                                
                                return (
                                  <button
                                    key={itemId}
                                    onClick={() => toggleItem(itemId)}
                                    className={cn(
                                      "w-full flex items-center gap-3 p-3 rounded-lg text-right transition-all",
                                      isChecked 
                                        ? "bg-success/10 border border-success/30" 
                                        : "bg-muted/50 hover:bg-muted border border-transparent"
                                    )}
                                  >
                                    {isChecked ? (
                                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                                    ) : (
                                      <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    )}
                                    <span className={cn(
                                      "text-sm",
                                      isChecked ? "text-foreground" : "text-muted-foreground"
                                    )}>
                                      {item}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <button
                              onClick={() => toggleItem(requirement.id)}
                              className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-lg mr-6 text-right transition-all",
                                checkedItems.has(requirement.id)
                                  ? "bg-success/10 border border-success/30"
                                  : "bg-muted/50 hover:bg-muted border border-transparent"
                              )}
                            >
                              {checkedItems.has(requirement.id) ? (
                                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                              )}
                              <span className="text-sm text-foreground">סמן כהושלם</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Info Box */}
            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4">הרכב ציון ספר הפרויקט לפי המחוון הרשמי</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-background rounded-lg p-3">
                  <div className="font-medium">עיצוב ופורמט</div>
                  <div className="text-muted-foreground">15%</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="font-medium">מבוא ואפיון</div>
                  <div className="text-muted-foreground">5%</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="font-medium">דרישות וממשק</div>
                  <div className="text-muted-foreground">5%</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="font-medium">מדריך למשתמש</div>
                  <div className="text-muted-foreground">10%</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="font-medium">מבנה / ארכיטקטורה</div>
                  <div className="text-muted-foreground">15%</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="font-medium">בסיס נתונים</div>
                  <div className="text-muted-foreground">10%</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="font-medium">מימוש (קוד)</div>
                  <div className="text-muted-foreground">25%</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="font-medium">סיכום אישי</div>
                  <div className="text-muted-foreground">5%</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="font-medium">ביבליוגרפיה ונספחים</div>
                  <div className="text-muted-foreground">10%</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="font-medium">בונוס</div>
                  <div className="text-muted-foreground">עד 10%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
