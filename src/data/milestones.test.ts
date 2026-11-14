// @ts-nocheck
import { describe, expect, test } from "bun:test";
import { MILESTONES, currentStage, progressPercent } from "./milestones";

describe("project milestone tracking", () => {
  test("seven milestones define the requested checklist", () => {
    expect(MILESTONES.map((m) => m.key)).toEqual(["topic", "uiux", "uml", "dev_db", "ai", "book", "exam"]);
  });
  test("no completed milestones means zero percent", () => {
    expect(progressPercent({ topic: "in_progress" })).toBe(0);
  });
  test("all seven completed milestones means one hundred percent", () => {
    expect(progressPercent(Object.fromEntries(MILESTONES.map((m) => [m.key, "done"])))).toBe(100);
  });
  test("progress counts completed milestones only", () => {
    expect(progressPercent({ topic: "done", uiux: "done", uml: "in_progress" })).toBe(29);
  });
  test("the current stage is the first unfinished milestone", () => {
    expect(currentStage({ topic: "done", uiux: "done", uml: "in_progress" }).key).toBe("uml");
  });
});