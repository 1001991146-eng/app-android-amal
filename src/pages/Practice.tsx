import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  RefreshCcw,
  Lightbulb,
  ArrowLeft,
  Settings,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";
import { extensions } from "@/data/extensions";

interface Question {
  id: string;
  topic: string;
  extensionId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  principle: string;
}

// מאגר השאלות לפי הרחבות
const allQuestions: Question[] = [
  // Service
  {
    id: "service-1",
    topic: "Service",
    extensionId: "service",
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
  // AlarmManager
  {
    id: "alarm-1",
    topic: "AlarmManager",
    extensionId: "alarm-manager",
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
  // Threads/AsyncTask
  {
    id: "threads-1",
    topic: "Threads",
    extensionId: "threads",
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
  // SQLite
  {
    id: "sqlite-1",
    topic: "SQLite",
    extensionId: "sqlite-storage",
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
  // ContentProvider
  {
    id: "content-provider-1",
    topic: "ContentProvider",
    extensionId: "content-provider",
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
  // Notification
  {
    id: "notification-1",
    topic: "Notification",
    extensionId: "notification",
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
  // Fragment
  {
    id: "fragment-1",
    topic: "Fragment",
    extensionId: "fragment",
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
  // Sensors
  {
    id: "sensors-1",
    topic: "Sensors",
    extensionId: "sensors",
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
  // Handler
  {
    id: "handler-1",
    topic: "Handler",
    extensionId: "handler",
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
  // JobScheduler
  {
    id: "job-scheduler-1",
    topic: "JobScheduler",
    extensionId: "job-scheduler",
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
  },
  // Firebase Auth
  {
    id: "firebase-auth-1",
    topic: "Firebase Authentication",
    extensionId: "firebase-auth",
    question: "למה חשוב להשתמש ב-AuthStateListener במקום לבדוק ידנית אם המשתמש מחובר?",
    options: [
      "כי זה מהיר יותר",
      "כי הוא מאפשר לזהות שינויים במצב ההתחברות באופן אוטומטי",
      "כי Firebase דורש זאת",
      "כי זה צורך פחות זיכרון"
    ],
    correctIndex: 1,
    explanation: "AuthStateListener מאזין לשינויים במצב ההתחברות ומודיע לנו אוטומטית כשמשתמש מתחבר או מתנתק, ללא צורך בבדיקות ידניות.",
    principle: "Observer Pattern - להירשם לאירועים במקום לבדוק באופן פעיל (polling)."
  },
  // Firebase Realtime DB
  {
    id: "firebase-db-1",
    topic: "Firebase Realtime Database",
    extensionId: "firebase-realtime-db",
    question: "מהו היתרון המרכזי של Firebase Realtime Database על פני SQLite?",
    options: [
      "הוא מהיר יותר בשאילתות מורכבות",
      "הוא מסנכרן נתונים אוטומטית בין מכשירים ועם הענן",
      "הוא תופס פחות מקום על המכשיר",
      "הוא קל יותר ללמידה"
    ],
    correctIndex: 1,
    explanation: "Firebase Realtime Database מסנכרן נתונים אוטומטית בזמן אמת בין כל המכשירים המחוברים, וגם שומר נתונים בענן לגיבוי וגישה מכל מקום.",
    principle: "סנכרון בזמן אמת - שינוי במכשיר אחד מתעדכן מיד בכל המכשירים האחרים."
  },
  // GoogleMaps
  {
    id: "googlemaps-1",
    topic: "GoogleMaps",
    extensionId: "google-maps",
    question: "למה צריך API Key לשימוש ב-Google Maps?",
    options: [
      "כדי שהמפות יהיו יפות יותר",
      "כדי לאפשר ל-Google לזהות את האפליקציה ולמנוע שימוש לרעה",
      "כדי שהמפות יטענו מהר יותר",
      "כי זה חינמי רק עם API Key"
    ],
    correctIndex: 1,
    explanation: "API Key מאפשר ל-Google לזהות את האפליקציה, לעקוב אחר השימוש, להגביל גישה לא מורשית, ולחייב על שימוש מעבר למכסה החינמית.",
    principle: "אבטחה ושליטה - שימוש ב-keys לזיהוי והרשאות גישה לשירותים חיצוניים."
  },
  // SharedPreferences
  {
    id: "sharedpref-1",
    topic: "SharedPreferences",
    extensionId: "shared-preferences",
    question: "מתי כדאי להשתמש ב-SharedPreferences ומתי ב-SQLite?",
    options: [
      "SharedPreferences תמיד טוב יותר",
      "SQLite תמיד טוב יותר",
      "SharedPreferences להגדרות פשוטות, SQLite לנתונים מובנים ומורכבים",
      "זה לא משנה, שניהם זהים"
    ],
    correctIndex: 2,
    explanation: "SharedPreferences מתאים לערכים פשוטים כמו הגדרות משתמש (key-value). SQLite מתאים לנתונים מובנים עם קשרים, שאילתות וכמויות גדולות.",
    principle: "בחירת הכלי הנכון - לכל סוג אחסון יתרונות וחסרונות, צריך להתאים לצורך."
  },
  // Camera
  {
    id: "camera-1",
    topic: "Camera & Gallery",
    extensionId: "camera-gallery",
    question: "למה חשוב לבקש הרשאות מהמשתמש בזמן ריצה לגישה למצלמה?",
    options: [
      "כי זה מהיר יותר",
      "כי מאנדרואיד 6.0+ הרשאות רגישות דורשות אישור מפורש של המשתמש",
      "כי המצלמה לא עובדת אחרת",
      "כי זה חוסך סוללה"
    ],
    correctIndex: 1,
    explanation: "מאנדרואיד 6.0 (API 23), הרשאות מסוכנות כמו מצלמה, מיקום ואנשי קשר דורשות אישור מפורש מהמשתמש בזמן ריצה, לא רק בהתקנה.",
    principle: "פרטיות ואבטחה - לתת למשתמש שליטה על הרשאות רגישות."
  },
  // Animation
  {
    id: "animation-1",
    topic: "יצירת אנימציה",
    extensionId: "animation",
    question: "מה ההבדל העיקרי בין אנימציה עצמאית עם Canvas לבין שימוש ב-ObjectAnimator?",
    options: [
      "ObjectAnimator מהיר יותר",
      "אנימציה עצמאית מציירת הכל מאפס על Canvas, בעוד ObjectAnimator משנה מאפיינים של View קיים",
      "אין הבדל, שניהם עושים אותו דבר",
      "ObjectAnimator עובד רק על תמונות"
    ],
    correctIndex: 1,
    explanation: "באנימציה עצמאית אנחנו מציירים את כל הגרפיקה בעצמנו על Canvas בכל פריים. ObjectAnimator משנה מאפיינים (כמו מיקום, גודל, שקיפות) של Views קיימים.",
    principle: "Game Loop - לולאת update-draw חוזרת היא הבסיס לאנימציה עצמאית ומשחקים."
  },
  // BroadcastReceiver
  {
    id: "broadcast-1",
    topic: "BroadcastReceiver",
    extensionId: "broadcast-receiver",
    question: "מה יקרה אם נבצע פעולה ארוכה בתוך onReceive של BroadcastReceiver?",
    options: [
      "הפעולה תרוץ ברקע ללא בעיה",
      "האפליקציה עלולה להיהרג כי onReceive צריך לסיים מהר",
      "המערכת תמתין עד שהפעולה תסתיים",
      "הפעולה תבוטל אוטומטית"
    ],
    correctIndex: 1,
    explanation: "ל-onReceive יש זמן מוגבל (כ-10 שניות). אם הוא לא מסיים בזמן, המערכת עלולה להרוג את התהליך. לפעולות ארוכות יש להפעיל Service.",
    principle: "זמני תגובה - רכיבים מסוימים צריכים לסיים מהר, פעולות ארוכות מועברות לשירותים."
  },
  // GPS
  {
    id: "gps-1",
    topic: "GPS",
    extensionId: "gps",
    question: "למה כדאי להשתמש ב-FusedLocationProvider במקום ב-LocationManager הרגיל?",
    options: [
      "כי הוא חינמי",
      "כי הוא משלב מקורות מידע שונים (GPS, רשת, WiFi) לדיוק טוב יותר וחיסכון בסוללה",
      "כי הוא עובד גם ללא GPS",
      "כי הוא פשוט יותר לשימוש"
    ],
    correctIndex: 1,
    explanation: "FusedLocationProvider משלב נתונים מ-GPS, רשת סלולרית ו-WiFi כדי לתת מיקום מדויק תוך חיסכון מקסימלי בסוללה.",
    principle: "אופטימיזציה - שימוש באלגוריתמים חכמים לאיזון בין דיוק לצריכת משאבים."
  },
  // CountDownTimer
  {
    id: "countdown-1",
    topic: "CountDownTimer",
    extensionId: "countdown-timer",
    question: "למה חשוב לבטל את ה-CountDownTimer ב-onDestroy או onPause?",
    options: [
      "כי הוא צורך הרבה סוללה",
      "כי הוא ימשיך לרוץ ולנסות לעדכן UI שכבר לא קיים",
      "כי אנדרואיד דורש זאת",
      "כי הוא תופס הרבה זיכרון"
    ],
    correctIndex: 1,
    explanation: "אם לא מבטלים את ה-Timer, הוא ימשיך לרוץ ולנסות לעדכן Views שכבר לא קיימים, מה שיגרום לקריסות ולדליפות זיכרון.",
    principle: "ניקוי משאבים - כל מה שמתחילים צריך לעצור כשלא צריך אותו יותר."
  }
];

// קבלת רשימת ההרחבות הזמינות לבחירה
const getAvailableExtensions = () => {
  const uniqueExtensions = [...new Set(allQuestions.map(q => q.extensionId))];
  return extensions.filter(ext => uniqueExtensions.includes(ext.id));
};

export default function Practice() {
  const [selectedExtensions, setSelectedExtensions] = useState<Set<string>>(new Set());
  const [isConfiguring, setIsConfiguring] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const availableExtensions = useMemo(() => getAvailableExtensions(), []);

  // סינון השאלות לפי ההרחבות שנבחרו
  const filteredQuestions = useMemo(() => {
    if (selectedExtensions.size === 0) return [];
    return allQuestions.filter(q => selectedExtensions.has(q.extensionId));
  }, [selectedExtensions]);

  const currentQuestion = filteredQuestions[currentIndex];

  const toggleExtension = (id: string) => {
    const newSelected = new Set(selectedExtensions);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedExtensions(newSelected);
  };

  const selectAll = () => {
    setSelectedExtensions(new Set(availableExtensions.map(ext => ext.id)));
  };

  const clearAll = () => {
    setSelectedExtensions(new Set());
  };

  const startPractice = () => {
    if (selectedExtensions.size === 0) return;
    setIsConfiguring(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore({ correct: 0, total: 0 });
  };

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
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const goBack = () => {
    setIsConfiguring(true);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore({ correct: 0, total: 0 });
  };

  const isLastQuestion = currentIndex === filteredQuestions.length - 1;

  // מסך בחירת הרחבות
  if (isConfiguring) {
    return (
      <Layout>
        <section className="gradient-hero py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                אזור תרגול
              </h1>
              <p className="text-lg text-muted-foreground">
                בחר את ההרחבות שבחרת לפרויקט שלך כדי לקבל שאלות רלוונטיות
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-2xl border border-border/50 shadow-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">
                    בחר את ההרחבות שלך
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={selectAll}>
                      בחר הכל
                    </Button>
                    <Button variant="ghost" size="sm" onClick={clearAll}>
                      נקה הכל
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {availableExtensions.map((ext) => {
                    const isSelected = selectedExtensions.has(ext.id);
                    const questionCount = allQuestions.filter(q => q.extensionId === ext.id).length;
                    
                    return (
                      <button
                        key={ext.id}
                        onClick={() => toggleExtension(ext.id)}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl text-right transition-all border-2",
                          isSelected 
                            ? "border-primary bg-primary/10" 
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                          {isSelected && <CheckCircle2 className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{ext.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {questionCount} שאלות
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-muted-foreground">
                    נבחרו {selectedExtensions.size} הרחבות ({filteredQuestions.length} שאלות)
                  </div>
                  <Button 
                    variant="hero" 
                    onClick={startPractice}
                    disabled={selectedExtensions.size === 0}
                    className="gap-2"
                  >
                    <Play className="h-4 w-4" />
                    התחל תרגול
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // מסך התרגול
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
                  שאלה {currentIndex + 1} מתוך {filteredQuestions.length}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  ציון: {score.correct}/{score.total}
                </span>
                <Button variant="ghost" size="sm" onClick={goBack} className="gap-1">
                  <Settings className="h-4 w-4" />
                  שנה הרחבות
                </Button>
                <Button variant="ghost" size="sm" onClick={resetQuiz}>
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
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
