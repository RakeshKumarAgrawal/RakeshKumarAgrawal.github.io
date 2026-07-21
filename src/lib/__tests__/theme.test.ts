import { describe, expect, it } from "vitest";

import { getPreferredTheme } from "@/lib/theme";

describe("getPreferredTheme", () => {
  it("uses saved theme when present", () => {
    expect(getPreferredTheme("light", true)).toBe("light");
    expect(getPreferredTheme("dark", false)).toBe("dark");
  });

  it("falls back to system preference", () => {
    expect(getPreferredTheme(null, true)).toBe("dark");
    expect(getPreferredTheme(null, false)).toBe("light");
  });
});
