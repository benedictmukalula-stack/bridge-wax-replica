/* Indicative catalogue content: compact product groupings for the current Bridge Wax site. Replace provisional codes and descriptions with the official catalogue before publication. */
export type CatalogueProduct = {
  code: string;
  name: string;
  description: string;
  image: string;
};

export type ProductCatalogue = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  products: CatalogueProduct[];
};

const ULTRASONIC_IMAGE = "/manus-storage/ultrasonic-gauge_86351767.jpg";
const GAS_IMAGE = "/manus-storage/gas-detector_43afdc7b.jpeg";
const PUMP_IMAGE = "/manus-storage/water-pump_3bfea3db.jpg";
const MACHINERY_IMAGE = "/manus-storage/general-machinery_714b5e1f.jpg";

export const PRODUCT_CATALOGUES: Record<string, ProductCatalogue> = {
  ultrasonic: {
    slug: "ultrasonic",
    title: "Ultrasonic Equipment",
    eyebrow: "Indicative Catalogue · NDT",
    summary: "Portable and workshop ultrasonic inspection equipment for thickness measurement, calibration, and field condition assessment.",
    image: ULTRASONIC_IMAGE,
    products: [
      { code: "BW-UTG-001", name: "Ultrasonic Thickness Gauge", description: "Handheld thickness measurement instrument for steel, pipe, glass, plastic, and other compatible materials.", image: ULTRASONIC_IMAGE },
      { code: "BW-UTG-002", name: "Dual-Crystal Probe Kit", description: "Replacement probe assembly for accurate contact measurement across a range of industrial surfaces.", image: ULTRASONIC_IMAGE },
      { code: "BW-UTG-003", name: "Calibration Block Set", description: "Reference blocks for routine verification, setup checks, and operator calibration workflows.", image: ULTRASONIC_IMAGE },
      { code: "BW-UTG-004", name: "Coating Thickness Gauge", description: "Portable gauge for non-destructive coating and substrate thickness checks in maintenance environments.", image: ULTRASONIC_IMAGE },
      { code: "BW-UTG-005", name: "Portable NDT Inspection Kit", description: "Field-ready inspection bundle with gauge, probe, couplant accessories, and protective carry case.", image: ULTRASONIC_IMAGE },
    ],
  },
  "gas-detection": {
    slug: "gas-detection",
    title: "Gas Detection",
    eyebrow: "Indicative Catalogue · Safety",
    summary: "Portable and fixed-point gas detection equipment for industrial safety, confined spaces, and process monitoring applications.",
    image: GAS_IMAGE,
    products: [
      { code: "BW-GD-001", name: "Portable Single-Gas Detector", description: "Compact personal monitor for a selected target gas with audible, visual, and vibration alerts.", image: GAS_IMAGE },
      { code: "BW-GD-002", name: "Portable Multi-Gas Detector", description: "Multi-sensor handheld monitor for common industrial atmospheres and pre-entry checks.", image: GAS_IMAGE },
      { code: "BW-GD-003", name: "Pumped Gas Sampling Module", description: "Sampling accessory for drawing air from remote, ducted, or difficult-to-access locations.", image: GAS_IMAGE },
      { code: "BW-GD-004", name: "Calibration and Bump-Test Station", description: "Bench station for routine detector response checks, calibration workflows, and service records.", image: GAS_IMAGE },
      { code: "BW-GD-005", name: "Detector Docking Kit", description: "Docking and charging setup for organized fleet management and routine instrument readiness checks.", image: GAS_IMAGE },
    ],
  },
  "water-pumps": {
    slug: "water-pumps",
    title: "Water Pumps",
    eyebrow: "Indicative Catalogue · Flow Systems",
    summary: "Pump and flow-control equipment for water transfer, dewatering, irrigation, process reticulation, and industrial utility systems.",
    image: PUMP_IMAGE,
    products: [
      { code: "BW-WP-001", name: "End-Suction Centrifugal Pump", description: "General-purpose centrifugal pump for clean-water transfer and industrial utility duties.", image: PUMP_IMAGE },
      { code: "BW-WP-002", name: "Submersible Dewatering Pump", description: "Submersible pump configuration for site drainage, construction, and mining dewatering applications.", image: PUMP_IMAGE },
      { code: "BW-WP-003", name: "High-Pressure Multistage Pump", description: "Multistage pump format for boosted water delivery, washdown, and process pressure duties.", image: PUMP_IMAGE },
      { code: "BW-WP-004", name: "Slurry Transfer Pump", description: "Heavy-duty transfer solution for abrasive water, slurry, and mineral-process applications.", image: PUMP_IMAGE },
      { code: "BW-WP-005", name: "Pump Control Panel", description: "Control and protection panel for coordinated pump starting, monitoring, and fault handling.", image: PUMP_IMAGE },
    ],
  },
  "general-machinery": {
    slug: "general-machinery",
    title: "General Machinery",
    eyebrow: "Indicative Catalogue · Industrial Plant",
    summary: "General-purpose machinery and plant equipment for workshops, production environments, maintenance teams, and site operations.",
    image: MACHINERY_IMAGE,
    products: [
      { code: "BW-GM-001", name: "Industrial Air Compressor", description: "Compressed-air package for workshop tools, instrumentation, cleaning, and production support.", image: MACHINERY_IMAGE },
      { code: "BW-GM-002", name: "Diesel Generator Set", description: "Standby and site-power generator configuration for remote and continuity-of-service applications.", image: MACHINERY_IMAGE },
      { code: "BW-GM-003", name: "Electric Motor Drive Unit", description: "Industrial motor and drive arrangement for pumps, conveyors, fans, and process machinery.", image: MACHINERY_IMAGE },
      { code: "BW-GM-004", name: "Workshop Bench Grinder", description: "Bench-mounted workshop machine for maintenance, deburring, and general fabrication support.", image: MACHINERY_IMAGE },
      { code: "BW-GM-005", name: "Hydraulic Power Pack", description: "Compact hydraulic power source for actuators, tooling, lifting, and industrial service equipment.", image: MACHINERY_IMAGE },
    ],
  },
};
