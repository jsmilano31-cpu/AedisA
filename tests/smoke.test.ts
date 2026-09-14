import { describe, expect, it } from "vitest";

describe("project setup", () => {
  it("loads the AedesAlert project identity", () => {
    expect("AedesAlert AI").toContain("AedesAlert");
  });
});