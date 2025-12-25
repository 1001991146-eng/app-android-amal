import { Layout } from "@/components/layout/Layout";
import { 
  Brain, 
  Lightbulb, 
  Bug, 
  BookOpen, 
  Sparkles, 
  Code2,
  MessageSquare,
  Puzzle,
  Target,
  Zap,
  AlertTriangle,
  FileEdit,
  Search
} from "lucide-react";

const aiUseCases = [
  {
    icon: Puzzle,
    title: "הבנת הרחבות ורכיבים",
    description: "בינה מלאכותית יכולה להסביר לך כל הרחבה או רכיב נדרש בפרויקט, לתת דוגמאות קוד מותאמות אישית, ולענות על שאלות ספציפיות לגבי מימוש.",
    examples: [
      "הסבר לי איך עובד AlarmManager ותן לי דוגמה",
      "מה ההבדל בין Service ל-JobScheduler?",
      "איך מממשים ContentProvider עם SharedPreferences?"
    ]
  },
  {
    icon: BookOpen,
    title: "למידת מיומנויות חדשות",
    description: "למד נושאים חדשים בקצב שלך עם הסברים מותאמים אישית, דוגמאות ותרגילים.",
    examples: [
      "למד אותי איך לעבוד עם Firebase",
      "הסבר לי על Threads ואסינכרוניות באנדרואיד",
      "איך עובדים חיישנים באנדרואיד?"
    ]
  },
  {
    icon: Bug,
    title: "תיקון באגים",
    description: "העתק את הודעת השגיאה או הקוד הבעייתי וקבל הסבר על מה הבעיה ואיך לתקן אותה.",
    examples: [
      "יש לי NullPointerException בקוד הזה...",
      "האפליקציה קורסת כשאני לוחץ על הכפתור, הנה הקוד...",
      "למה ה-RecyclerView לא מציג נתונים?"
    ]
  },
  {
    icon: MessageSquare,
    title: "סיוע בניסוח ספר הפרויקט",
    description: "קבל עזרה בכתיבת הפרקים השונים של ספר הפרויקט - מהמבוא ועד הסיכום.",
    examples: [
      "עזור לי לנסח את פרק דרישות המערכת",
      "איך כותבים תרשים זרימה נכון?",
      "בדוק את הפרק שכתבתי ותן הערות לשיפור"
    ]
  },
  {
    icon: Lightbulb,
    title: "סיעור מוחות להרחבות",
    description: "קבל רעיונות יצירתיים לשילוב הרחבות שונות באפליקציה שלך בצורה הגיונית ומעניינת.",
    examples: [
      "יש לי אפליקציית ניהול משימות, איזה הרחבות יתאימו?",
      "איך אפשר לשלב GPS עם Notification באפליקציה שלי?",
      "תן לי רעיונות לשימוש בחיישנים באפליקציית כושר"
    ]
  },
  {
    icon: Target,
    title: "רעיונות לפרויקטים",
    description: "מתלבט מה לבנות? קבל רעיונות לפרויקטים מתאימים שישלבו את ההרחבות הנדרשות.",
    examples: [
      "תן לי רעיונות לפרויקט שמשלב מיקום ומצלמה",
      "מה אפשר לבנות עם Firebase ו-Notifications?",
      "רעיונות לפרויקט בתחום הבריאות והכושר"
    ]
  }
];

const recommendedTools = [
  {
    name: "ChatGPT",
    description: "מודל השפה הפופולרי של OpenAI, מצוין להסברים ותיקון קוד",
    url: "https://chat.openai.com"
  },
  {
    name: "Claude",
    description: "מודל של Anthropic, מעולה לניתוח קוד ארוך והסברים מעמיקים",
    url: "https://claude.ai"
  },
  {
    name: "Google Gemini",
    description: "מודל של Google, משולב היטב עם כלי פיתוח",
    url: "https://gemini.google.com"
  },
  {
    name: "GitHub Copilot",
    description: "עוזר קוד ישירות ב-Android Studio",
    url: "https://github.com/features/copilot"
  }
];

const tips = [
  "היה ספציפי בשאלות שלך - ככל שתיתן יותר פרטים, התשובה תהיה טובה יותר",
  "העתק את הקוד הרלוונטי כשאתה שואל על באגים",
  "בקש דוגמאות קוד מותאמות לפרויקט שלך",
  "אל תעתיק קוד בלי להבין אותו - בקש הסבר",
  "השתמש ב-AI ככלי עזר, לא כתחליף ללמידה",
  "וודא שהקוד שאתה מקבל מותאם לגרסת Android שלך"
];

export default function AI() {
  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-card mb-6">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              בינה מלאכותית לפרויקט
            </h1>
            <p className="text-lg text-muted-foreground">
              כיצד בינה מלאכותית יכולה לסייע לך בכתיבת פרויקט הבגרות
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">למה להשתמש בבינה מלאכותית?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    כלי בינה מלאכותית כמו ChatGPT, Claude ו-Gemini יכולים להיות עוזרים מצוינים בפיתוח הפרויקט שלך. 
                    הם יכולים להסביר מושגים מורכבים, לעזור בתיקון באגים, לתת רעיונות יצירתיים ולסייע בכתיבת ספר הפרויקט.
                    <br /><br />
                    <strong className="text-foreground">חשוב לזכור:</strong> בינה מלאכותית היא כלי עזר, לא תחליף ללמידה. 
                    השתמש בה כדי להבין טוב יותר, לא כדי להעתיק בלי הבנה.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              איך AI יכול לעזור לך?
            </h2>
            
            <div className="space-y-6">
              {aiUseCases.map((useCase, index) => (
                <div 
                  key={useCase.title}
                  className="bg-card rounded-xl border border-border/50 shadow-card p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                      <useCase.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{useCase.title}</h3>
                      <p className="text-muted-foreground mb-4">{useCase.description}</p>
                      
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                          <Code2 className="h-4 w-4" />
                          דוגמאות לשאלות:
                        </h4>
                        <ul className="space-y-2">
                          {useCase.examples.map((example, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>"{example}"</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Tools */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              כלים מומלצים
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {recommendedTools.map((tool, index) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card rounded-xl border border-border/50 shadow-card p-5 hover:shadow-elevated hover:border-primary/20 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-1">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              טיפים לשימוש יעיל
            </h2>
            
            <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
              <ul className="space-y-4">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-foreground pt-1">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Thinking */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-3">
              <Search className="h-7 w-7 text-primary" />
              חשיבה ביקורתית בשימוש ב-AI
            </h2>
            
            <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 space-y-6">
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">
                    <strong>AI עושה טעויות!</strong> בינה מלאכותית יכולה לתת מידע שגוי, קוד שלא עובד, או הסברים לא מדויקים. 
                    תמיד בדקו את המידע ממקורות נוספים.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-foreground">מה צריך לבדוק?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                    <div>
                      <strong className="text-foreground">האם הקוד עובד?</strong>
                      <p className="text-muted-foreground text-sm">הריצו את הקוד ובדקו שהוא אכן עובד כמצופה.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                    <div>
                      <strong className="text-foreground">האם ההסבר נכון?</strong>
                      <p className="text-muted-foreground text-sm">השוו את ההסבר לתיעוד הרשמי של Android או למקורות אמינים אחרים.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
                    <div>
                      <strong className="text-foreground">האם זה מתאים לפרויקט שלי?</strong>
                      <p className="text-muted-foreground text-sm">קוד שעובד באופן כללי לא בהכרח מתאים לארכיטקטורה של הפרויקט שלכם.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">4</span>
                    <div>
                      <strong className="text-foreground">האם אני מבין את הקוד?</strong>
                      <p className="text-muted-foreground text-sm">אם לא מבינים משהו - שאלו שאלות המשך עד שתבינו לגמרי.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">5</span>
                    <div>
                      <strong className="text-foreground">האם הגרסאות מתאימות?</strong>
                      <p className="text-muted-foreground text-sm">AI לפעמים נותן קוד לגרסאות ישנות של Android או ספריות.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation in Project Book */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-3">
              <FileEdit className="h-7 w-7 text-primary" />
              תיעוד שימוש ב-AI בספר הפרויקט
            </h2>
            
            <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 space-y-6">
              <p className="text-muted-foreground">
                מומלץ לתעד בספר הפרויקט (בפרק הרפלקציה או נספחים) את אופן השימוש שלכם ב-AI. 
                זה מראה על יושרה אקדמית ומודעות לכלים שהשתמשתם בהם.
              </p>

              <div className="space-y-4">
                <h3 className="font-bold text-foreground">מה כדאי לתעד?</h3>
                
                <div className="grid gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-bold text-foreground mb-2">1. סוגי השימוש</h4>
                    <p className="text-sm text-muted-foreground">
                      תארו באילו תחומים השתמשתם ב-AI: הבנת מושגים, תיקון באגים, כתיבת קוד, ניסוח טקסטים וכו'.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-bold text-foreground mb-2">2. דוגמאות לפרומפטים</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      ניתן לצרף דוגמאות לשאלות ששאלתם ואיך הן עזרו לכם:
                    </p>
                    <div className="bg-background rounded p-3 text-sm font-mono">
                      <p className="text-foreground">"הסבר לי איך לממש AlarmManager עם BroadcastReceiver"</p>
                      <p className="text-muted-foreground mt-2">→ עזר לי להבין את הקשר בין שני הרכיבים</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-bold text-foreground mb-2">3. תהליך הלמידה</h4>
                    <p className="text-sm text-muted-foreground">
                      תארו איך השימוש ב-AI השפיע על תהליך הלמידה שלכם - מה למדתם, איך השתפרתם, ומה עשיתם אחרת בזכות העזרה.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-bold text-foreground mb-2">4. מגבלות ואתגרים</h4>
                    <p className="text-sm text-muted-foreground">
                      ציינו מקרים שבהם ה-AI טעה או לא עזר, ואיך התמודדתם עם זה.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                <h4 className="font-bold text-foreground mb-2">💡 דוגמה לפסקת רפלקציה:</h4>
                <p className="text-sm text-muted-foreground italic">
                  "במהלך פיתוח הפרויקט השתמשתי בכלי AI (ChatGPT) כעזר ללמידה. השתמשתי בו בעיקר להבנת מושגים חדשים כמו Service ו-BroadcastReceiver, 
                  ולקבלת הסברים על שגיאות שנתקלתי בהן. כל קוד שקיבלתי מ-AI עברתי עליו, הבנתי אותו, והתאמתי לפרויקט שלי. 
                  היו מקרים שבהם הקוד שקיבלתי לא עבד ונאלצתי לחפש פתרונות נוספים, מה שלימד אותי על חשיבות הבדיקה והחשיבה הביקורתית."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-warning/10 border border-warning/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Zap className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">שימו לב!</h3>
                  <p className="text-muted-foreground">
                    בבחינה בעל פה תצטרכו להסביר את הקוד שכתבתם. ודאו שאתם מבינים כל שורה בפרויקט. 
                    השתמשו ב-AI כדי ללמוד ולהבין, לא כדי להעתיק בלי הבנה. 
                    הבוחנים מזהים קוד שהועתק ללא הבנה!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
