// @ts-nocheck
import { describe, expect, test } from "bun:test";
import { checkProjectValidity } from "./projectRequirements";

const base = ["base-0", "base-1", "base-2", "base-3", "base-4", "db-0"];

describe("תשפ\"ז rules", () => {
  test("one section-6 topic is not enough", () => {
    const r = checkProjectValidity(new Set([...base, "ext-6-11", "ext-9-0", "ext-9-1", "ext-9-2"]));
    expect(r.isValid).toBe(false);
  });
  test("2 from section 6 (incl. AI) + 3 from section 9 is valid", () => {
    const r = checkProjectValidity(new Set([...base, "ext-6-11", "ext-6-0", "ext-9-0", "ext-9-1", "ext-9-2"]));
    expect(r.isValid).toBe(true);
  });
  test("2 from section 9 + 2 from section 10 is valid", () => {
    const r = checkProjectValidity(new Set([...base, "ext-6-11", "ext-6-0", "ext-9-0", "ext-9-1", "ext-10-0", "ext-10-1"]));
    expect(r.isValid).toBe(true);
  });
  test("remote sync DB counts as two section-10 topics", () => {
    const r = checkProjectValidity(new Set([...base, "db-1", "ext-6-11", "ext-6-0", "ext-9-0", "ext-9-1"]));
    expect(r.isValid).toBe(true);
  });
  test("AI is mandatory", () => {
    const r = checkProjectValidity(new Set([...base, "ext-6-1", "ext-6-0", "ext-9-0", "ext-9-1", "ext-9-2"]));
    expect(r.isValid).toBe(false);
  });
});
