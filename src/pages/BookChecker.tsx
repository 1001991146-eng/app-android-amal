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

// דרישות ספר הפרויקט לפי התבנית
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

const bookRequirements: BookCategory[] = [
  {
    id: "intro",
    name: "מבוא",
    weight: 15,
    requirements: [
      {
        id: "project-name",
        name: "שם הפרויקט",
        description: "כותרת ברורה ומשמעותית לפרויקט"
      },
      {
        id: "summary",
        name: "תקציר",
        description: "תיאור קצר של הפרויקט ומטרותיו",
        subItems: [
          "תיאור כללי של האפליקציה",
          "המוטיבציה מאחורי הפרויקט",
          "קהל היעד"
        ]
      },
      {
        id: "goals",
        name: "מטרות הפרויקט",
        description: "רשימת המטרות שהפרויקט אמור להשיג"
      }
    ]
  },
  {
    id: "architecture",
    name: "מבנה וארכיטקטורה",
    weight: 20,
    requirements: [
      {
        id: "flowchart",
        name: "תרשים זרימה",
        description: "תרשים המציג את זרימת האפליקציה"
      },
      {
        id: "screens-diagram",
        name: "תרשים מסכים",
        description: "מפה של כל המסכים והקשרים ביניהם",
        subItems: [
          "רשימת כל המסכים",
          "תיאור כל מסך",
          "קשרי הניווט בין המסכים"
        ]
      },
      {
        id: "class-diagram",
        name: "תרשים מחלקות (UML)",
        description: "תרשים המציג את המחלקות והקשרים ביניהן"
      }
    ]
  },
  {
    id: "implementation",
    name: "מימוש",
    weight: 30,
    requirements: [
      {
        id: "activities-doc",
        name: "פירוט Activities",
        description: "תיעוד מפורט של כל Activity",
        subItems: [
          "שם ותפקיד כל Activity",
          "רכיבי ממשק המשתמש",
          "לוגיקה עסקית",
          "אינטראקציות עם מסכים אחרים"
        ]
      },
      {
        id: "objects-doc",
        name: "פירוט עצמים",
        description: "תיעוד מחלקות העצמים",
        subItems: [
          "שם ותיאור המחלקה",
          "תכונות (שדות)",
          "פעולות בונות",
          "פעולות (methods)"
        ]
      },
      {
        id: "database-doc",
        name: "תיעוד מסד הנתונים",
        description: "תיאור טבלאות ומבנה הנתונים",
        subItems: [
          "תרשים ERD",
          "תיאור כל טבלה",
          "שדות וסוגי נתונים",
          "קשרים בין טבלאות"
        ]
      },
      {
        id: "extensions-doc",
        name: "תיעוד הרחבות",
        description: "הסבר על ההרחבות שנבחרו ואופן המימוש שלהן"
      }
    ]
  },
  {
    id: "user-guide",
    name: "מדריך למשתמש",
    weight: 15,
    requirements: [
      {
        id: "installation",
        name: "הוראות התקנה",
        description: "דרישות מינימום והוראות התקנה"
      },
      {
        id: "usage",
        name: "הפעלה ושימוש",
        description: "מדריך צעד-אחר-צעד לשימוש באפליקציה",
        subItems: [
          "צילומי מסך עם הסברים",
          "תיאור הפונקציות העיקריות",
          "טיפים לשימוש"
        ]
      },
      {
        id: "limitations",
        name: "מגבלות ואילוצים",
        description: "מגבלות ידועות והמלצות"
      }
    ]
  },
  {
    id: "reflection",
    name: "רפלקציה וסיכום",
    weight: 10,
    requirements: [
      {
        id: "process",
        name: "תהליך הפיתוח",
        description: "תיאור תהליך הפיתוח, אתגרים ופתרונות"
      },
      {
        id: "learnings",
        name: "לקחים",
        description: "מה למדתי מהפרויקט"
      },
      {
        id: "future",
        name: "פיתוח עתידי",
        description: "רעיונות לשיפורים והרחבות"
      }
    ]
  },
  {
    id: "bibliography",
    name: "ביבליוגרפיה",
    weight: 10,
    requirements: [
      {
        id: "sources",
        name: "מקורות",
        description: "רשימת כל המקורות ששימשו בפרויקט",
        subItems: [
          "אתרים",
          "ספרים",
          "סרטוני הדרכה",
          "קוד מקור שהשתמשתי בו"
        ]
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
              סמן את כל הפריטים שכתבת בספר הפרויקט כדי לוודא 
              שהוא מכיל את כל הנדרש לפי התבנית
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
          </div>
        </div>
      </section>
    </Layout>
  );
}
