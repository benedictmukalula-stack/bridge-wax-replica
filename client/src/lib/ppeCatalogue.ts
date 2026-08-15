export type PpeProductFamily = {
  slug: string;
  title: string;
};

export type PpeCategoryGroup = {
  slug: string;
  title: string;
  description: string;
  families: readonly PpeProductFamily[];
};

export type PpeVisualAsset = {
  id: string;
  title: string;
  groupSlug: string;
  image: string;
  alt: string;
};

const toSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const family = (title: string): PpeProductFamily => ({ slug: toSlug(title), title });

/**
 * Original Bridge Wax PPE product-family taxonomy. These are discovery and quotation
 * categories only; no manufacturer, SKU, price, availability claim, or supplier image
 * is inferred until Bridge Wax provides approved product information.
 */
export const PPE_CATEGORY_GROUPS: readonly PpeCategoryGroup[] = [
  { slug: "workwear", title: "Workwear", description: "Practical workwear categories for industrial sites, mining teams, maintenance crews, and demanding outdoor conditions.", families: ["Premium Workwear", "Industrial Workwear", "Mining Workwear", "Hi-Vis Workwear", "Flame & Heat Resistant Workwear", "Chemical Protective Clothing", "Rainwear", "Cold/Freezer Workwear", "Disposable Protective Clothing"].map(family) },
  { slug: "safety-footwear", title: "Safety Footwear", description: "Footwear discovery for protected, site-ready movement across industrial, wet, and traction-sensitive environments.", families: ["Safety Boots", "Safety Shoes", "Gumboots", "Ladies Safety Footwear", "Occupational Footwear", "Anti-Slip Footwear"].map(family) },
  { slug: "hand-protection", title: "Hand Protection", description: "Hand-protection families selected around handling tasks, cut risk, heat, chemicals, impact, and fine work.", families: ["General Handling Gloves", "Cut-Resistant Gloves", "Impact Gloves", "Chemical-Resistant Gloves", "Nitrile Gloves", "PVC Gloves", "Leather Gloves", "Heat-Resistant Gloves", "Precision Gloves"].map(family) },
  { slug: "head-protection", title: "Head Protection", description: "Headwear and accessory categories for impact-control requirements and everyday site protection.", families: ["Safety Helmets", "Hard Hats", "Bump Caps", "Helmet Accessories"].map(family) },
  { slug: "eye-face-protection", title: "Eye & Face Protection", description: "Eye and face protection families for impact, splash, welding, visibility, and demanding process areas.", families: ["Safety Spectacles", "Goggles", "Face Shields", "Welding Protection", "Chemical Splash Protection", "Anti-Fog Eyewear"].map(family) },
  { slug: "hearing-protection", title: "Hearing Protection", description: "Hearing-protection categories for routine exposure control and communication-sensitive work zones.", families: ["Earplugs", "Earmuffs", "Communication Hearing Protection"].map(family) },
  { slug: "respiratory-protection", title: "Respiratory Protection", description: "Respiratory product families for dust, particles, chemicals, and task-specific respiratory protection plans.", families: ["Disposable Masks", "Half-Mask Respirators", "Full-Face Respirators", "Respirator Filters", "Dust Protection", "Chemical/Particle Protection"].map(family) },
  { slug: "fall-protection", title: "Fall Protection", description: "Work-at-height categories for system-based fall arrest, restraint, positioning, and rescue planning.", families: ["Full-Body Harnesses", "Lanyards", "Shock Absorbers", "Lifelines", "Anchorage Equipment", "Fall-Arrest Kits"].map(family) },
  { slug: "high-visibility", title: "High-Visibility", description: "High-visibility workwear for clearer workforce presence around traffic, plant, logistics, and reduced-light conditions.", families: ["Hi-Vis Vests", "Hi-Vis Jackets", "Hi-Vis Shirts", "Hi-Vis Trousers", "Reflective Workwear"].map(family) },
  { slug: "chemical-protection", title: "Chemical Protection", description: "Barrier and response PPE categories for teams working with splash, contact, handling, and spill-response risks.", families: ["Chemical Suits", "Chemical Gloves", "Chemical Goggles", "Chemical Boots", "Protective Aprons", "Spill/Response PPE"].map(family) },
  { slug: "welding-ppe", title: "Welding PPE", description: "Welding protection families for arc work, hot-work support, sparks, radiant heat, and face protection requirements.", families: ["Welding Helmets", "Welding Gloves", "Welding Aprons", "Welding Jackets", "Welding Sleeves", "Welding Face Protection"].map(family) },
  { slug: "first-aid-workplace-safety", title: "First Aid & Workplace Safety", description: "Readiness equipment categories for workplace response, safety communication, and site-support essentials.", families: ["First Aid Kits", "Emergency Equipment", "Safety Signage", "Workplace Safety Equipment"].map(family) },
];

export const PPE_CATALOGUE = {
  slug: "safety-ppe",
  title: "Safety & PPE",
  eyebrow: "Safety equipment • Workwear",
  summary: "Bridge Wax Safety & PPE brings together workwear, protective equipment, and workplace-safety product families for industrial, mining, laboratory, and field teams.",
  groups: PPE_CATEGORY_GROUPS,
} as const;

export const PPE_HERO_VISUAL = {
  image: "/manus-storage/ppe-workwear-hi-vis-navy-orange_8c3cc939.jpg",
  alt: "Reflective industrial workwear featured for Bridge Wax Safety and PPE",
} as const;

export const PPE_PRODUCT_FAMILIES = PPE_CATEGORY_GROUPS.flatMap((group) => group.families.map((item) => ({ ...item, groupSlug: group.slug, groupTitle: group.title })));

/**
 * User-authorized reference imagery, expressed only as generic Bridge Wax discovery
 * visuals. The source names, brands, product identifiers, prices, and descriptions
 * are intentionally not carried into the Bridge Wax catalogue.
 */
export const PPE_VISUAL_ASSETS: readonly PpeVisualAsset[] = [
  { id: "reflective-mining-workwear", title: "Reflective Mining Workwear", groupSlug: "workwear", image: "/manus-storage/ppe-workwear-hi-vis-navy-orange_8c3cc939.jpg", alt: "Reflective long-sleeve industrial work shirt" },
  { id: "high-visibility-workwear", title: "High-Visibility Workwear", groupSlug: "high-visibility", image: "/manus-storage/ppe-workwear-hi-vis-navy-yellow_63e10087.jpg", alt: "High-visibility long-sleeve industrial work shirt" },
  { id: "reflective-trousers", title: "Reflective Work Trousers", groupSlug: "workwear", image: "/manus-storage/ppe-workwear-reflective-trouser_31a47c5e.jpg", alt: "Reflective industrial work trousers" },
  { id: "industrial-workwear-jacket", title: "Industrial Workwear Jacket", groupSlug: "workwear", image: "/manus-storage/ppe-workwear-reflective-jacket_b613dc73.jpg", alt: "Reflective industrial work jacket" },
  { id: "flame-heat-workwear", title: "Flame & Heat Resistant Workwear", groupSlug: "workwear", image: "/manus-storage/ppe-workwear-flame-resistant-jacket_b75e9236.jpg", alt: "Flame and heat resistant industrial work jacket" },
  { id: "safety-footwear", title: "Safety Footwear", groupSlug: "safety-footwear", image: "/manus-storage/ppe-safety-footwear-boot_448bf5e6.webp", alt: "Industrial safety boot" },
  { id: "hand-protection", title: "Hand Protection", groupSlug: "hand-protection", image: "/manus-storage/ppe-hand-protection-glove_3587413e.jpg", alt: "Protective industrial work glove" },
  { id: "head-protection", title: "Safety Helmets", groupSlug: "head-protection", image: "/manus-storage/ppe-head-protection-helmet_8f8bae8d.jpg", alt: "Orange industrial safety helmet" },
  { id: "eye-face-protection", title: "Eye & Face Protection", groupSlug: "eye-face-protection", image: "/manus-storage/ppe-eye-face-protection-goggle_8c1aea17.jpg", alt: "Clear industrial safety goggles" },
  { id: "hearing-protection", title: "Hearing Protection", groupSlug: "hearing-protection", image: "/manus-storage/ppe-hearing-protection-earmuff_465b9dcb.jpg", alt: "Blue industrial hearing-protection earmuffs" },
  { id: "respiratory-protection", title: "Respiratory Protection", groupSlug: "respiratory-protection", image: "/manus-storage/ppe-respiratory-protection-mask_2eaa546f.jpg", alt: "Disposable industrial respiratory protection mask" },
  { id: "fall-protection", title: "Fall Protection Harness", groupSlug: "fall-protection", image: "/manus-storage/ppe-fall-protection-harness_3f7a0a2b.webp", alt: "Full-body industrial fall protection harness" },
  { id: "chemical-protection", title: "Chemical Protection Suit", groupSlug: "chemical-protection", image: "/manus-storage/ppe-chemical-protection-suit_1d126e17.jpg", alt: "Yellow chemical protective coverall" },
  { id: "welding-ppe", title: "Welding PPE", groupSlug: "welding-ppe", image: "/manus-storage/ppe-welding-protection-specs_3cd02965.jpg", alt: "Green industrial welding protection spectacles" },
  { id: "first-aid-workplace-safety", title: "First Aid & Workplace Safety", groupSlug: "first-aid-workplace-safety", image: "/manus-storage/ppe-first-aid-workplace-safety-kit_24e708ac.jpg", alt: "Industrial workplace first-aid kit" },
];

export function getPpeVisualAssets(groupSlug?: string) {
  return groupSlug ? PPE_VISUAL_ASSETS.filter((asset) => asset.groupSlug === groupSlug) : PPE_VISUAL_ASSETS;
}

export function getPpeGroup(slug: string) {
  return PPE_CATEGORY_GROUPS.find((group) => group.slug === slug);
}

export function getPpeFamilyCount() {
  return PPE_PRODUCT_FAMILIES.length;
}
