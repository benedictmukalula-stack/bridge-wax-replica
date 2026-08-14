/* Laboratory catalogue content: seven distinct image-backed entries per laboratory section. */
export type LabProduct = { code: string; name: string; description: string; image: string };
export type LabCatalogue = { slug: string; title: string; eyebrow: string; summary: string; image: string; products: LabProduct[] };

const MINING = ["/images/laboratory/mining/mining-01.jpg", "/images/laboratory/mining/mining-02.jpg", "/images/laboratory/mining/mining-03.jpg", "/images/laboratory/mining/mining-04.jpg", "/images/laboratory/mining/mining-05.jpg", "/images/laboratory/mining/mining-06.jpg", "/images/laboratory/mining/mining-07.jpg"];
const MEDICAL = ["/images/laboratory/medical/medical-01.jpg", "/images/laboratory/medical/medical-02.jpg", "/images/laboratory/medical/medical-03.jpg", "/images/laboratory/medical/medical-04.jpg", "/images/laboratory/medical/medical-05.jpg", "/images/laboratory/medical/medical-06.jpg", "/images/laboratory/medical/medical-07.jpg"];
const WATER = ["/images/laboratory/water/water-01.jpg", "/images/laboratory/water/water-02.jpg", "/images/laboratory/water/water-03.jpg", "/images/laboratory/water/water-04.jpg", "/images/laboratory/water/water-05.jpg", "/images/laboratory/water/water-06.jpg", "/images/laboratory/water/water-07.jpg"];
const ANALYTICAL = ["/images/laboratory/analytical/analytical-01.jpg", "/images/laboratory/analytical/analytical-02.jpg", "/images/laboratory/analytical/analytical-03.jpg", "/images/laboratory/analytical/analytical-04.jpg", "/images/laboratory/analytical/analytical-05.jpg", "/images/laboratory/analytical/analytical-06.jpg", "/images/laboratory/analytical/analytical-07.jpg"];

export const LAB_CATALOGUES: Record<string, LabCatalogue> = {
  mining: {
    slug: "mining", title: "Mining Laboratory Equipment", eyebrow: "Catalogue · Mining Laboratory",
    summary: "Sample preparation, geological processing, assay support, and laboratory equipment for mining and mineral-analysis workflows.", image: "/images/hero/laboratory.jpg",
    products: [
      { code: "BW-ML-001", name: "Laboratory Jaw Crusher", description: "Primary sample-size reduction equipment for preparing geological and mineral samples for downstream laboratory work.", image: MINING[0] },
      { code: "BW-ML-002", name: "Ring and Puck Mill", description: "Laboratory milling equipment for controlled pulverisation of prepared geological samples.", image: MINING[1] },
      { code: "BW-ML-003", name: "Sample Pulveriser", description: "Fine sample-preparation equipment for producing consistent material for assay and analytical processes.", image: MINING[2] },
      { code: "BW-ML-004", name: "Laboratory Drying Oven", description: "Temperature-controlled drying equipment for sample conditioning and moisture reduction workflows.", image: MINING[3] },
      { code: "BW-ML-005", name: "Sample Splitting Station", description: "Sample division equipment for creating representative portions while supporting organized laboratory handling.", image: MINING[4] },
      { code: "BW-ML-006", name: "Fire Assay Furnace", description: "High-temperature laboratory furnace configuration for fire-assay and mineral-processing support applications.", image: MINING[5] },
      { code: "BW-ML-007", name: "Geological Sample Workstation", description: "Dedicated workstation arrangement for receiving, preparing, weighing, and organizing geological samples.", image: MINING[6] },
    ],
  },
  medical: {
    slug: "medical", title: "Medical Laboratory", eyebrow: "Catalogue · Clinical Diagnostics",
    summary: "Clinical laboratory equipment for sample preparation, chemistry, hematology, analysis, and routine diagnostic workflows.", image: "/images/laboratory/medical/medical-laboratory.jpg",
    products: [
      { code: "BW-MED-001", name: "Automated Chemistry Analyzer", description: "Automated analyzer platform for routine clinical chemistry workflows and repeatable sample processing.", image: MEDICAL[0] },
      { code: "BW-MED-002", name: "Compact Clinical Analyzer", description: "Space-efficient analyzer format for distributed, satellite, and smaller clinical laboratory settings.", image: MEDICAL[1] },
      { code: "BW-MED-003", name: "Laboratory Centrifuge", description: "Bench centrifuge for separating blood, serum, plasma, and other compatible laboratory sample types.", image: MEDICAL[2] },
      { code: "BW-MED-004", name: "Hematology Analyzer", description: "Clinical analyzer configuration for routine blood-cell and hematology testing workflows.", image: MEDICAL[3] },
      { code: "BW-MED-005", name: "Clinical Immunoassay Analyzer", description: "Analyzer format for immunoassay laboratory workflows and controlled clinical sample handling.", image: MEDICAL[4] },
      { code: "BW-MED-006", name: "Sample Preparation Workstation", description: "Organized bench solution for aliquoting, preparation, labeling, and routine diagnostic sample handling.", image: MEDICAL[5] },
      { code: "BW-MED-007", name: "Laboratory Cooling Centrifuge", description: "Temperature-controlled centrifuge configuration for samples requiring controlled separation conditions.", image: MEDICAL[6] },
    ],
  },
  water: {
    slug: "water", title: "Water Analysis", eyebrow: "Catalogue · Environmental Testing",
    summary: "Field and laboratory water-quality equipment for potable, process, environmental, wastewater, and utility-water analysis.", image: "/images/hero/laboratory.jpg",
    products: [
      { code: "BW-WA-001", name: "Portable pH and Conductivity Meter", description: "Handheld meter format for routine pH and conductivity checks across field and laboratory applications.", image: WATER[0] },
      { code: "BW-WA-002", name: "Multi-Parameter Pocket Meter", description: "Compact pocket instrument for fast screening of common water-quality parameters.", image: WATER[1] },
      { code: "BW-WA-003", name: "TDS Water Tester", description: "Portable total-dissolved-solids tester for quick screening of drinking, process, and utility water.", image: WATER[2] },
      { code: "BW-WA-004", name: "Portable Water Quality Analyzer", description: "Portable analyzer platform for multi-parameter water-quality measurements in field environments.", image: WATER[3] },
      { code: "BW-WA-005", name: "Bench pH and EC Meter", description: "Laboratory bench meter for repeatable pH, electrical conductivity, and related water checks.", image: WATER[4] },
      { code: "BW-WA-006", name: "Multi-Parameter Water Analyzer", description: "Integrated laboratory arrangement for structured measurement of multiple environmental water parameters.", image: WATER[5] },
      { code: "BW-WA-007", name: "Digital Water Photometer", description: "Photometric analyzer format for colorimetric water testing and routine environmental screening.", image: WATER[6] },
    ],
  },
  analytical: {
    slug: "analytical", title: "Analytical Equipment", eyebrow: "Catalogue · Analytical Chemistry",
    summary: "Analytical chemistry equipment for precision weighing, elemental analysis, spectroscopy, microscopy, and sample preparation.", image: "/images/laboratory/analytical/analytical-01.jpg",
    products: [
      { code: "BW-AN-001", name: "Precision Laboratory Balance", description: "Precision weighing instrument for laboratory preparation, formulation, and analytical measurement workflows.", image: ANALYTICAL[0] },
      { code: "BW-AN-002", name: "ICP Mass Spectrometer", description: "Inductively coupled plasma mass-spectrometry platform for trace elemental analysis applications.", image: ANALYTICAL[1] },
      { code: "BW-AN-003", name: "Analytical Balance", description: "Enclosed analytical balance format for repeatable low-mass measurements and sample preparation.", image: ANALYTICAL[2] },
      { code: "BW-AN-004", name: "ICP Emission Spectrometer", description: "Inductively coupled plasma emission platform for multi-element analytical chemistry workflows.", image: ANALYTICAL[3] },
      { code: "BW-AN-005", name: "Analytical Chemistry Workstation", description: "Integrated workstation arrangement for instrumentation, sample preparation, and laboratory data handling.", image: ANALYTICAL[4] },
      { code: "BW-AN-006", name: "Precision Balance with Draft Shield", description: "Draft-shielded precision balance for stable measurements in controlled laboratory environments.", image: ANALYTICAL[5] },
      { code: "BW-AN-007", name: "Microscopy and Sample Preparation Station", description: "Combined microscopy and preparation arrangement for inspection, handling, and analytical sample review.", image: ANALYTICAL[6] },
    ],
  },
};
