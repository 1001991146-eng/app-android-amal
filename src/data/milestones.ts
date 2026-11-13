// אבני הדרך של פרויקט הגמר - משותפות ללוח הבקרה של התלמיד ושל המורה
export interface MilestoneDef {
  key: string;
  label: string;
}

export const MILESTONES: MilestoneDef[] = [
  { key: "topic", label: "בחירת נושא ואישורו" },
  { key: "uiux", label: "תכנון UI/UX ומסכים" },
  { key: "uml", label: "עיצוב ארכיטקטורה ותרשימי UML" },
  { key: "dev_db", label: "פיתוח לוגיקה וחיבור למסד נתונים" },
  { key: "ai", label: "שילוב כלי AI בקוד ותיעודם" },
  { key: "book", label: "השלמת ספר הפרויקט (כולל ביבליוגרפיה APA)" },
  { key: "exam", label: "מוכנות לסימולציית בחינה בעל-פה" },
];

export type MilestoneStatus = "not_started" | "in_progress" | "done";

export const STATUS_LABELS: Record<MilestoneStatus, string> = {
  not_started: "טרם התחיל",
  in_progress: "בעבודה",
  done: "הושלם",
};

/** השלב הנוכחי של תלמיד: אבן הדרך הראשונה שעוד לא הושלמה */
export const currentStage = (statuses: Record<string, MilestoneStatus>): MilestoneDef => {
  return MILESTONES.find((m) => statuses[m.key] !== "done") ?? MILESTONES[MILESTONES.length - 1];
};

export const progressPercent = (statuses: Record<string, MilestoneStatus>): number => {
  const done = MILESTONES.filter((m) => statuses[m.key] === "done").length;
  return Math.round((done / MILESTONES.length) * 100);
};
