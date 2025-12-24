import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  Circle,
  Lightbulb,
  Copy,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BookSection {
  id: string;
  title: string;
  description: string;
  content: string;
  template?: string;
  tips: string[];
}

const bookSections: BookSection[] = [
  {
    id: "intro",
    title: "מבוא",
    description: "הצגת הפרויקט, הרקע והמוטיבציה",
    content: `פרק המבוא הוא הפנים של הפרויקט שלך - הוא נותן לבוחן מושג ראשוני על מה שבנית ולמה.

צריך לכלול:
• **שם הפרויקט** - שם קצר ותיאורי
• **תיאור קצר** - במשפט או שניים, מה האפליקציה עושה
• **קהל היעד** - למי האפליקציה מיועדת
• **סיבות לבחירת הנושא** - למה בחרת דווקא בפרויקט הזה

**תהליך המחקר:**
• מחקר על תחום הידע - מה למדת על הנושא
• סקירת המצב הקיים - אילו אפליקציות דומות קיימות
• חידושים בפרויקט - מה ייחודי באפליקציה שלך
• טכנולוגיות חדשות - האם השתמשת בטכנולוגיות שלא נלמדו בכיתה

**אתגרים מרכזיים:**
• מהי הבעיה שהפרויקט פותר
• אילו פתרונות נבחנו
• מה הגישה שנבחרה ולמה`,
    template: `# מבוא

## רקע
שם הפרויקט: [שם האפליקציה]
תיאור קצר: [מה האפליקציה עושה]
קהל היעד: [למי מיועדת]
סיבות לבחירת הנושא: [למה בחרתי בנושא]

## תהליך המחקר
[תאר את המחקר שביצעת]

## אתגרים מרכזיים
[תאר את האתגרים העיקריים שהתמודדת איתם]`,
    tips: [
      "כתוב בגוף ראשון - זה הפרויקט שלך",
      "היה ספציפי - במקום 'אפליקציה לניהול משימות' כתוב 'אפליקציה לניהול משימות יומיות עם תזכורות'",
      "הסבר את המוטיבציה האישית שלך"
    ]
  },
  {
    id: "requirements",
    title: "מענה לדרישות",
    description: "טבלת ההרחבות שמימשת",
    content: `פרק זה מציג איזה הרחבות מימשת בפרויקט ואיפה הן נמצאות.

**מה צריך:**
טבלה שמפרטת כל הרחבה, האם מימשת אותה, ואיפה בקוד היא נמצאת.

**סעיפים:**
• סעיף 6 - הרחבות בסיסיות (אחת לפחות)
• סעיף 7 - אחסון וטיפול בנתונים (חובה)
• סעיף 9 - נושאים מתקדמים (אחד לפחות)
• סעיף 10 - נושאים משולבים (שניים = נושא מתקדם אחד)`,
    template: `# מענה לדרישות משרד החינוך

| נושא | מומש | מיקום |
|------|------|-------|
| AlarmManager | ✓ | MainActivity.java שורות 45-67 |
| Notification | ✓ | NotificationHelper.java |
| SQLite Database | ✓ | DBHelper.java |
| Fragment | ✓ | DetailsFragment.java |
| SharedPreferences | ✓ | SettingsActivity.java |
| GPS | ✓ | LocationService.java |`,
    tips: [
      "סמן רק מה שבאמת מימשת",
      "ציין מיקום מדויק בקוד",
      "ודא שמימשת את הכמות הנדרשת"
    ]
  },
  {
    id: "architecture",
    title: "ארכיטקטורה/מבנה",
    description: "תרשים זרימה ומבנה הפרויקט",
    content: `פרק הארכיטקטורה מציג את המבנה הכללי של האפליקציה.

**מה צריך:**
• **תרשים זרימה** - איך המשתמש נע באפליקציה
• **תיעוד מסכים** - תמונות + הסבר לכל מסך
• **קשרים בין מחלקות** - מי משתמש במי

**לכל מסך:**
• שם המסך / Activity
• תמונת מסך
• תיאור מה אפשר לעשות במסך
• הסבר על כל אלמנט (כפתור, שדה קלט וכו')`,
    template: `# ארכיטקטורה

## תרשים זרימה
[הכנס תמונה של תרשים הזרימה]

## מסכי האפליקציה

### מסך ראשי - MainActivity
[תמונת מסך]
**תיאור:** מסך הבית של האפליקציה
**אלמנטים:**
- ListView להצגת רשימת פריטים
- FloatingActionButton להוספת פריט חדש
- Menu להגדרות

### מסך פרטים - DetailsActivity
[תמונת מסך]
**תיאור:** הצגת פרטי פריט בודד
**אלמנטים:**
- ...`,
    tips: [
      "השתמש בכלי כמו draw.io ליצירת תרשימים",
      "צלם מסכים מהאמולטור או מהטלפון",
      "הסבר גם על כפתורים 'פשוטים' - הבוחן לא מכיר את האפליקציה"
    ]
  },
  {
    id: "implementation",
    title: "מימוש הפרויקט",
    description: "תיעוד טכני מפורט",
    content: `פרק המימוש הוא הלב הטכני של ספר הפרויקט.

**מה צריך לתעד:**

**Activities:**
לכל Activity - טבלת UML עם:
• שם המחלקה
• תכונות (משתנים)
• פעולות (מתודות)
• הסבר על התפקיד

**עצמים (Objects):**
לכל מחלקת עצם (כמו User, Task, Product):
• טבלת UML
• תיאור העצם
• איפה משתמשים בו

**מחלקות עזר:**
• DBHelper
• Adapters
• Services
• BroadcastReceivers

**מסד נתונים:**
• שם מסד הנתונים
• טבלאות וקשרים ביניהן
• לכל טבלה: שמות עמודות וסוגי נתונים`,
    template: `# מימוש הפרויקט

## Activities

### MainActivity
| תכונה | סוג | תיאור |
|-------|-----|-------|
| itemsList | ArrayList<Item> | רשימת הפריטים |
| adapter | ItemAdapter | מתאם לתצוגה |

| פעולה | תיאור |
|-------|-------|
| onCreate() | אתחול המסך |
| loadItems() | טעינת פריטים מ-DB |
| addItem() | הוספת פריט חדש |

## מחלקות עצמים

### Item
| תכונה | סוג | תיאור |
|-------|-----|-------|
| id | int | מזהה ייחודי |
| name | String | שם הפריט |
| createdAt | Date | תאריך יצירה |

## מסד נתונים

### טבלת items
| עמודה | סוג | הערות |
|-------|-----|-------|
| _id | INTEGER | PRIMARY KEY |
| name | TEXT | NOT NULL |
| created_at | INTEGER | timestamp |`,
    tips: [
      "השתמש בטבלאות UML - זה מה שהבוחנים רוצים לראות",
      "הסבר את ההיגיון מאחורי ההחלטות",
      "אל תעתיק קוד שלם - רק דוגמאות קצרות אם צריך"
    ]
  },
  {
    id: "user-guide",
    title: "מדריך למשתמש",
    description: "הסבר לשימוש באפליקציה",
    content: `מדריך למשתמש מיועד למישהו שלא מבין בתכנות.

**מה צריך:**
• **דרישות התקנה** - גרסת אנדרואיד, הרשאות נדרשות
• **הוראות הפעלה** - צעד אחר צעד
• **מגבלות** - מה לא עובד, גדלי קלט מקסימליים

**סגנון כתיבה:**
• פשוט וברור
• ללא מונחים טכניים
• עם תמונות להמחשה`,
    template: `# מדריך למשתמש

## דרישות מערכת
- אנדרואיד גרסה 7.0 ומעלה
- הרשאות נדרשות: מיקום, מצלמה, אחסון

## התחלת שימוש
1. התקן את האפליקציה
2. אשר את ההרשאות הנדרשות
3. צור חשבון משתמש / התחבר

## שימוש בסיסי

### הוספת פריט חדש
1. לחץ על כפתור ה-+ בתחתית המסך
2. מלא את הפרטים
3. לחץ "שמור"

[תמונת מסך]

## מגבלות
- שם הפריט: עד 50 תווים
- גודל תמונה: עד 5MB`,
    tips: [
      "כתוב כאילו המשתמש לא יודע כלום",
      "השתמש בתמונות מסך עם חיצים",
      "ציין בבירור מה לא עובד או מוגבל"
    ]
  },
  {
    id: "reflection",
    title: "רפלקציה אישית",
    description: "מבט לאחור על תהליך הפיתוח",
    content: `הרפלקציה היא הזדמנות להראות מה למדת מהתהליך.

**מה לכלול:**
• מה למדתי מהפרויקט
• אתגרים שהתגברתי עליהם
• מה הייתי עושה אחרת
• רעיונות להמשך פיתוח

**טון:**
כתוב בכנות ובאופן אישי. הבוחנים מעריכים מודעות עצמית.`,
    template: `# רפלקציה אישית

## מה למדתי
[תאר מה למדת מהפרויקט - טכנית ואישית]

## אתגרים והתמודדות
[תאר אתגר משמעותי ואיך התגברת עליו]

## מה הייתי עושה אחרת
[אם היית מתחיל מחדש, מה היית משנה?]

## המשך פיתוח
[רעיונות לשיפור האפליקציה בעתיד]`,
    tips: [
      "היה כנה - זה בסדר להודות בטעויות",
      "הדגש את הלמידה, לא רק את הבעיות",
      "הראה חשיבה ביקורתית"
    ]
  },
  {
    id: "bibliography",
    title: "ביבליוגרפיה",
    description: "רשימת מקורות",
    content: `ביבליוגרפיה היא רשימה של כל המקורות ששימשו אותך.

**מה לכלול:**
• אתרים (StackOverflow, tutorials)
• ספרים
• סרטוני YouTube
• קוד שהעתקת/התבססת עליו
• כלים שהשתמשת בהם (עיצוב, אייקונים)`,
    template: `# ביבליוגרפיה

## ספרים ומדריכים
- פרימן, זאב ואלברט לוי. "הנדסת תוכנה - ספר לימוד מעשי"

## אתרים
- Stack Overflow - פתרון בעיות טכניות
  https://stackoverflow.com

## עיצוב
- Canva - עיצוב גרפי
  https://www.canva.com
- Icons8 - אייקונים
  https://icons8.com

## קוד וספריות
- [שם הספרייה] - [מה היא עושה]
  [קישור]`,
    tips: [
      "תעד כל מקור שהשתמשת בו",
      "כלול גם קישורים",
      "זה מראה על עבודה מחקרית"
    ]
  }
];

function SectionCard({ section, isOpen, onToggle }: { 
  section: BookSection; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const copyTemplate = async () => {
    if (section.template) {
      await navigator.clipboard.writeText(section.template);
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold text-foreground">{section.title}</h3>
            <p className="text-sm text-muted-foreground">{section.description}</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="p-5 pt-0 border-t border-border/50 space-y-6 animate-slide-up">
          {/* Main Content */}
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-line text-foreground leading-relaxed">
              {section.content}
            </div>
          </div>

          {/* Template */}
          {section.template && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-foreground">תבנית לדוגמה</h4>
                <Button variant="ghost" size="sm" onClick={copyTemplate} className="gap-2">
                  {copiedTemplate ? (
                    <>
                      <Check className="h-4 w-4 text-success" />
                      הועתק!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      העתק
                    </>
                  )}
                </Button>
              </div>
              <div className="code-block rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{section.template}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-2">טיפים</h4>
                <ul className="space-y-1">
                  {section.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Book() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["intro"]));
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    const newOpen = new Set(openSections);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenSections(newOpen);
  };

  const toggleCompleted = (id: string) => {
    const newCompleted = new Set(completedSections);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedSections(newCompleted);
  };

  const progress = (completedSections.size / bookSections.length) * 100;

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              מדריך לכתיבת ספר פרויקט
            </h1>
            <p className="text-lg text-muted-foreground">
              הסברים ותבניות לכל פרק בספר הפרויקט לפי הפורמט הנדרש
            </p>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground">התקדמות בכתיבה</h2>
                <span className="text-sm text-muted-foreground">
                  {completedSections.size} מתוך {bookSections.length} פרקים
                </span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {bookSections.map((section, index) => (
              <div key={section.id} className="flex items-start gap-4">
                {/* Completion Checkbox */}
                <button
                  onClick={() => toggleCompleted(section.id)}
                  className="mt-5 flex-shrink-0"
                >
                  {completedSections.has(section.id) ? (
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                  )}
                </button>

                {/* Section Number */}
                <div className={cn(
                  "mt-5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                  completedSections.has(section.id) 
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-muted-foreground"
                )}>
                  {index + 1}
                </div>

                {/* Section Card */}
                <div className="flex-1">
                  <SectionCard 
                    section={section}
                    isOpen={openSections.has(section.id)}
                    onToggle={() => toggleSection(section.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
