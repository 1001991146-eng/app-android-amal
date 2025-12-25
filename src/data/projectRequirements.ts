// דרישות הפרויקט לפי המחוון הרשמי של משרד החינוך
// מחוון בדיקת מתכונת - בחינה בעל פה

export interface RequirementCategory {
  id: string;
  name: string;
  weight: number; // משקל באחוזים
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

// מחוון בדיקת מתכונת - בחינה בעל פה (70% מציון המתכונת)
export const projectRequirements: RequirementCategory[] = [
  {
    id: "section-6",
    name: "סעיף 6 - הרחבות בסיסיות",
    weight: 0, // משקל נקבע לפי כמות ההרחבות שנבחרו
    description: "בחר נושא אחד לפחות. כל נושא = נקודה אחת",
    requirements: [
      {
        id: "ext-6",
        name: "הרחבות בסיסיות",
        description: "בחר הרחבה אחת לפחות מהרשימה",
        subItems: [
          "AlarmManager + Notification",
          "JobScheduler",
          "הורדת נתונים מהאינטרנט (API) והמרה מ-JSON/XML",
          "Service",
          "ActivityForResult - 2 מסכים",
          "ContentProvider (Intent-3 מסכים, 'Share', SharedPreferences או API, שמירה ב-XML)",
          "אנימציה (Firebase, Firestore, MySQL וכו') בסיס נתונים"
        ]
      }
    ]
  },
  {
    id: "section-9",
    name: "סעיף 9 - נושאים מתקדמים",
    weight: 0,
    description: "בחר נושא אחד לפחות. כל נושא = נקודה אחת",
    requirements: [
      {
        id: "ext-9",
        name: "נושאים מתקדמים",
        description: "בחר נושא מתקדם אחד לפחות מהרשימה",
        subItems: [
          "חיישנים (Sensors) - שימוש ב-3 חיישנים לפחות או 1 עם API או 'גלילה', התרעות",
          "10 פריימים (כל שניה) עם 6 סוגי אייקונים לפחות (2) ומשתמש בהנפשה",
          "SurfaceView או ירושה ממחלקת View (1) לפחות 10 פריימים (כל שניה) לפחות 9 סוגי אייקונים",
          "GoogleMaps עם מיקום נוכחי, טיפול בהרשאות, 'Threads', Bluetooth, NFC",
          "Fragment, 'פעולה עם תמונות, אנימציות וגלילה', SurfaceView, 'ירושה'",
          "Threads עם רשת או לוגיקה",
          "API בצד שרת (Firebase, MySQL) - קבלת נתונים והצגתם"
        ]
      }
    ]
  },
  {
    id: "section-10",
    name: "סעיף 10 - נושאים משולבים",
    weight: 0,
    description: "כל 2 נושאים = נקודה אחת (שווה ערך לנושא מתקדם)",
    requirements: [
      {
        id: "ext-10",
        name: "נושאים משולבים",
        description: "בחר נושאים משולבים (כל 2 = נקודה)",
        subItems: [
          "Broadcast Receiver",
          "Share Preference",
          "Camera & Gallery",
          "Async Task",
          "Handler",
          "Microphone",
          "GPS",
          "CountDown Timer",
          "TextToSpeech",
          "SpeechToText"
        ]
      }
    ]
  },
  {
    id: "complexity",
    name: "מורכבות הפרויקט",
    weight: 25,
    description: "מורכבות כללית של הפרויקט והקוד",
    requirements: [
      {
        id: "objects",
        name: "עצמים ומחלקות",
        description: "שימוש בתכנות מונחה עצמים",
        subItems: [
          "לפחות 2 מחלקות עצמים",
          "תכונות (משתנים פרטיים)",
          "פעולה בונה (Constructor)",
          "פעולות Getters ו-Setters",
          "פעולות נוספות (לוגיקה)"
        ]
      },
      {
        id: "data-structures",
        name: "מבני נתונים",
        description: "שימוש במבני נתונים",
        subItems: [
          "ArrayList או מערך",
          "הוספה, הסרה, חיפוש",
          "מעבר על הרשימה"
        ]
      },
      {
        id: "database",
        name: "מסד נתונים SQLite",
        description: "אחסון קבוע של נתונים",
        subItems: [
          "SQLiteOpenHelper",
          "יצירת טבלאות",
          "פעולות CRUD",
          "שימוש ב-Cursor"
        ]
      }
    ]
  },
  {
    id: "activities",
    name: "מסכים וממשק",
    weight: 10,
    description: "ריבוי מסכים וממשק משתמש",
    requirements: [
      {
        id: "multi-screen",
        name: "ריבוי מסכים",
        description: "לפחות 3 מסכים עם ניווט",
        subItems: [
          "לפחות 3 Activities שונים",
          "מעבר עם Intent",
          "העברת נתונים בין מסכים"
        ]
      },
      {
        id: "ui",
        name: "ממשק משתמש",
        description: "רכיבי UI מגוונים",
        subItems: [
          "רכיבי קלט ופלט",
          "רשימות (ListView/RecyclerView)",
          "עיצוב נאה"
        ]
      }
    ]
  },
  {
    id: "oral-exam",
    name: "בחינה בעל פה",
    weight: 35,
    description: "הדגמה, הסברים ומענה על שאלות",
    requirements: [
      {
        id: "demo",
        name: "הדגמת האפליקציה",
        description: "הצגה של כל הפונקציונליות"
      },
      {
        id: "code-explanation",
        name: "הסבר קוד",
        description: "יכולת להסביר את הקוד"
      },
      {
        id: "questions",
        name: "מענה על שאלות",
        description: "יכולת לענות על שאלות הבוחן"
      }
    ]
  }
];

// חישוב נקודות הרחבות
export const calculateExtensionPoints = (checkedItems: Set<string>): {
  section6: number;
  section9: number;
  section10: number;
  total: number;
} => {
  // סעיף 6 - כל הרחבה = נקודה
  const ext6Items = projectRequirements.find(c => c.id === "section-6")
    ?.requirements[0].subItems || [];
  const section6 = ext6Items.filter((_, i) => checkedItems.has(`ext-6-${i}`)).length;

  // סעיף 9 - כל נושא = נקודה
  const ext9Items = projectRequirements.find(c => c.id === "section-9")
    ?.requirements[0].subItems || [];
  const section9 = ext9Items.filter((_, i) => checkedItems.has(`ext-9-${i}`)).length;

  // סעיף 10 - כל 2 נושאים = נקודה
  const ext10Items = projectRequirements.find(c => c.id === "section-10")
    ?.requirements[0].subItems || [];
  const section10Count = ext10Items.filter((_, i) => checkedItems.has(`ext-10-${i}`)).length;
  const section10 = Math.floor(section10Count / 2);

  return {
    section6,
    section9,
    section10,
    total: section6 + section9 + section10
  };
};

// בדיקה האם עומד בדרישות 5 יחל"מ
export const checkProjectValidity = (checkedItems: Set<string>): {
  isValid: boolean;
  extensionPoints: number;
  missingRequirements: string[];
} => {
  const missingRequirements: string[] = [];
  const extensions = calculateExtensionPoints(checkedItems);

  // בדיקת הרחבות - נדרש לפחות 5 נקודות
  if (extensions.total < 5) {
    missingRequirements.push(`נדרשות עוד ${5 - extensions.total} נקודות הרחבות (יש: ${extensions.total})`);
  }

  // בדיקת דרישות בסיסיות
  const basicCategories = ["complexity", "activities"];
  basicCategories.forEach(catId => {
    const category = projectRequirements.find(c => c.id === catId);
    if (category) {
      const allItems = category.requirements.flatMap(req =>
        req.subItems ? req.subItems.map((_, i) => `${req.id}-${i}`) : [req.id]
      );
      const checkedCount = allItems.filter(id => checkedItems.has(id)).length;
      if (checkedCount < allItems.length * 0.5) {
        missingRequirements.push(`יש להשלים: ${category.name}`);
      }
    }
  });

  return {
    isValid: missingRequirements.length === 0,
    extensionPoints: extensions.total,
    missingRequirements
  };
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
