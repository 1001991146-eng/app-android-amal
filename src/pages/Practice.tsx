import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  RefreshCcw,
  Lightbulb,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  principle: string;
}

const questions: Question[] = [
  {
    id: "1",
    topic: "Service",
    question: "מדוע חשוב ליצור Thread נפרד בתוך Service לעבודה ממושכת?",
    options: [
      "כי Service לא יכול לרוץ בכלל ללא Thread",
      "כי Service רץ ב-Main Thread כברירת מחדל ועלול לחסום את ה-UI",
      "כי זה מאפשר לסגור את ה-Service מהר יותר",
      "כי אנדרואיד דורש זאת בכל מקרה"
    ],
    correctIndex: 1,
    explanation: "Service רץ ב-Main Thread (UI Thread) כברירת מחדל. אם נבצע עבודה כבדה ב-Service ללא Thread נפרד, נחסום את ה-UI ונגרום לאפליקציה להיתקע (ANR).",
    principle: "הפרדה בין עבודת רקע ל-UI - עיקרון בסיסי בפיתוח אנדרואיד למניעת חסימת ממשק המשתמש."
  },
  {
    id: "2",
    topic: "AlarmManager",
    question: "מהו העיקרון המרכזי מאחורי השימוש ב-AlarmManager?",
    options: [
      "הוא מאפשר לתזמן פעולות שיתבצעו גם כשהאפליקציה לא פעילה",
      "הוא מאפשר ליצור שעון מעורר על המסך",
      "הוא מאפשר למדוד זמן ביצוע של פעולות",
      "הוא מחליף את Thread.sleep"
    ],
    correctIndex: 0,
    explanation: "AlarmManager מאפשר לתזמן משימות שיופעלו בזמן עתידי, גם כשהאפליקציה לא רצה ברקע. המערכת 'מעירה' את הקוד שלנו בזמן הנכון.",
    principle: "הפרדת אחריות - AlarmManager אחראי רק לתזמון, הלוגיקה בפועל מתבצעת ב-BroadcastReceiver או Service."
  },
  {
    id: "3",
    topic: "AsyncTask/Threads",
    question: "למה אסור לעדכן UI מתוך Background Thread?",
    options: [
      "כי זה איטי מדי",
      "כי מערכת ה-UI של אנדרואיד היא Single-Threaded ולא Thread-Safe",
      "כי זה צורך יותר סוללה",
      "כי אנדרואיד לא תומך בזה טכנית"
    ],
    correctIndex: 1,
    explanation: "מערכת ה-UI של אנדרואיד מבוססת על Thread יחיד (Main Thread). גישה לרכיבי UI מ-Thread אחר יכולה לגרום להתנהגות לא צפויה ולקריסות.",
    principle: "Thread Safety - רכיבי UI צריכים להיות מנוהלים רק מ-Thread אחד כדי למנוע מצבי מרוץ (Race Conditions)."
  },
  {
    id: "4",
    topic: "SQLite",
    question: "מהי המטרה העיקרית של מתודת onUpgrade ב-SQLiteOpenHelper?",
    options: [
      "לשפר ביצועים של מסד הנתונים",
      "לטפל בשינויים בסכמת מסד הנתונים כאשר הגרסה עולה",
      "ליצור גיבוי אוטומטי",
      "למחוק נתונים ישנים"
    ],
    correctIndex: 1,
    explanation: "כאשר משנים את מבנה מסד הנתונים (מוסיפים טבלה, עמודה וכו'), צריך לעדכן את מספר הגרסה ולטפל בשינוי ב-onUpgrade כדי לא לאבד נתונים של משתמשים קיימים.",
    principle: "ניהול גרסאות - חשוב לשמור על תאימות לאחור ולא לאבד נתוני משתמשים בעדכוני גרסה."
  },
  {
    id: "5",
    topic: "ContentProvider",
    question: "מדוע חשוב לסגור Cursor אחרי שימוש בו?",
    options: [
      "כי אחרת הנתונים לא יישמרו",
      "כי Cursor צורך משאבי מערכת (זיכרון) שצריך לשחרר",
      "כי אנדרואיד דורש זאת",
      "כי אחרת לא ניתן ליצור Cursor חדש"
    ],
    correctIndex: 1,
    explanation: "Cursor מחזיק משאבי מערכת כמו זיכרון וחיבורים למסד הנתונים. אי-סגירתו גורמת ל-Memory Leak ויכולה להאט את האפליקציה.",
    principle: "ניהול משאבים - כל משאב שנפתח צריך להיסגר, במיוחד כאלה שמחזיקים חיבורים או זיכרון."
  },
  {
    id: "6",
    topic: "Notification",
    question: "מדוע חובה להגדיר NotificationChannel מאנדרואיד 8.0?",
    options: [
      "כי זה משפר את עיצוב ההתראות",
      "כדי לאפשר למשתמש שליטה על סוגי התראות שונים",
      "כי זה מהיר יותר",
      "כי התראות לא עובדות בלעדיו"
    ],
    correctIndex: 1,
    explanation: "NotificationChannel מאפשר למשתמש לשלוט על הגדרות התראות שונות באפליקציה (צליל, רטט, עדיפות) ללא צורך להיכנס לאפליקציה עצמה.",
    principle: "חווית משתמש - לתת למשתמש שליטה על האופן שבו האפליקציה מתקשרת איתו."
  },
  {
    id: "7",
    topic: "Fragment",
    question: "למה מומלץ להשתמש ב-newInstance עם Arguments במקום Constructor עם פרמטרים?",
    options: [
      "כי זה מהיר יותר",
      "כי אנדרואיד יוצר מחדש Fragments עם ה-Constructor הריק ו-Arguments נשמרים",
      "כי זה יותר קריא",
      "כי Fragments לא תומכים ב-Constructor עם פרמטרים"
    ],
    correctIndex: 1,
    explanation: "כשהמערכת יוצרת מחדש Fragment (למשל בסיבוב מסך), היא משתמשת ב-Constructor הריק. Arguments נשמרים ונשלפים, בעוד פרמטרים שהועברו ל-Constructor יאבדו.",
    principle: "ניהול מחזור חיים - להבין איך אנדרואיד מנהל את הרכיבים שלנו ולהתכונן ליצירה מחדש."
  },
  {
    id: "8",
    topic: "Sensors",
    question: "למה חשוב לבטל רישום מחיישנים ב-onPause?",
    options: [
      "כי החיישנים לא עובדים כשהאפליקציה ברקע",
      "כדי לחסוך בסוללה ולא לקבל נתונים כשלא צריך",
      "כי המערכת דורשת זאת",
      "כי אחרת האפליקציה תקרוס"
    ],
    correctIndex: 1,
    explanation: "חיישנים צורכים סוללה משמעותית. כשהאפליקציה ברקע, אין סיבה לקבל נתוני חיישנים, ולכן כדאי לבטל רישום לחיסכון במשאבים.",
    principle: "ניהול משאבים - לא לבזבז סוללה ומשאבים כשלא משתמשים בהם."
  },
  {
    id: "9",
    topic: "Handler",
    question: "מהי הסכנה העיקרית בשימוש ב-Handler בתוך Activity?",
    options: [
      "הוא איטי מדי",
      "הוא יכול לגרום ל-Memory Leak אם לא מבטלים callbacks",
      "הוא לא תומך בכל סוגי הנתונים",
      "הוא לא עובד ברקע"
    ],
    correctIndex: 1,
    explanation: "Handler שמחזיק reference ל-Activity יכול למנוע מה-Activity להשתחרר מהזיכרון גם אחרי סגירתו, מה שגורם ל-Memory Leak.",
    principle: "ניהול זיכרון - להבין את ה-references בין אובייקטים ולנקות אותם כשלא צריך."
  },
  {
    id: "10",
    topic: "JobScheduler",
    question: "מה היתרון העיקרי של JobScheduler על פני AlarmManager?",
    options: [
      "הוא יותר מדויק בתזמון",
      "הוא מאפשר להגדיר תנאים והמערכת מחליטה מתי הכי יעיל להריץ",
      "הוא פשוט יותר לשימוש",
      "הוא עובד גם ללא חיבור רשת"
    ],
    correctIndex: 1,
    explanation: "JobScheduler מאפשר להגדיר תנאים (רשת, טעינה, מכשיר פנוי) והמערכת מאגדת משימות ומריצה אותן בזמן האופטימלי לחיסכון בסוללה.",
    principle: "אופטימיזציה ברמת המערכת - לתת למערכת ההפעלה להחליט על תזמון אופטימלי."
  }
];

export default function Practice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    setScore(prev => ({
      correct: prev.correct + (index === currentQuestion.correctIndex ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore({ correct: 0, total: 0 });
  };

  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              אזור תרגול
            </h1>
            <p className="text-lg text-muted-foreground">
              שאלות על עקרונות ומושגים מרכזיים - התמקדות בהבנה ולא בשינון קוד
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">
                  שאלה {currentIndex + 1} מתוך {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  ציון: {score.correct}/{score.total}
                </span>
                <Button variant="ghost" size="sm" onClick={resetQuiz}>
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-card rounded-2xl border border-border/50 shadow-card p-8">
              {/* Topic Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {currentQuestion.topic}
              </div>

              {/* Question */}
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctIndex;
                  const showResult = selectedAnswer !== null;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-xl text-right transition-all border-2",
                        !showResult && "hover:border-primary/50 hover:bg-muted/50 cursor-pointer",
                        !showResult && "border-border bg-background",
                        showResult && isCorrect && "border-success bg-success/10",
                        showResult && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                        showResult && !isSelected && !isCorrect && "border-border bg-muted/30 opacity-60"
                      )}
                    >
                      <div className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        !showResult && "bg-muted text-muted-foreground",
                        showResult && isCorrect && "bg-success text-success-foreground",
                        showResult && isSelected && !isCorrect && "bg-destructive text-destructive-foreground",
                        showResult && !isSelected && !isCorrect && "bg-muted text-muted-foreground"
                      )}>
                        {showResult ? (
                          isCorrect ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : isSelected ? (
                            <XCircle className="h-5 w-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className={cn(
                        "text-base",
                        showResult && isCorrect && "font-medium text-foreground",
                        showResult && isSelected && !isCorrect && "text-foreground",
                        showResult && !isSelected && !isCorrect && "text-muted-foreground"
                      )}>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="space-y-4 animate-slide-up">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-start gap-3 mb-3">
                      <Lightbulb className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-foreground mb-2">הסבר</h4>
                        <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <h4 className="font-bold text-primary mb-2">העיקרון החשוב:</h4>
                    <p className="text-foreground">{currentQuestion.principle}</p>
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-end pt-4">
                    {isLastQuestion ? (
                      <Button variant="hero" onClick={resetQuiz} className="gap-2">
                        <RefreshCcw className="h-4 w-4" />
                        התחל מחדש
                      </Button>
                    ) : (
                      <Button variant="hero" onClick={nextQuestion} className="gap-2">
                        שאלה הבאה
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
