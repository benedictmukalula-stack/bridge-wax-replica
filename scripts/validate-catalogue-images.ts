import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PRODUCT_CATALOGUES } from "../client/src/lib/productCatalog";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageDirectory = path.join(
  projectRoot,
  "client/public/images/products/new-authoritative",
);
const publicPrefix = "/images/products/new-authoritative/";
const expectedSkus = [
  "BW-UTG-001", "BW-UTG-002", "BW-UTG-003", "BW-UTG-004", "BW-UTG-005", "BW-UTG-006", "BW-UTG-007",
  "BW-GD-001", "BW-GD-002", "BW-GD-003", "BW-GD-004", "BW-GD-005", "BW-GD-006", "BW-GD-007",
  "BW-WP-001", "BW-WP-002", "BW-WP-003", "BW-WP-004", "BW-WP-005", "BW-WP-006", "BW-WP-007",
  "BW-GM-001", "BW-GM-002", "BW-GM-003", "BW-GM-004", "BW-GM-005", "BW-GM-006", "BW-GM-007",
  "BW-DP-001", "BW-DP-002", "BW-DP-003", "BW-DP-004", "BW-DP-005", "BW-DP-006", "BW-DP-007", "BW-DP-008",
].sort();

type CataloguedProduct = { code: string; image: string };

function flattenCatalogue(): CataloguedProduct[] {
  return Object.values(PRODUCT_CATALOGUES).flatMap((catalogue) => [
    ...catalogue.products,
    ...(catalogue.subsections?.flatMap((section) => section.products) ?? []),
  ]);
}

function sortUnique(values: string[]) {
  return [...new Set(values)].sort();
}

function setDifference(left: string[], right: string[]) {
  const rightSet = new Set(right);
  return left.filter((value) => !rightSet.has(value));
}

function failIf(condition: boolean, message: string) {
  if (condition) throw new Error(message);
}

async function validate() {
  const libraryOnly = process.argv.includes("--library-only");
  const products = flattenCatalogue();
  const productSkus = products.map(({ code }) => code).sort();
  const imageFiles = (await readdir(imageDirectory))
    .filter((file) => file.endsWith(".webp"))
    .sort();
  const expectedFiles = expectedSkus.map((sku) => `${sku}.webp`);
  const hashes = await Promise.all(
    imageFiles.map(async (file) => ({
      file,
      hash: createHash("sha256").update(await readFile(path.join(imageDirectory, file))).digest("hex"),
    })),
  );
  const uniqueHashes = sortUnique(hashes.map(({ hash }) => hash));

  failIf(products.length !== expectedSkus.length, `Expected ${expectedSkus.length} catalogue products; found ${products.length}.`);
  failIf(setDifference(expectedSkus, productSkus).length > 0, `Catalogue missing SKUs: ${setDifference(expectedSkus, productSkus).join(", ")}`);
  failIf(setDifference(productSkus, expectedSkus).length > 0, `Catalogue has unexpected SKUs: ${setDifference(productSkus, expectedSkus).join(", ")}`);
  failIf(imageFiles.length !== expectedFiles.length, `Expected ${expectedFiles.length} image files; found ${imageFiles.length}.`);
  failIf(setDifference(expectedFiles, imageFiles).length > 0, `Image library missing files: ${setDifference(expectedFiles, imageFiles).join(", ")}`);
  failIf(setDifference(imageFiles, expectedFiles).length > 0, `Image library has unexpected files: ${setDifference(imageFiles, expectedFiles).join(", ")}`);
  failIf(uniqueHashes.length !== expectedFiles.length, `Expected ${expectedFiles.length} unique SHA-256 hashes; found ${uniqueHashes.length}.`);

  if (!libraryOnly) {
    const expectedPaths = products.map(({ code }) => `${publicPrefix}${code}.webp`);
    const assignedPaths = products.map(({ image }) => image);
    const invalidReferences = products
      .filter(({ code, image }) => image !== `${publicPrefix}${code}.webp`)
      .map(({ code, image }) => `${code} -> ${image}`);
    const brokenPaths = expectedPaths.filter((imagePath) => !existsSync(path.join(projectRoot, "client/public", imagePath)));

    failIf(sortUnique(assignedPaths).length !== expectedPaths.length, "Duplicate catalogue image assignments detected.");
    failIf(invalidReferences.length > 0, `Unexpected image references: ${invalidReferences.join("; ")}`);
    failIf(brokenPaths.length > 0, `Broken image paths: ${brokenPaths.join(", ")}`);
  }

  console.log(JSON.stringify({
    status: "PASS",
    mode: libraryOnly ? "library-only" : "catalogue-and-library",
    expectedSkus: expectedSkus.length,
    catalogueProducts: products.length,
    imageFiles: imageFiles.length,
    missingImages: 0,
    unexpectedImageReferences: 0,
    uniqueSha256Hashes: uniqueHashes.length,
    duplicateImageAssignments: 0,
    brokenImagePaths: 0,
  }, null, 2));
}

validate().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
