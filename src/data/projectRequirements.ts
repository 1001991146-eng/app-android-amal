// דרישות הפרויקט לפי המחוון
// Project requirements based on the rubric

export interface RequirementCategory {
  id: string;
  name: string;
  weight: number;
  requirements: Requirement[];
}

export interface Requirement {
  id: string;
  name: string;
  description: string;
  points?: number;
  subItems?: string[];
}

export const projectRequirements: RequirementCategory[] = [
  {
    id: "complexity",
    name: "מורכבות הפרויקט",
    weight: 35,
    requirements: [
      {
        id: "objects",
        name: "שימוש בעצמים",
        description: "הגדרת מחלקות עצמים עם תכונות, פעולות בונות ופעולות",
        subItems: [
          "לפחות 2 מחלקות עצמים שונות",
          "תכונות (משתנים) במחלקה",
          "פעולות בונות (Constructors)",
          "פעולות (Methods) - getters, setters ופעולות נוספות"
        ]
      },
      {
        id: "data-structures",
        name: "מבני נתונים",
        description: "שימוש במבני נתונים מתאימים לאחסון וניהול מידע",
        subItems: [
          "ArrayList או מערכים",
          "ניהול רשימות של עצמים",
          "חיפוש, מיון, הוספה ומחיקה"
        ]
      },
      {
        id: "database",
        name: "אחסון וטיפול בנתונים",
        description: "שימוש ב-SQLite לשמירת נתונים",
        subItems: [
          "יצירת טבלאות מתאימות",
          "פעולות CRUD (יצירה, קריאה, עדכון, מחיקה)",
          "שימוש ב-SQLiteOpenHelper",
          "ניהול גרסאות מסד הנתונים"
        ]
      },
      {
        id: "activities",
        name: "ריבוי מסכים",
        description: "שימוש במספר Activities עם ניווט ביניהם",
        subItems: [
          "לפחות 3 מסכים (Activities) שונים",
          "מעבר בין מסכים עם Intent",
          "העברת נתונים בין מסכים"
        ]
      }
    ]
  },
  {
    id: "extensions",
    name: "הרחבות נדרשות",
    weight: 25,
    requirements: [
      {
        id: "required-ext",
        name: "הרחבות מסעיף 6",
        description: "נושא אחד מרשימת ההרחבות הבסיסיות",
        subItems: [
          "AlarmManager",
          "Notification",
          "JobScheduler",
          "הורדת נתונים מהאינטרנט (API)",
          "Service",
          "ActivityForResult",
          "ContentProvider",
          "יצירת אנימציה"
        ]
      },
      {
        id: "advanced-ext",
        name: "נושאים מתקדמים מסעיף 9",
        description: "נושא אחד מהרשימה המתקדמת",
        subItems: [
          "חיישנים (Sensors)",
          "SurfaceView",
          "ירושה ממחלקת View",
          "GoogleMaps",
          "Fragment",
          "Threads",
          "NFC",
          "Bluetooth",
          "API בצד שרת"
        ]
      },
      {
        id: "combined-ext",
        name: "נושאים משולבים מסעיף 10",
        description: "שילוב של 2 נושאים קטנים (שווה ערך לנושא מתקדם אחד)",
        subItems: [
          "BroadcastReceiver",
          "SharedPreferences",
          "Camera & Gallery",
          "GPS",
          "CountDownTimer",
          "Handler",
          "TextToSpeech",
          "SpeechToText",
          "Microphone"
        ]
      }
    ]
  },
  {
    id: "documentation",
    name: "תיעוד ספר הפרויקט",
    weight: 25,
    requirements: [
      {
        id: "doc-note",
        name: "בדיקת ספר הפרויקט",
        description: "לבדיקה מפורטת של ספר הפרויקט השתמש בבודק ספר"
      }
    ]
  },
  {
    id: "presentation",
    name: "הצגה בעל פה",
    weight: 15,
    requirements: [
      {
        id: "demo",
        name: "הדגמת האפליקציה",
        description: "הצגה פעילה של האפליקציה והסבר על הפונקציונליות"
      },
      {
        id: "code-explanation",
        name: "הסבר קוד",
        description: "יכולת להסביר את הקוד ואת ההחלטות שהתקבלו"
      },
      {
        id: "questions",
        name: "מענה על שאלות",
        description: "יכולת לענות על שאלות הבוחן בנושאי הפרויקט"
      }
    ]
  }
];

export const getTotalPoints = (checkedItems: Set<string>): number => {
  let total = 0;
  projectRequirements.forEach(category => {
    const categoryItems = category.requirements.flatMap(req => 
      req.subItems ? req.subItems.map((_, i) => `${req.id}-${i}`) : [req.id]
    );
    const checked = categoryItems.filter(id => checkedItems.has(id)).length;
    const totalInCategory = categoryItems.length;
    total += (checked / totalInCategory) * category.weight;
  });
  return Math.round(total);
};
