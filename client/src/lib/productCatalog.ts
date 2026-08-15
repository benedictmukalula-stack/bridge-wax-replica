/* Product catalogue content: expanded product groupings with distinct images per entry. */
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
  subsections?: { title: string; summary: string; products: CatalogueProduct[] }[];
};

const ULTRASONIC_IMAGES = [
  "/images/products/new-authoritative/BW-UTG-001.webp", "/images/products/new-authoritative/BW-UTG-002.webp", "/images/products/new-authoritative/BW-UTG-003.webp", "/images/products/new-authoritative/BW-UTG-004.webp", "/images/products/new-authoritative/BW-UTG-005.webp", "/images/products/new-authoritative/BW-UTG-006.webp", "/images/products/new-authoritative/BW-UTG-007.webp",
];
const GAS_IMAGES = [
  "/images/products/new-authoritative/BW-GD-001.webp", "/images/products/new-authoritative/BW-GD-002.webp", "/images/products/new-authoritative/BW-GD-003.webp", "/images/products/new-authoritative/BW-GD-004.webp", "/images/products/new-authoritative/BW-GD-005.webp", "/images/products/new-authoritative/BW-GD-006.webp", "/images/products/new-authoritative/BW-GD-007.webp",
];
const PUMP_IMAGES = [
  "/images/products/new-authoritative/BW-WP-001.webp", "/images/products/new-authoritative/BW-WP-002.webp", "/images/products/new-authoritative/BW-WP-003.webp", "/images/products/new-authoritative/BW-WP-004.webp", "/images/products/new-authoritative/BW-WP-005.webp", "/images/products/new-authoritative/BW-WP-006.webp", "/images/products/new-authoritative/BW-WP-007.webp",
];
const MACHINERY_IMAGES = [
  "/images/products/new-authoritative/BW-GM-001.webp", "/images/products/new-authoritative/BW-GM-002.webp", "/images/products/new-authoritative/BW-GM-003.webp", "/images/products/new-authoritative/BW-GM-004.webp", "/images/products/new-authoritative/BW-GM-005.webp", "/images/products/new-authoritative/BW-GM-006.webp", "/images/products/new-authoritative/BW-GM-007.webp",
];

export const PRODUCT_CATALOGUES: Record<string, ProductCatalogue> = {
  ultrasonic: {
    slug: "ultrasonic", title: "Ultrasonic Equipment", eyebrow: "Catalogue · NDT",
    summary: "Portable and workshop ultrasonic inspection equipment for thickness measurement, calibration, and field condition assessment.", image: ULTRASONIC_IMAGES[0],
    products: [
      { code: "BW-UTG-001", name: "Ultrasonic Thickness Gauge", description: "Handheld thickness measurement instrument for steel, pipe, glass, plastic, and other compatible materials.", image: ULTRASONIC_IMAGES[0] },
      { code: "BW-UTG-002", name: "Dual-Crystal Probe Kit", description: "Replacement probe assembly for accurate contact measurement across a range of industrial surfaces.", image: ULTRASONIC_IMAGES[1] },
      { code: "BW-UTG-003", name: "Calibration Block Set", description: "Reference blocks for routine verification, setup checks, and operator calibration workflows.", image: ULTRASONIC_IMAGES[2] },
      { code: "BW-UTG-004", name: "Coating Thickness Gauge", description: "Portable gauge for non-destructive coating and substrate thickness checks in maintenance environments.", image: ULTRASONIC_IMAGES[3] },
      { code: "BW-UTG-005", name: "Portable NDT Inspection Kit", description: "Field-ready inspection bundle with gauge, probe, couplant accessories, and protective carry case.", image: ULTRASONIC_IMAGES[4] },
      { code: "BW-UTG-006", name: "Shear-Wave Probe", description: "Angled probe option for weld, joint, and discontinuity inspection workflows where shear-wave testing is appropriate.", image: ULTRASONIC_IMAGES[5] },
      { code: "BW-UTG-007", name: "Couplant Applicator Kit", description: "Application accessories for consistent couplant coverage and repeatable contact measurements in the field.", image: ULTRASONIC_IMAGES[6] },
    ],
  },
  "gas-detection": {
    slug: "gas-detection", title: "Gas Detection", eyebrow: "Catalogue · Safety",
    summary: "Portable and fixed-point gas detection equipment for industrial safety, confined spaces, and process monitoring applications.", image: GAS_IMAGES[0],
    products: [
      { code: "BW-GD-001", name: "Portable Single-Gas Detector", description: "Compact personal monitor for a selected target gas with audible, visual, and vibration alerts.", image: GAS_IMAGES[0] },
      { code: "BW-GD-002", name: "Portable Multi-Gas Detector", description: "Multi-sensor handheld monitor for common industrial atmospheres and pre-entry checks.", image: GAS_IMAGES[1] },
      { code: "BW-GD-003", name: "Pumped Gas Sampling Module", description: "Sampling accessory for drawing air from remote, ducted, or difficult-to-access locations.", image: GAS_IMAGES[2] },
      { code: "BW-GD-004", name: "Calibration and Bump-Test Station", description: "Bench station for routine detector response checks, calibration workflows, and service records.", image: GAS_IMAGES[3] },
      { code: "BW-GD-005", name: "Detector Docking Kit", description: "Docking and charging setup for organized fleet management and routine instrument readiness checks.", image: GAS_IMAGES[4] },
      { code: "BW-GD-006", name: "Fixed Gas Transmitter", description: "Fixed-point sensing unit for continuous monitoring in process, plant, and utility environments.", image: GAS_IMAGES[5] },
      { code: "BW-GD-007", name: "Area Gas Detection Beacon", description: "Visible and audible alarm beacon for warning teams when a monitored atmosphere reaches a configured threshold.", image: GAS_IMAGES[6] },
    ],
  },
  "water-pumps": {
    slug: "water-pumps", title: "Water Pumps", eyebrow: "Catalogue · Flow Systems",
    summary: "Pump and flow-control equipment for water transfer, dewatering, irrigation, process reticulation, industrial utility systems, and domestic water services.", image: PUMP_IMAGES[0],
    products: [
      { code: "BW-WP-001", name: "End-Suction Centrifugal Pump", description: "General-purpose centrifugal pump for clean-water transfer and industrial utility duties.", image: PUMP_IMAGES[0] },
      { code: "BW-WP-002", name: "Submersible Dewatering Pump", description: "Submersible pump configuration for site drainage, construction, and mining dewatering applications.", image: PUMP_IMAGES[1] },
      { code: "BW-WP-003", name: "High-Pressure Multistage Pump", description: "Multistage pump format for boosted water delivery, washdown, and process pressure duties.", image: PUMP_IMAGES[2] },
      { code: "BW-WP-004", name: "Slurry Transfer Pump", description: "Heavy-duty transfer solution for abrasive water, slurry, and mineral-process applications.", image: PUMP_IMAGES[3] },
      { code: "BW-WP-005", name: "Pump Control Panel", description: "Control and protection panel for coordinated pump starting, monitoring, and fault handling.", image: PUMP_IMAGES[4] },
      { code: "BW-WP-006", name: "Vertical Turbine Pump", description: "Vertical pump configuration for deep-sump, borehole, and high-volume water transfer installations.", image: PUMP_IMAGES[5] },
      { code: "BW-WP-007", name: "Booster Pump Skid", description: "Packaged booster arrangement for pressure support across utility and process-water networks.", image: PUMP_IMAGES[6] },
    ],
    subsections: [{
      title: "Domestic Pumps",
      summary: "Household and light-commercial pump solutions for homes, gardens, tanks, boreholes, pressure boosting, and water transfer.",
      products: [
        { code: "BW-DP-001", name: "Domestic Borehole Pump", description: "Slimline submersible pump configuration for borehole and domestic groundwater transfer applications.", image: "/images/products/new-authoritative/BW-DP-001.webp" },
        { code: "BW-DP-002", name: "Domestic Submersible Drainage Pump", description: "Compact submersible pump for basements, sumps, pools, rainwater pits, and household drainage duties.", image: "/images/products/new-authoritative/BW-DP-002.webp" },
        { code: "BW-DP-003", name: "Household Pressure Booster Pump", description: "Self-priming booster configuration for improving water pressure at taps, showers, and light domestic points of use.", image: "/images/products/new-authoritative/BW-DP-003.webp" },
        { code: "BW-DP-004", name: "Domestic Centrifugal Pump", description: "Compact centrifugal pump for clean-water transfer, garden irrigation, and household utility systems.", image: "/images/products/new-authoritative/BW-DP-004.webp" },
        { code: "BW-DP-005", name: "Compact 24V Water Booster", description: "Low-voltage booster format for small water systems, solar-assisted setups, caravans, and light utility applications.", image: "/images/products/new-authoritative/BW-DP-005.webp" },
        { code: "BW-DP-006", name: "Domestic Transfer Pump", description: "Portable transfer pump for moving clean water between tanks, containers, gardens, and utility points.", image: "/images/products/new-authoritative/BW-DP-006.webp" },
        { code: "BW-DP-007", name: "Domestic Pressure Controller", description: "Automatic pressure-control accessory for pump start-stop management and stable household water delivery.", image: "/images/products/new-authoritative/BW-DP-007.webp" },
        { code: "BW-DP-008", name: "Automatic Garden Irrigation Pump", description: "Compact self-priming pump configuration for garden irrigation, sprinklers, and small outdoor water systems.", image: "/images/products/new-authoritative/BW-DP-008.webp" },
      ],
    }],
  },
  "general-machinery": {
    slug: "general-machinery", title: "General Machinery", eyebrow: "Catalogue · Industrial Plant",
    summary: "General-purpose machinery and plant equipment for workshops, production environments, maintenance teams, and site operations.", image: MACHINERY_IMAGES[0],
    products: [
      { code: "BW-GM-001", name: "Industrial Air Compressor", description: "Compressed-air package for workshop tools, instrumentation, cleaning, and production support.", image: MACHINERY_IMAGES[0] },
      { code: "BW-GM-002", name: "Diesel Generator Set", description: "Standby and site-power generator configuration for remote and continuity-of-service applications.", image: MACHINERY_IMAGES[1] },
      { code: "BW-GM-003", name: "Electric Motor Drive Unit", description: "Industrial motor and drive arrangement for pumps, conveyors, fans, and process machinery.", image: MACHINERY_IMAGES[2] },
      { code: "BW-GM-004", name: "Workshop Bench Grinder", description: "Bench-mounted workshop machine for maintenance, deburring, and general fabrication support.", image: MACHINERY_IMAGES[3] },
      { code: "BW-GM-005", name: "Hydraulic Power Pack", description: "Compact hydraulic power source for actuators, tooling, lifting, and industrial service equipment.", image: MACHINERY_IMAGES[4] },
      { code: "BW-GM-006", name: "Industrial Pressure Washer", description: "High-pressure cleaning equipment for workshops, plant areas, vehicles, and maintenance operations.", image: MACHINERY_IMAGES[5] },
      { code: "BW-GM-007", name: "Vibration Monitoring Kit", description: "Portable machinery-health monitoring equipment for routine checks on rotating plant assets.", image: MACHINERY_IMAGES[6] },
    ],
  },
};
