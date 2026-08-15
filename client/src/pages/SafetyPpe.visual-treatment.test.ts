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

  it("keeps catalogue and product-detail images at their original brightness site-wide", () => {
    expect(stylesheet).toContain(".catalogue-product-media { display: flex; aspect-ratio: 4 / 3; align-items: center; justify-content: center; overflow: hidden; background: #fff; padding: 1rem; }");
    expect(stylesheet).toContain(".catalogue-product-image { display: block; width: 100%; height: 100%; object-fit: contain; background: #fff; filter: none; mix-blend-mode: normal; transition: transform .25s var(--ease-out); }");
    expect(stylesheet).toContain(".products-mega-featured-item img { width: 2.8rem; height: 2.8rem; flex: 0 0 auto; border: 1px solid rgba(26,26,46,.1); background: #fff; filter: none; object-fit: contain; padding: .2rem; }");
    expect(stylesheet).toContain(".product-detail-media { display: flex; aspect-ratio: 1 / .88; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(26,26,46,.1); background: #fff; padding: 2rem; }");
    expect(stylesheet).not.toContain(".catalogue-product-image { display: block; width: 100%; height: 100%; object-fit: contain; mix-blend-mode: multiply; transition: transform .25s var(--ease-out); }");
  });
});
