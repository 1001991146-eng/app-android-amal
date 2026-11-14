// מנוע חוקים לעמידה במחוון תשפ"ז — לפי ההגדרות שקבעה המורה.
// רשימות הנושאים נלקחות מ-projectRequirements כדי שהבודק והלוחות יסכימו.
import { projectRequirements } from "./projectRequirements";

const itemsOf = (id: string) =>
  projectRequirements.find((c) => c.id === id)?.requirements[0]?.subItems ?? [];

export const SECTION6_TOPICS = itemsOf("extensions-6");
export const SECTION9_TOPICS = itemsOf("extensions-9");
export const SECTION10_TOPICS = itemsOf("extensions-10");

export const VALID_DATABASES = ["SQLite", "MySQL", "Firebase", "Firestore"] as const;

export type AiPath = "llm_api" | "pretrained" | "agent" | "custom_ml" | "none";

export const AI_PATHS: { value: AiPath; label: string; tip: string }[] = [
  { value: "llm_api", label: "אינטגרציית מודל שפה (LLM API)", tip: "שליחת פרומפט למודל שפה (למשל Gemini) דרך API וקבלת תשובה לאפליקציה." },
  { value: "pretrained", label: "מודלים מוכנים מראש (Pre-Trained)", tip: "שימוש במודל מאומן קיים, למשל זיהוי תמונה או טקסט, בלי לאמן בעצמכם." },
  { value: "agent", label: "סוכן בינה מלאכותית (AI Agent)", tip: "מודל שמקבל מטרה, מחליט לבד על צעדים ומפעיל פעולות/כלים כדי להשיג אותה." },
  { value: "custom_ml", label: "אימון מודל מותאם אישית (Custom ML)", tip: "איסוף נתונים, אימון מודל משלכם והטמעתו באפליקציה לצורך חיזוי." },
  { value: "none", label: "ללא AI השנה", tip: "הפרויקט לא משלב בינה מלאכותית." },
];

export const aiPathLabel = (p: string | null | undefined) =>
  AI_PATHS.find((a) => a.value === p)?.label ?? "ללא AI השנה";

export interface ProjectSpec {
  dbType: string | null;
  aiPath: AiPath;
  aiCommitment: boolean;
  section6: string[];
  section9: string[];
  section10: string[];
}

export interface RuleResult {
  key: string;
  label: string;
  ok: boolean;
  detail: string;
}

export function evaluateSpec(spec: ProjectSpec) {
  const usesAi = spec.aiPath !== "none";
  const s6 = spec.section6.length;
  const s9 = spec.section9.length;
  const s10 = spec.section10.length;

  const rules: RuleResult[] = [
    {
      key: "db",
      label: "מסד נתונים תקין",
      ok: !!spec.dbType && (VALID_DATABASES as readonly string[]).includes(spec.dbType),
      detail: "יש לבחור SQLite, MySQL, Firebase או Firestore",
    },
    {
      key: "ai",
      label: "התחייבות לתיעוד AI",
      ok: !usesAi || spec.aiCommitment,
      detail: "בחרת נתיב AI — יש לסמן את ההתחייבות לתיעוד לפי APA",
    },
    {
      key: "s6",
      label: "תנאי סעיף 6",
      ok: s6 >= 2 || (s6 >= 1 && usesAi),
      detail: `נדרשים 2 נושאים מסעיף 6, או נושא 1 + נתיב AI (נבחרו: ${s6})`,
    },
    {
      key: "s8",
      label: "תנאי סעיף 8 (מתקדמים)",
      ok: s9 >= 3 || (s9 >= 2 && s10 >= 2),
      detail: `נדרשים 3 נושאים מסעיף 9, או 2 מסעיף 9 + 2 מסעיף 10 (נבחרו: ${s9} / ${s10})`,
    },
  ];

  return { rules, isValid: rules.every((r) => r.ok), usesAi };
}

export function specFromRow(row: {
  db_type: string | null;
  ai_path: string;
  ai_commitment: boolean;
  section6: string[];
  section9: string[];
  section10: string[];
} | null | undefined): ProjectSpec {
  return {
    dbType: row?.db_type ?? null,
    aiPath: (row?.ai_path as AiPath) ?? "none",
    aiCommitment: row?.ai_commitment ?? false,
    section6: row?.section6 ?? [],
    section9: row?.section9 ?? [],
    section10: row?.section10 ?? [],
  };
}
