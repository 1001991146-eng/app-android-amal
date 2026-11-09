// דרישות הפרויקט לפי המחוון הרשמי של משרד החינוך:
// "חלופה טלפונים חכמים - הערכה לעבודת גמר (5 יח"ל)" - כולל השינויים שנכנסים לתוקף בתשפ"ז.
// חשוב: הרשימות והכללים כאן מועתקים מהמחוון. אין להמציא או לשנות ניקוד.

export interface RequirementCategory {
  id: string;
  name: string;
  weight: number;
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

// אינדקס של נושא הבינה המלאכותית בכל סעיף (משמש לבדיקת חובת ה-AI מתשפ"ז)
export const AI_INDEX_SECTION_6 = 11; // סעיף 6, נושא 12
export const AI_INDEX_SECTION_9 = 11; // סעיף 9, נושא 12

export const projectRequirements: RequirementCategory[] = [
  {
    id: "mandatory",
    name: "דרישות חובה (סעיפים 1-5)",
    weight: 0,
    description: "פרויקט שאינו עומד בכל דרישות 1-5 אינו מתקבל וציונו 0",
    requirements: [
      {
        id: "base",
        name: "דרישות חובה בפרויקט",
        description: "כל הסעיפים חייבים להתקיים",
        subItems: [
          "1. הפרויקט מהווה אפליקציה לטלפונים חכמים בסביבת אנדרואיד",
          "2. האפליקציה עובדת בזמן הבחינה, ללא קריסות",
          "3. הפרויקט כולל לוגיקה מורכבת",
          "4. אפליקציה אינטראקטיבית עם ממשק גרפי, מספר מסכים / Fragment, הנדסת אנוש ונוחות שימוש",
          "5. שימוש באירועים: פקדים, מאזינים, מקשים, אירועי מערכת והרשאות זמן-ריצה"
        ]
      }
    ]
  },
  {
    id: "extensions-6",
    name: "סעיף 6 - דרישות חובה ל-5 יח\"ל",
    weight: 0,
    description: "מתשפ\"ז: חובה לבחור לפחות שני נושאים (עד תשפ\"ו - נושא אחד)",
    requirements: [
      {
        id: "ext-6",
        name: "נושאי סעיף 6",
        description: "התלמיד נדרש לדעת ולהסביר לעומק את הבחירה ואת ההקשר לפרויקט",
        subItems: [
          "Job Scheduler / Work Manager",
          "הורדת נתוני מידע (לא תמונות/מוזיקה) מהאינטרנט (API של אתר) ושימוש בהם",
          "מחלקת Service משמעותית בהקשר לאפליקציה (MediaPlayer אינו עונה על הדרישה)",
          "מסד נתונים עם יחסים מורכבים (@Relation, @Embedded), DAO עם JOIN / GROUP BY",
          "כתיבת ContentProvider (מוגדר ב-Manifest כ-provider)",
          "שימוש ב-Handler / Thread (Task בסביבת Maui)",
          "הקפצת והאזנה לאירועים מאובייקט (Invoke)",
          "שימוש ב-DataBinding, Convertor",
          "שימוש ב-RecyclerView / ObservableCollection + CollectionsView",
          "ViewPager בשילוב ContentView / Fragment",
          "שימוש מקיף ב-MVVM בכל הפרויקט",
          "בינה מלאכותית - הטמעת כלי GenAI קיימים באמצעות API או Agents"
        ]
      }
    ]
  },
  {
    id: "storage-7",
    name: "סעיף 7 - אחסון וטיפול בנתונים",
    weight: 0,
    description: "חובה כתיבה וקריאה. SharedPreferences / קובץ טקסט / XML / JSON אינם נחשבים בסיס נתונים",
    requirements: [
      {
        id: "db",
        name: "בסיס נתונים",
        description: "SQLite, MySQL, Firebase, Firestore וכדומה",
        subItems: [
          "שימוש בבסיס נתונים לכתיבה וקריאה (הוספה, עדכון, מחיקה, שליפה)",
          "בסיס נתונים מרוחק (Firebase RealTime / Firestore / MySQL) כולל עדכון סינכרוני - נחשב גם כשני נושאים מסעיף 10"
        ]
      }
    ]
  },
  {
    id: "extensions-9",
    name: "סעיף 9 - נושאים מתקדמים",
    weight: 0,
    description: "חובה לפחות נושא אחד. לפי סעיף 8: שלושה נושאים, או שניים + שני נושאים מסעיף 10",
    requirements: [
      {
        id: "ext-9",
        name: "נושאי סעיף 9",
        description: "בחר את הנושאים שמימשת",
        subItems: [
          "SurfaceView",
          "AlarmManager + Notification (עבר לסעיף 9 בתשפ\"ז)",
          "ירושה ממחלקת IDrawable / View לצורך מימוש גרפי",
          "GoogleMaps (או שירות דומה) ושימוש בנתוני מיקום",
          "ContentView / Fragments",
          "מאזיני מיקום / תנועה",
          "Bluetooth",
          "NFC",
          "רשתות מחשבים",
          "פיתוח API בצד שרת (בכל שפת תכנות)",
          "בינה אנושית - מנוע / מודל אלגוריתמי מורכב (ניווט, משחק מול הטלפון שאינו רנדומלי)",
          "בינה מלאכותית - מנוע למידת מכונה: איסוף נתונים, אימון והטמעה לחיזוי",
          "כל טכנולוגיה חדשה (עיבוד תמונה, זיהוי קול וכו')",
          "אפליקציית רב-משתתפים: פעולה של משתמש משפיעה בזמן אמת על משתמשים אחרים / ניהול קונפליקטים במשאב משותף"
        ]
      }
    ]
  },
  {
    id: "extensions-10",
    name: "סעיף 10 - נושאים משולבים",
    weight: 0,
    description: "משמשים לאפשרות (2) בסעיף 8: שני נושאים מסעיף 9 + שני נושאים (או יותר) מסעיף 10",
    requirements: [
      {
        id: "ext-10",
        name: "נושאי סעיף 10",
        description: "בחר את הנושאים שמימשת",
        subItems: [
          "Messaging / BroadcastReceiver",
          "SharedPreferences",
          "Camera & Gallery",
          "הורשה ממחלקת AsyncTask",
          "Microphone",
          "GPS",
          "CountDownTimer",
          "TextToSpeech",
          "SpeechToText",
          "Sensors (עבר לסעיף 10 בתשפ\"ז)",
          "Calendar with filter logic",
          "שימוש ב-ContentProvider",
          "שימוש ב-ActivityResultContract (עבר לסעיף 10 בתשפ\"ז)"
        ]
      }
    ]
  },
  {
    id: "measures",
    name: "מדדי הערכה (סעיפים 11-17)",
    weight: 0,
    description: "משפיעים על רמת הפרויקט והציון - לא תנאי סף",
    requirements: [
      {
        id: "measure",
        name: "מדדי הערכה",
        description: "סמן מה מתקיים בפרויקט שלך",
        subItems: [
          "11. רמת קושי, מקוריות ומורכבות הקוד (קוד דומה בין תלמידים מוריד מהציון)",
          "12. תכנות מונחה עצמים: חלוקה למחלקות, הפרדת לוגיקה ותצוגה, הכלה והורשה",
          "13. שימוש בתפריטים ו/או תיבות דו-שיח",
          "14. מוסכמות וסגנון תכנות, חלוקה לפעולות, קריאות ותיעוד",
          "15. מבני נתונים מתאימים - מערך, ArrayList, עץ, גרף, Set, Dictionary",
          "16. שימוש בתכני החובה באופן רלוונטי לנושא הפרויקט",
          "17. הפרויקט אינו דומה באופן מהותי לפרויקט אחר בכיתה"
        ]
      }
    ]
  }
];

const countChecked = (prefix: string, length: number, checked: Set<string>) =>
  Array.from({ length }, (_, i) => `${prefix}-${i}`).filter(id => checked.has(id)).length;

const itemsOf = (catId: string) =>
  projectRequirements.find(c => c.id === catId)?.requirements[0].subItems ?? [];

/**
 * ספירת הנושאים לפי כללי המחוון (תשפ"ז):
 * - בסיס נתונים מרוחק סינכרוני נחשב בנוסף כשני נושאים מסעיף 10.
 * - מימוש נושאים מסעיף 6 מעבר למינימום הנדרש (2) נחשב בנוסף כשני נושאים מסעיף 10.
 */
export const calculateExtensionPoints = (checked: Set<string>) => {
  const section6 = countChecked("ext-6", itemsOf("extensions-6").length, checked);
  const section9 = countChecked("ext-9", itemsOf("extensions-9").length, checked);
  const section10Raw = countChecked("ext-10", itemsOf("extensions-10").length, checked);
  const remoteDbBonus = checked.has("db-1") ? 2 : 0;
  const extra6Bonus = section6 > 2 ? 2 : 0;
  const section10 = section10Raw + remoteDbBonus + extra6Bonus;
  return { section6, section9, section10, section10Raw, total: section6 + section9 + section10 };
};

/** בדיקה האם הפרויקט עומד בדרישות 5 יח"ל לפי המחוון של תשפ"ז */
export const checkProjectValidity = (checked: Set<string>) => {
  const missingRequirements: string[] = [];
  const ext = calculateExtensionPoints(checked);

  const mandatoryCount = countChecked("base", 5, checked);
  if (mandatoryCount < 5) {
    missingRequirements.push("לא כל דרישות החובה 1-5 מתקיימות - הפרויקט לא יתקבל");
  }
  if (ext.section6 < 2) {
    missingRequirements.push(`סעיף 6: נדרשים לפחות 2 נושאים (נבחרו: ${ext.section6})`);
  }
  if (!checked.has("db-0") && !checked.has("db-1")) {
    missingRequirements.push("סעיף 7: נדרש שימוש בבסיס נתונים לכתיבה וקריאה");
  }
  if (ext.section9 < 1) {
    missingRequirements.push("סעיף 9: נדרש לפחות נושא אחד");
  }
  const option1 = ext.section9 >= 3;
  const option2 = ext.section9 >= 2 && ext.section10 >= 2;
  if (!option1 && !option2) {
    missingRequirements.push(
      `סעיף 8: נדרשים 3 נושאים מסעיף 9, או 2 מסעיף 9 + 2 מסעיף 10 (יש: ${ext.section9} מסעיף 9, ${ext.section10} מסעיף 10)`
    );
  }
  const usesAI = checked.has(`ext-6-${AI_INDEX_SECTION_6}`) || checked.has(`ext-9-${AI_INDEX_SECTION_9}`);
  if (!usesAI) {
    missingRequirements.push("מתשפ\"ז חובה שימוש בבינה מלאכותית (סעיף 6 נושא 12 או סעיף 9 נושא 12)");
  }

  return {
    isValid: missingRequirements.length === 0,
    extensionPoints: ext.total,
    extensions: ext,
    missingRequirements
  };
};

/** אחוז הסעיפים שסומנו מכלל הרשימה (מדד התקדמות בלבד, לא ציון) */
export const getTotalProgress = (checked: Set<string>): number => {
  let total = 0;
  let done = 0;
  projectRequirements.forEach(cat =>
    cat.requirements.forEach(req => {
      (req.subItems ?? []).forEach((_, i) => {
        total++;
        if (checked.has(`${req.id}-${i}`)) done++;
      });
    })
  );
  return total ? Math.round((done / total) * 100) : 0;
};

export const getTotalPoints = getTotalProgress;

// חלק ב' של המחוון - חלוקת הניקוד בבחינת הפרויקט (בע"פ)
export const projectExamWeights = [
  { name: "הצגה ושליטה בפרויקט", weight: 10 },
  { name: "פרויקט עובד - תהליך שלם מקצה לקצה", weight: 10 },
  { name: "אחסון וטיפול בבסיס נתונים", weight: 10 },
  { name: "שימוש בנושאים מסעיף 6", weight: 10 },
  { name: "שליטה בקוד", weight: 25 },
  { name: "שליטה בחומר התיאורטי", weight: 15 },
  { name: "הרחבה ראשונה", weight: 10 },
  { name: "הרחבה שנייה", weight: 10 },
  { name: "הרחבות נוספות / בונוס", weight: 10 }
];
