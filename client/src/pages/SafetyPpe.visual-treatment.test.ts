import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

describe("Safety & PPE visual treatment", () => {
  it("keeps authorised PPE assets on a neutral white surface without a darkening blend mode", () => {
    expect(stylesheet).toContain(".ppe-visual-image { display: grid; min-height: 180px; place-items: center; overflow: hidden; background: #fff; }");
    expect(stylesheet).toContain(".ppe-visual-image img { width: 100%; height: 100%; min-height: 180px; object-fit: contain; background: #fff; filter: none; mix-blend-mode: normal; }");
    expect(stylesheet).toContain(".ppe-category-image { display: grid; min-height: 150px; place-items: center; margin: -1.25rem -1.25rem 1rem; overflow: hidden; background: #fff; }");
    expect(stylesheet).toContain(".ppe-category-image img { width: 100%; height: 150px; object-fit: contain; background: #fff; filter: none; mix-blend-mode: normal; }");
    expect(stylesheet).not.toContain(".ppe-visual-image img { width: 100%; height: 100%; min-height: 180px; object-fit: contain; mix-blend-mode: multiply; }");
    expect(stylesheet).not.toContain(".ppe-category-image img { width: 100%; height: 150px; object-fit: contain; mix-blend-mode: multiply; }");
  });
});
