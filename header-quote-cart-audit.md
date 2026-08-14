# Header Search and Quotation Cart Audit

The live Water Pumps catalogue now shows a compact product search field in the header, a Quote basket control, and an Add to quote button on every primary and Domestic Pumps product card. The header remains within the existing navigation at desktop width, while the product card actions are visible beside each enquiry link.

The first add-to-quote click has been issued in the live browser; the basket state and quotation form still require a focused follow-up check before delivery.

The live browser now confirms the selected state: the header displays `Quote 1`, the first product card reads `In quote basket`, and the drawer shows the selected product with quantity controls, clear/remove actions, required client fields, and the explicit recipient notice for `info@bridgewax.com`. No console errors were reported.

The quantity increment control was tested successfully: the selected product quantity changed from 1 to 2 and the header updated to `Quote 2`. The drawer retained the selected product and recipient notice while displaying the revised quantity.

The drawer was closed, then a second product was added. The browser confirmed both product cards read `In quote basket` and the header updated to `Quote 3`, demonstrating multi-product selection plus quantity-aware counting.

The moved header search was tested from the Water Pumps catalogue with `gas detector`. It returned `Portable Single-Gas Detector` and `Portable Multi-Gas Detector` links to the Gas Detection catalogue while the `Quote 3` count remained visible.

After revisiting the Water Pumps route, the persistent basket reopened with both selected products: End-Suction Centrifugal Pump at quantity 2 and Submersible Dewatering Pump at quantity 1. The header still showed `Quote 3`, confirming local persistence across route loads.

The Clear basket action was tested successfully. The header returned to `Quote`, the drawer showed `Your basket is empty`, and the Continue browsing action remained available.
