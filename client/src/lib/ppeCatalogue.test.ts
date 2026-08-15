import { describe, expect, it } from "vitest";
import { getPpeFamilyCount, getPpeGroup, getPpeVisualAssets, PPE_CATEGORY_GROUPS, PPE_PRODUCT_FAMILIES, PPE_VISUAL_ASSETS } from "./ppeCatalogue";

describe("Bridge Wax Safety & PPE taxonomy", () => {
  it("preserves the twelve supplied PPE category groups and all derived product families", () => {
    expect(PPE_CATEGORY_GROUPS).toHaveLength(12);
    expect(getPpeFamilyCount()).toBe(70);
    expect(PPE_PRODUCT_FAMILIES).toHaveLength(70);
  });

  it("keeps direct discovery entries for the core supplied PPE families", () => {
    expect(getPpeGroup("workwear")?.families.map((item) => item.title)).toContain("Premium Workwear");
    expect(getPpeGroup("respiratory-protection")?.families.map((item) => item.title)).toContain("Full-Face Respirators");
    expect(getPpeGroup("fall-protection")?.families.map((item) => item.title)).toContain("Fall-Arrest Kits");
  });

  it("registers only managed, user-authorized visual references for relevant PPE discovery areas", () => {
    expect(PPE_VISUAL_ASSETS).toHaveLength(15);
    expect(getPpeVisualAssets("safety-footwear")[0]?.image).toContain("/manus-storage/ppe-safety-footwear-boot_");
    expect(getPpeVisualAssets("hand-protection")[0]?.image).toContain("/manus-storage/ppe-hand-protection-glove_");
    expect(getPpeVisualAssets("head-protection")[0]?.image).toContain("/manus-storage/ppe-head-protection-helmet_");
    expect(getPpeVisualAssets("eye-face-protection")[0]?.image).toContain("/manus-storage/ppe-eye-face-protection-goggle_");
    expect(getPpeVisualAssets("hearing-protection")[0]?.image).toContain("/manus-storage/ppe-hearing-protection-earmuff_");
    expect(getPpeVisualAssets("respiratory-protection")[0]?.image).toContain("/manus-storage/ppe-respiratory-protection-mask_");
    expect(getPpeVisualAssets("fall-protection")[0]?.image).toContain("/manus-storage/ppe-fall-protection-harness_");
    expect(getPpeVisualAssets("chemical-protection")[0]?.image).toContain("/manus-storage/ppe-chemical-protection-suit_");
    expect(getPpeVisualAssets("welding-ppe")[0]?.image).toContain("/manus-storage/ppe-welding-protection-specs_");
    expect(getPpeVisualAssets("first-aid-workplace-safety")[0]?.image).toContain("/manus-storage/ppe-first-aid-workplace-safety-kit_");
    expect(getPpeVisualAssets("high-visibility")[0]?.image).toContain("/manus-storage/ppe-workwear-hi-vis");
    expect(PPE_CATEGORY_GROUPS.every((group) => getPpeVisualAssets(group.slug).length > 0)).toBe(true);
  });
});
