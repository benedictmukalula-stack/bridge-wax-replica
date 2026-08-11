/* Indicative service catalogue content: provisional service codes and scopes for layout review. Replace with the official Bridge Wax service schedule before publication. */
export type ServiceOffer = {
  code: string;
  name: string;
  description: string;
  image: string;
};

export type ServiceCatalogue = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  offers: ServiceOffer[];
};

const LAB_IMAGE = "/manus-storage/home-featured-laboratory-no-people_2ecfd627.png";
const TESTING_IMAGE = "/manus-storage/industrial-testing-equipment-no-people_ec338117.png";
const MAINTENANCE_IMAGE = "/manus-storage/industrial-maintenance-no-people_28fbdb07.png";
const FABRICATION_IMAGE = "/manus-storage/fabrication-no-people_9c684ae1.png";
const HDPE_IMAGE = "/manus-storage/hdpe-pipe-systems-no-people_8beccb9e.png";
const PUMPS_IMAGE = "/manus-storage/pumps-valves-retry_1ad20416.webp";

export const SERVICE_CATALOGUES: Record<string, ServiceCatalogue> = {
  laboratory: {
    slug: "laboratory",
    title: "Laboratory Equipment & Consumables",
    eyebrow: "Indicative Service Catalogue · Laboratory",
    summary: "Equipment sourcing, consumable supply, installation coordination, and practical support for mining, medical, water, and research laboratories.",
    image: LAB_IMAGE,
    offers: [
      { code: "BW-SVC-LAB-001", name: "Laboratory Equipment Supply", description: "Sourcing and supply coordination for instruments, benches, glassware, balances, microscopes, and supporting equipment.", image: LAB_IMAGE },
      { code: "BW-SVC-LAB-002", name: "Laboratory Consumables Supply", description: "Recurring supply of laboratory consumables, sample vessels, PPE, reagents, filters, and general-use items.", image: LAB_IMAGE },
      { code: "BW-SVC-LAB-003", name: "Laboratory Setup Coordination", description: "Practical coordination for equipment placement, delivery sequencing, room readiness, and commissioning support.", image: LAB_IMAGE },
      { code: "BW-SVC-LAB-004", name: "Instrument Service Support", description: "Service coordination, routine checks, calibration planning, and escalation support for installed instruments.", image: LAB_IMAGE },
    ],
  },
  "industrial-testing": {
    slug: "industrial-testing",
    title: "Industrial Testing Instruments",
    eyebrow: "Indicative Service Catalogue · Testing",
    summary: "Selection, supply, and support for inspection and measurement instruments used across plant, pipeline, mining, and maintenance environments.",
    image: TESTING_IMAGE,
    offers: [
      { code: "BW-SVC-NDT-001", name: "Ultrasonic Thickness Testing", description: "Instrument selection and inspection support for non-destructive thickness measurement on compatible materials.", image: TESTING_IMAGE },
      { code: "BW-SVC-NDT-002", name: "Visual Inspection Equipment", description: "Supply of inspection accessories and field tools for routine visual checks, maintenance, and reporting.", image: TESTING_IMAGE },
      { code: "BW-SVC-NDT-003", name: "Calibration Planning", description: "Instrument calibration scheduling and documentation support for recurring plant inspection programs.", image: TESTING_IMAGE },
      { code: "BW-SVC-NDT-004", name: "Field Measurement Support", description: "Technical assistance for selecting measurement tools and preparing field-ready inspection kits.", image: TESTING_IMAGE },
    ],
  },
  maintenance: {
    slug: "maintenance",
    title: "Plant Maintenance & Spares",
    eyebrow: "Indicative Service Catalogue · Maintenance",
    summary: "Maintenance support, replacement planning, and industrial spares coordination to help keep production and processing plants operational.",
    image: MAINTENANCE_IMAGE,
    offers: [
      { code: "BW-SVC-MNT-001", name: "Preventive Maintenance Planning", description: "Planned maintenance scope development for rotating equipment, utility systems, and supporting plant assets.", image: MAINTENANCE_IMAGE },
      { code: "BW-SVC-MNT-002", name: "Critical Spares Sourcing", description: "Identification and sourcing coordination for high-priority replacement parts and maintenance consumables.", image: MAINTENANCE_IMAGE },
      { code: "BW-SVC-MNT-003", name: "Shutdown Support Coordination", description: "Equipment, tooling, and service coordination for scheduled shutdowns, inspections, and recommissioning.", image: MAINTENANCE_IMAGE },
      { code: "BW-SVC-MNT-004", name: "Workshop Repair Support", description: "Assessment and coordination support for refurbishment, repair, replacement, and return-to-service workflows.", image: MAINTENANCE_IMAGE },
    ],
  },
  fabrication: {
    slug: "fabrication",
    title: "Fabrication & Repairs",
    eyebrow: "Indicative Service Catalogue · Workshop",
    summary: "Workshop fabrication, repairs, refurbishment, and industrial component support for plant and field requirements.",
    image: FABRICATION_IMAGE,
    offers: [
      { code: "BW-SVC-FAB-001", name: "Light Steel Fabrication", description: "Fabrication coordination for brackets, frames, guards, supports, access items, and general steelwork.", image: FABRICATION_IMAGE },
      { code: "BW-SVC-FAB-002", name: "Pipe and Fitting Repairs", description: "Repair and replacement support for compatible pipework, fittings, brackets, and associated plant items.", image: FABRICATION_IMAGE },
      { code: "BW-SVC-FAB-003", name: "Component Refurbishment", description: "Inspection and refurbishment coordination for worn industrial components and assemblies.", image: FABRICATION_IMAGE },
      { code: "BW-SVC-FAB-004", name: "Custom Workshop Builds", description: "Scope development for practical custom-fabricated pieces required by maintenance and operations teams.", image: FABRICATION_IMAGE },
    ],
  },
  hdpe: {
    slug: "hdpe",
    title: "HDPE Pipe Systems",
    eyebrow: "Indicative Service Catalogue · Piping",
    summary: "HDPE piping, fittings, jointing, and installation coordination for water, slurry, mining, and process-reticulation systems.",
    image: HDPE_IMAGE,
    offers: [
      { code: "BW-SVC-HDP-001", name: "HDPE Pipe Supply", description: "Pipe supply planning for water transfer, slurry service, drainage, and industrial reticulation requirements.", image: HDPE_IMAGE },
      { code: "BW-SVC-HDP-002", name: "Fittings and Valves", description: "Selection and supply coordination for compatible HDPE fittings, flanges, valves, and transition components.", image: HDPE_IMAGE },
      { code: "BW-SVC-HDP-003", name: "Jointing Coordination", description: "Jointing method planning and installation support for compatible HDPE piping systems.", image: HDPE_IMAGE },
      { code: "BW-SVC-HDP-004", name: "Pipeline Installation Support", description: "Practical route, material, and installation coordination support for field pipeline projects.", image: HDPE_IMAGE },
    ],
  },
  pumps: {
    slug: "pumps",
    title: "Pumps & Valves",
    eyebrow: "Indicative Service Catalogue · Flow Control",
    summary: "Pump, valve, and flow-control selection for mining, industrial process, water, dewatering, and utility applications.",
    image: PUMPS_IMAGE,
    offers: [
      { code: "BW-SVC-PMP-001", name: "Pump Selection Support", description: "Duty-point and application review support for selecting suitable pump configurations and materials.", image: PUMPS_IMAGE },
      { code: "BW-SVC-PMP-002", name: "Valve Selection Support", description: "Flow-control valve selection support for isolation, throttling, non-return, and process service requirements.", image: PUMPS_IMAGE },
      { code: "BW-SVC-PMP-003", name: "Dewatering Packages", description: "Equipment planning support for site drainage, pit dewatering, transfer, and temporary pumping duties.", image: PUMPS_IMAGE },
      { code: "BW-SVC-PMP-004", name: "Pump and Valve Spares", description: "Replacement planning and spares coordination for installed pump and flow-control equipment.", image: PUMPS_IMAGE },
    ],
  },
};
