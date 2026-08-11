# Catalogue Image Audit

The active product, service, and laboratory catalogue datasets were audited. All 36 product image paths, all 36 service image paths, and all 31 laboratory image paths resolve with HTTP 200 through the project storage proxy. Every numbered individual-entry image path is unique within its dataset; duplicate numbered entry paths found: zero.

The first route-render pass covered Ultrasonic Equipment, Gas Detection, Water Pumps, General Machinery, Laboratory Equipment & Consumables, Industrial Testing Instruments, Plant Maintenance & Spares, and Fabrication & Repairs. The second pass covered HDPE Pipe Systems, Pumps & Valves, Mining Laboratory Equipment, Medical Laboratory, Water Analysis, and Analytical Equipment. All fourteen routes rendered successfully with their category headers and catalogue content visible.

The long-page render also exposed that lazy-loaded card images could remain blank below the fold in capture and some long-scroll contexts. Catalogue card images now load eagerly so all individual entries render their assigned image reliably.

Two directly downloaded Water Pumps payloads were visually inspected after the full-page capture: both are valid 1400×1050 WebP pump/industrial-equipment images with real content. The audit therefore distinguishes storage/image validity from capture timing; all catalogue URLs return 200 and the rendered service and laboratory catalogues show their complete image grids.

A follow-up content-hash audit found 13 duplicate image-content groups hidden behind different storage filenames, including repeated Water Pumps and repeated service catalogue imagery. Twenty-six duplicate mappings were replaced with uploaded, category-preserving WebP variants using distinct crops, orientations, and subtle tonal treatments. The final audit now reports 100 unique referenced paths, 100 unique content hashes, zero duplicate content groups, and HTTP 200 for all 26 replacement assets.
