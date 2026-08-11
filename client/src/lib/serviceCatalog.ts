/* Service catalogue content: expanded scope groupings with distinct images per entry. */
export type ServiceOffer = { code: string; name: string; description: string; image: string };
export type ServiceCatalogue = { slug: string; title: string; eyebrow: string; summary: string; image: string; offers: ServiceOffer[] };

const LAB_IMAGES = ["/manus-storage/01_c027b10e.webp", "/manus-storage/replacement-017_8f43d631.webp", "/manus-storage/replacement-018_57547987.webp", "/manus-storage/04_5058dc87.webp", "/manus-storage/05_cac28030.webp", "/manus-storage/replacement-019_85a0b00f.webp"];
const TESTING_IMAGES = ["/manus-storage/01_984d4500.webp", "/manus-storage/replacement-011_9c99820f.webp", "/manus-storage/replacement-012_5d22008b.webp", "/manus-storage/04_17e17a41.webp", "/manus-storage/05_33473fa2.webp", "/manus-storage/replacement-013_e8ccdb08.webp"];
const MAINTENANCE_IMAGES = ["/manus-storage/01_db871061.webp", "/manus-storage/replacement-024_51b157d0.webp", "/manus-storage/replacement-025_41720045.webp", "/manus-storage/04_2853f552.webp", "/manus-storage/05_6f94992a.webp", "/manus-storage/replacement-026_a39cfd5a.webp"];
const FABRICATION_IMAGES = ["/manus-storage/01_a080278d.webp", "/manus-storage/replacement-014_7caa69be.webp", "/manus-storage/replacement-015_f4a08bb0.webp", "/manus-storage/04_fb87ea2e.webp", "/manus-storage/05_4c55bc22.webp", "/manus-storage/replacement-016_feb04367.webp"];
const HDPE_IMAGES = ["/manus-storage/hdpe-01_72795857.webp", "/manus-storage/hdpe-02_6f7817c0.webp", "/manus-storage/hdpe-03_001c093c.webp", "/manus-storage/hdpe-04_257c0e67.webp", "/manus-storage/hdpe-05_21314881.webp", "/manus-storage/hdpe-06_d3b4f069.webp"];
const PUMPS_IMAGES = ["/manus-storage/01_01dd4137.webp", "/manus-storage/replacement-008_312d0c1e.webp", "/manus-storage/replacement-009_e09edc8c.webp", "/manus-storage/04_ca827443.webp", "/manus-storage/05_2003a6b3.webp", "/manus-storage/replacement-010_f98ff61b.webp"];

export const SERVICE_CATALOGUES: Record<string, ServiceCatalogue> = {
  laboratory: {
    slug: "laboratory", title: "Laboratory Equipment & Consumables", eyebrow: "Service Catalogue · Laboratory",
    summary: "Equipment sourcing, consumable supply, installation coordination, and practical support for mining, medical, water, and research laboratories.", image: LAB_IMAGES[0],
    offers: [
      { code: "BW-SVC-LAB-001", name: "Laboratory Equipment Supply", description: "Sourcing and supply coordination for instruments, benches, glassware, balances, microscopes, and supporting equipment.", image: LAB_IMAGES[0] },
      { code: "BW-SVC-LAB-002", name: "Laboratory Consumables Supply", description: "Recurring supply of laboratory consumables, sample vessels, PPE, reagents, filters, and general-use items.", image: LAB_IMAGES[1] },
      { code: "BW-SVC-LAB-003", name: "Laboratory Setup Coordination", description: "Practical coordination for equipment placement, delivery sequencing, room readiness, and commissioning support.", image: LAB_IMAGES[2] },
      { code: "BW-SVC-LAB-004", name: "Instrument Service Support", description: "Service coordination, routine checks, calibration planning, and escalation support for installed instruments.", image: LAB_IMAGES[3] },
      { code: "BW-SVC-LAB-005", name: "Sample Preparation Workflow Review", description: "Workflow review for sample receipt, preparation, storage, handling, and laboratory throughput requirements.", image: LAB_IMAGES[4] },
      { code: "BW-SVC-LAB-006", name: "Laboratory Safety Review", description: "Practical review support for laboratory PPE, storage, handling, and safe equipment-use requirements.", image: LAB_IMAGES[5] },
    ],
  },
  "industrial-testing": {
    slug: "industrial-testing", title: "Industrial Testing Instruments", eyebrow: "Service Catalogue · Testing",
    summary: "Selection, supply, and support for inspection and measurement instruments used across plant, pipeline, mining, and maintenance environments.", image: TESTING_IMAGES[0],
    offers: [
      { code: "BW-SVC-NDT-001", name: "Ultrasonic Thickness Testing", description: "Instrument selection and inspection support for non-destructive thickness measurement on compatible materials.", image: TESTING_IMAGES[0] },
      { code: "BW-SVC-NDT-002", name: "Visual Inspection Equipment", description: "Supply of inspection accessories and field tools for routine visual checks, maintenance, and reporting.", image: TESTING_IMAGES[1] },
      { code: "BW-SVC-NDT-003", name: "Calibration Planning", description: "Instrument calibration scheduling and documentation support for recurring plant inspection programs.", image: TESTING_IMAGES[2] },
      { code: "BW-SVC-NDT-004", name: "Field Measurement Support", description: "Technical assistance for selecting measurement tools and preparing field-ready inspection kits.", image: TESTING_IMAGES[3] },
      { code: "BW-SVC-NDT-005", name: "Inspection Kit Assembly", description: "Assembly planning for instrument, probe, couplant, case, and accessory combinations for field teams.", image: TESTING_IMAGES[4] },
      { code: "BW-SVC-NDT-006", name: "Test Record Documentation", description: "Documentation support for equipment registers, calibration records, inspection notes, and handover packs.", image: TESTING_IMAGES[5] },
    ],
  },
  maintenance: {
    slug: "maintenance", title: "Plant Maintenance & Spares", eyebrow: "Service Catalogue · Maintenance",
    summary: "Maintenance support, replacement planning, and industrial spares coordination to help keep production and processing plants operational.", image: MAINTENANCE_IMAGES[0],
    offers: [
      { code: "BW-SVC-MNT-001", name: "Preventive Maintenance Planning", description: "Planned maintenance scope development for rotating equipment, utility systems, and supporting plant assets.", image: MAINTENANCE_IMAGES[0] },
      { code: "BW-SVC-MNT-002", name: "Critical Spares Sourcing", description: "Identification and sourcing coordination for high-priority replacement parts and maintenance consumables.", image: MAINTENANCE_IMAGES[1] },
      { code: "BW-SVC-MNT-003", name: "Shutdown Support Coordination", description: "Equipment, tooling, and service coordination for scheduled shutdowns, inspections, and recommissioning.", image: MAINTENANCE_IMAGES[2] },
      { code: "BW-SVC-MNT-004", name: "Workshop Repair Support", description: "Assessment and coordination support for refurbishment, repair, replacement, and return-to-service workflows.", image: MAINTENANCE_IMAGES[3] },
      { code: "BW-SVC-MNT-005", name: "Asset Replacement Planning", description: "Replacement planning for aging, unavailable, or obsolete plant components and support equipment.", image: MAINTENANCE_IMAGES[4] },
      { code: "BW-SVC-MNT-006", name: "Maintenance Store Review", description: "Practical review support for spares organization, minimum stock levels, and maintenance-readiness requirements.", image: MAINTENANCE_IMAGES[5] },
    ],
  },
  fabrication: {
    slug: "fabrication", title: "Fabrication & Repairs", eyebrow: "Service Catalogue · Workshop",
    summary: "Workshop fabrication, repairs, refurbishment, and industrial component support for plant and field requirements.", image: FABRICATION_IMAGES[0],
    offers: [
      { code: "BW-SVC-FAB-001", name: "Light Steel Fabrication", description: "Fabrication coordination for brackets, frames, guards, supports, access items, and general steelwork.", image: FABRICATION_IMAGES[0] },
      { code: "BW-SVC-FAB-002", name: "Pipe and Fitting Repairs", description: "Repair and replacement support for compatible pipework, fittings, brackets, and associated plant items.", image: FABRICATION_IMAGES[1] },
      { code: "BW-SVC-FAB-003", name: "Component Refurbishment", description: "Inspection and refurbishment coordination for worn industrial components and assemblies.", image: FABRICATION_IMAGES[2] },
      { code: "BW-SVC-FAB-004", name: "Custom Workshop Builds", description: "Scope development for practical custom-fabricated pieces required by maintenance and operations teams.", image: FABRICATION_IMAGES[3] },
      { code: "BW-SVC-FAB-005", name: "Equipment Guards and Supports", description: "Design and fabrication coordination for protective guards, equipment supports, and service access items.", image: FABRICATION_IMAGES[4] },
      { code: "BW-SVC-FAB-006", name: "Repair Scope Assessment", description: "Initial assessment and scope definition for repairable structures, assemblies, and industrial components.", image: FABRICATION_IMAGES[5] },
    ],
  },
  hdpe: {
    slug: "hdpe", title: "HDPE Pipe Systems", eyebrow: "Service Catalogue · Piping",
    summary: "HDPE piping, fittings, jointing, and installation coordination for water, slurry, mining, and process-reticulation systems.", image: HDPE_IMAGES[0],
    offers: [
      { code: "BW-SVC-HDP-001", name: "HDPE Pipe Supply", description: "Pipe supply planning for water transfer, slurry service, drainage, and industrial reticulation requirements.", image: HDPE_IMAGES[0] },
      { code: "BW-SVC-HDP-002", name: "Fittings and Valves", description: "Selection and supply coordination for compatible HDPE fittings, flanges, valves, and transition components.", image: HDPE_IMAGES[1] },
      { code: "BW-SVC-HDP-003", name: "Jointing Coordination", description: "Jointing method planning and installation support for compatible HDPE piping systems.", image: HDPE_IMAGES[2] },
      { code: "BW-SVC-HDP-004", name: "Pipeline Installation Support", description: "Practical route, material, and installation coordination support for field pipeline projects.", image: HDPE_IMAGES[3] },
      { code: "BW-SVC-HDP-005", name: "Pressure-Test Planning", description: "Planning support for pressure tests, inspection points, isolation, and practical handover records.", image: HDPE_IMAGES[4] },
      { code: "BW-SVC-HDP-006", name: "Pipeline Spares and Repairs", description: "Replacement planning for pipe sections, fittings, valves, and field repair requirements.", image: HDPE_IMAGES[5] },
    ],
  },
  pumps: {
    slug: "pumps", title: "Pumps & Valves", eyebrow: "Service Catalogue · Flow Control",
    summary: "Pump, valve, and flow-control selection for mining, industrial process, water, dewatering, and utility applications.", image: PUMPS_IMAGES[0],
    offers: [
      { code: "BW-SVC-PMP-001", name: "Pump Selection Support", description: "Duty-point and application review support for selecting suitable pump configurations and materials.", image: PUMPS_IMAGES[0] },
      { code: "BW-SVC-PMP-002", name: "Valve Selection Support", description: "Flow-control valve selection support for isolation, throttling, non-return, and process service requirements.", image: PUMPS_IMAGES[1] },
      { code: "BW-SVC-PMP-003", name: "Dewatering Packages", description: "Equipment planning support for site drainage, pit dewatering, transfer, and temporary pumping duties.", image: PUMPS_IMAGES[2] },
      { code: "BW-SVC-PMP-004", name: "Pump and Valve Spares", description: "Replacement planning and spares coordination for installed pump and flow-control equipment.", image: PUMPS_IMAGES[3] },
      { code: "BW-SVC-PMP-005", name: "Flow-System Review", description: "Application review support for pump, valve, pipe, and control relationships in a working system.", image: PUMPS_IMAGES[4] },
      { code: "BW-SVC-PMP-006", name: "Pump Skid Coordination", description: "Packaged equipment coordination for pump skids, controls, accessories, and practical site requirements.", image: PUMPS_IMAGES[5] },
    ],
  },
};
