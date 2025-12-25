import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { projectRequirements, checkProjectValidity, getTotalProgress } from "@/data/projectRequirements";
import { 
  CheckCircle2, 
  Circle, 
  AlertTriangle,
  Trophy,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  XCircle,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Checker() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(projectRequirements.map(c => c.id))
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

  const totalProgress = useMemo(() => getTotalProgress(checkedItems), [checkedItems]);
  const validation = useMemo(() => checkProjectValidity(checkedItems), [checkedItems]);

  const getCategoryProgress = (category: typeof projectRequirements[0]) => {
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

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              בודק פרויקט
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              בדוק האם הפרויקט שלך עומד בדרישות 5 יחידות לימוד
            </p>
            <p className="text-sm text-muted-foreground">
              💡 לבדיקת ספר הפרויקט השתמש ב<a href="/book-checker" className="text-primary hover:underline">בודק ספר</a>
            </p>
          </div>
        </div>
      </section>

      {/* Status Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Progress Card */}
            <div className="bg-card rounded-2xl border border-border/50 shadow-elevated p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Trophy className={cn("h-10 w-10", getScoreColor(totalProgress))} />
              </div>
              <div className={cn("text-4xl font-bold mb-2", getScoreColor(totalProgress))}>
                {totalProgress}%
              </div>
              <p className="text-muted-foreground">התקדמות כללית</p>
            </div>

            {/* Validity Card */}
            <div className={cn(
              "rounded-2xl border shadow-elevated p-6 text-center",
              validation.isValid 
                ? "bg-success/10 border-success/30" 
                : "bg-destructive/10 border-destructive/30"
            )}>
              <div className="flex items-center justify-center mb-4">
                {validation.isValid ? (
                  <CheckCircle2 className="h-10 w-10 text-success" />
                ) : (
                  <XCircle className="h-10 w-10 text-destructive" />
                )}
              </div>
              <div className={cn(
                "text-xl font-bold mb-2",
                validation.isValid ? "text-success" : "text-destructive"
              )}>
                {validation.isValid ? "עומד בדרישות 5 יחל\"מ" : "לא עומד בדרישות"}
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span>{validation.extensionPoints} נקודות הרחבות (נדרש: 5)</span>
              </div>
            </div>
          </div>

          {/* Missing Requirements */}
          {!validation.isValid && validation.missingRequirements.length > 0 && (
            <div className="max-w-4xl mx-auto mt-6">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
                <h3 className="font-bold text-destructive mb-2">דרישות חסרות:</h3>
                <ul className="space-y-1">
                  {validation.missingRequirements.map((req, i) => (
                    <li key={i} className="text-sm text-destructive flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Reset Button */}
          <div className="max-w-4xl mx-auto mt-6 text-center">
            <Button variant="secondary" onClick={resetAll} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              אפס הכל
            </Button>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {projectRequirements.map((category) => {
              const progress = getCategoryProgress(category);
              const isExpanded = expandedCategories.has(category.id);
              const isExtensionCategory = category.id.startsWith("extensions");

              return (
                <div 
                  key={category.id}
                  className={cn(
                    "bg-card rounded-xl border shadow-card overflow-hidden",
                    isExtensionCategory ? "border-primary/30" : "border-border/50"
                  )}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-5 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                          {isExtensionCategory && <Sparkles className="h-4 w-4 text-primary" />}
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          הושלם: {progress.checked}/{progress.total}
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

      {/* Info Box */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4">איך מחשבים נקודות הרחבות?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>סעיף 6 (הרחבות בסיסיות):</strong> כל הרחבה = נקודה אחת</li>
                <li>• <strong>סעיף 9 (נושאים מתקדמים):</strong> כל נושא = נקודה אחת</li>
                <li>• <strong>סעיף 10 (נושאים משולבים):</strong> כל 2 נושאים = נקודה אחת</li>
                <li className="pt-2 text-foreground">• <strong>נדרש:</strong> סה"כ 5 נקודות הרחבות לעמידה בדרישות 5 יחל"מ</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
