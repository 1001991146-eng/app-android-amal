// @ts-nocheck
import { describe, it, expect } from "bun:test";
import { evaluateSpec, ProjectSpec } from "./rubricRules";

const base: ProjectSpec = { dbType: "SQLite", aiPath: "none", aiCommitment: false, section6: ["a", "b"], section9: ["x", "y", "z"], section10: [] };

describe("rubric rules engine", () => {
  it("valid with DB, 2 from section 6, 3 from section 9", () => {
    expect(evaluateSpec(base).isValid).toBe(true);
  });
  it("fails without a valid database", () => {
    expect(evaluateSpec({ ...base, dbType: null }).isValid).toBe(false);
  });
  it("1 section-6 topic is enough only with an AI path", () => {
    expect(evaluateSpec({ ...base, section6: ["a"] }).isValid).toBe(false);
    expect(evaluateSpec({ ...base, section6: ["a"], aiPath: "agent", aiCommitment: true }).isValid).toBe(true);
  });
  it("AI path without APA commitment is not approved", () => {
    expect(evaluateSpec({ ...base, aiPath: "llm_api", aiCommitment: false }).isValid).toBe(false);
  });
  it("2 from section 9 needs 2 from section 10", () => {
    expect(evaluateSpec({ ...base, section9: ["x", "y"], section10: ["p"] }).isValid).toBe(false);
    expect(evaluateSpec({ ...base, section9: ["x", "y"], section10: ["p", "q"] }).isValid).toBe(true);
  });
});
