// דרישות הפרויקט לבדיקה שהפרויקט עומד בדרישות 5 יחל"מ
// הבודק מתמקד בדרישות הטכניות של הפרויקט עצמו

export interface RequirementCategory {
  id: string;
  name: string;
  description?: string;
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
    id: "objects",
    name: "עצמים ומחלקות",
    description: "שימוש בתכנות מונחה עצמים",
    requirements: [
      {
        id: "class-definition",
        name: "הגדרת מחלקות",
        description: "יצירת מחלקות עצמים עם תכונות ופעולות",
        subItems: [
          "לפחות 2 מחלקות עצמים שונות",
          "תכונות (משתנים פרטיים) במחלקה",
          "פעולה בונה (Constructor)",
          "פעולות Getters",
          "פעולות Setters",
          "פעולות נוספות (לוגיקה עסקית)"
        ]
      }
    ]
  },
  {
    id: "data-structures",
    name: "מבני נתונים",
    description: "שימוש במבני נתונים לאחסון וניהול מידע",
    requirements: [
      {
        id: "collections",
        name: "אוספים ומערכים",
        description: "שימוש ב-ArrayList או מערכים",
        subItems: [
          "ArrayList או מערך לאחסון עצמים",
          "הוספת פריטים לרשימה",
          "הסרת פריטים מהרשימה",
          "חיפוש ברשימה",
          "מעבר על הרשימה (לולאה)"
        ]
      }
    ]
  },
  {
    id: "database",
    name: "מסד נתונים SQLite",
    description: "אחסון קבוע של נתונים במסד נתונים",
    requirements: [
      {
        id: "sqlite",
        name: "עבודה עם SQLite",
        description: "שימוש ב-SQLite לשמירת נתונים",
        subItems: [
          "מחלקה שיורשת מ-SQLiteOpenHelper",
          "יצירת טבלאות (CREATE TABLE)",
          "הוספת נתונים (INSERT)",
          "קריאת נתונים (SELECT)",
          "עדכון נתונים (UPDATE)",
          "מחיקת נתונים (DELETE)",
          "שימוש ב-Cursor"
        ]
      }
    ]
  },
  {
    id: "activities",
    name: "מסכים וניווט",
    description: "ריבוי מסכים והעברת נתונים ביניהם",
    requirements: [
      {
        id: "multi-screen",
        name: "ריבוי מסכים",
        description: "שימוש במספר Activities",
        subItems: [
          "לפחות 3 מסכים (Activities) שונים",
          "מעבר בין מסכים עם Intent",
          "העברת נתונים עם putExtra",
          "קבלת נתונים עם getIntent"
        ]
      }
    ]
  },
  {
    id: "ui",
    name: "ממשק משתמש",
    description: "עיצוב ורכיבי UI",
    requirements: [
      {
        id: "ui-components",
        name: "רכיבי ממשק",
        description: "שימוש ברכיבי UI מגוונים",
        subItems: [
          "TextView להצגת טקסט",
          "EditText לקלט מהמשתמש",
          "Button לפעולות",
          "ImageView לתמונות",
          "ListView או RecyclerView לרשימות",
          "Layout מתאים (Linear/Relative/Constraint)"
        ]
      }
    ]
  },
  {
    id: "extensions-basic",
    name: "הרחבות בסיסיות (סעיף 6)",
    description: "לפחות נושא אחד מהרשימה - שווה נקודה אחת",
    requirements: [
      {
        id: "ext-6",
        name: "בחר הרחבה אחת לפחות",
        description: "סמן את ההרחבות שמימשת",
        subItems: [
          "AlarmManager - תזמון משימות",
          "Notification - התראות",
          "JobScheduler - תזמון עבודות",
          "הורדת נתונים מהאינטרנט (API)",
          "Service - שירות ברקע",
          "ActivityForResult - קבלת תוצאה מ-Activity",
          "ContentProvider - שיתוף נתונים",
          "אנימציות (Animation)"
        ]
      }
    ]
  },
  {
    id: "extensions-advanced",
    name: "נושאים מתקדמים (סעיף 9)",
    description: "לפחות נושא אחד מהרשימה - שווה נקודה אחת",
    requirements: [
      {
        id: "ext-9",
        name: "בחר נושא מתקדם אחד לפחות",
        description: "סמן את הנושאים המתקדמים שמימשת",
        subItems: [
          "חיישנים (Sensors)",
          "SurfaceView - ציור מתקדם",
          "ירושה ממחלקת View",
          "Google Maps - מפות",
          "Fragments",
          "Threads - ריבוי תהליכים",
          "NFC",
          "Bluetooth",
          "Firebase",
          "API בצד שרת"
        ]
      }
    ]
  },
  {
    id: "extensions-combined",
    name: "נושאים משולבים (סעיף 10)",
    description: "שילוב של 2 נושאים = נקודה אחת (שווה ערך לנושא מתקדם)",
    requirements: [
      {
        id: "ext-10",
        name: "נושאים משולבים (צריך 2 לנקודה)",
        description: "סמן את הנושאים המשולבים שמימשת",
        subItems: [
          "BroadcastReceiver",
          "SharedPreferences",
          "Camera - מצלמה",
          "Gallery - גלריה",
          "GPS - מיקום",
          "CountDownTimer",
          "Handler",
          "TextToSpeech",
          "SpeechToText",
          "Microphone - הקלטת שמע",
          "Singleton"
        ]
      }
    ]
  }
];

// חישוב האם הפרויקט עומד בדרישות 5 יחל"מ
export const checkProjectValidity = (checkedItems: Set<string>): {
  isValid: boolean;
  extensionPoints: number;
  missingRequirements: string[];
} => {
  const missingRequirements: string[] = [];
  
  // בדיקת דרישות בסיסיות
  const basicCategories = ["objects", "data-structures", "database", "activities", "ui"];
  basicCategories.forEach(catId => {
    const category = projectRequirements.find(c => c.id === catId);
    if (category) {
      const allItems = category.requirements.flatMap(req =>
        req.subItems ? req.subItems.map((_, i) => `${req.id}-${i}`) : [req.id]
      );
      const checkedCount = allItems.filter(id => checkedItems.has(id)).length;
      if (checkedCount < allItems.length * 0.5) {
        missingRequirements.push(category.name);
      }
    }
  });

  // חישוב נקודות הרחבות
  let extensionPoints = 0;

  // הרחבות בסיסיות (סעיף 6) - כל אחת שווה נקודה
  const ext6Items = projectRequirements.find(c => c.id === "extensions-basic")
    ?.requirements[0].subItems || [];
  const ext6Checked = ext6Items.filter((_, i) => checkedItems.has(`ext-6-${i}`)).length;
  extensionPoints += ext6Checked;

  // נושאים מתקדמים (סעיף 9) - כל אחד שווה נקודה
  const ext9Items = projectRequirements.find(c => c.id === "extensions-advanced")
    ?.requirements[0].subItems || [];
  const ext9Checked = ext9Items.filter((_, i) => checkedItems.has(`ext-9-${i}`)).length;
  extensionPoints += ext9Checked;

  // נושאים משולבים (סעיף 10) - כל 2 שווים נקודה
  const ext10Items = projectRequirements.find(c => c.id === "extensions-combined")
    ?.requirements[0].subItems || [];
  const ext10Checked = ext10Items.filter((_, i) => checkedItems.has(`ext-10-${i}`)).length;
  extensionPoints += Math.floor(ext10Checked / 2);

  // בדיקה האם עומד בדרישות 5 יחל"מ
  // דרישות: הרחבות גדולות 6, בינוניות 9, או קטנות 10 (סה"כ 5 נקודות הרחבות)
  const isValid = missingRequirements.length === 0 && extensionPoints >= 5;

  if (extensionPoints < 5) {
    missingRequirements.push(`נדרשות עוד ${5 - extensionPoints} נקודות הרחבות`);
  }

  return { isValid, extensionPoints, missingRequirements };
};

// חישוב אחוז השלמה כללי
export const getTotalProgress = (checkedItems: Set<string>): number => {
  let totalItems = 0;
  let checkedCount = 0;

  projectRequirements.forEach(category => {
    category.requirements.forEach(req => {
      if (req.subItems) {
        totalItems += req.subItems.length;
        req.subItems.forEach((_, i) => {
          if (checkedItems.has(`${req.id}-${i}`)) checkedCount++;
        });
      } else {
        totalItems += 1;
        if (checkedItems.has(req.id)) checkedCount++;
      }
    });
  });

  return Math.round((checkedCount / totalItems) * 100);
};

// לתאימות אחורה
export const getTotalPoints = getTotalProgress;
