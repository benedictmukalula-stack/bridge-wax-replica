# 1-Grid Domain Email Audit

The official 1-grid knowledgebase confirms that domain mail can use an outgoing SMTP server based on the customer domain, with supported SMTP ports 25 and 26. The same guidance lists secure SMTP over TLS/SSL on port 465. The available official page text does not expose a single universal hostname for every 1-grid account, so the exact outgoing host must be confirmed from the bridgewax.com mailbox or 1-grid control panel before configuration.

Target recipient for quotation requests: info@bridgewax.com.

The configured `info@bridgewax.com` mailbox authenticated successfully using `mail.bridgewax.com` with encrypted STARTTLS on port 587. Port 465 did not complete a secure connection from the website environment, so the server-side configuration uses the verified port 587 submission endpoint. The upgraded Water Pumps catalogue and Cart control also load correctly in the live site preview.

The live browser console reported no client errors after the full-stack upgrade. The visual cart-selection check will be repeated using an explicit in-page interaction before submitting through the new automatic delivery form.

The repeated in-page cart interaction completed successfully after the React update cycle: the header showed two selected items and local storage contained two Water Pumps entries. This confirms the cart remains functional; the delayed view refresh, rather than a client error, explained the earlier visual check.

With explicit approval, a clearly labelled test quotation containing two Water Pumps products was submitted through the live cart drawer. The server accepted and delivered the message through the configured bridgewax.com sender, cleared the cart, reset the header count, and displayed the in-drawer success message confirming delivery to info@bridgewax.com.

For the fallback check, a new single-item cart was prepared without submitting any further email. The header confirms `Cart 1` and the selected product displays its active cart state.

A simulated client-side submission failure preserved the selected product, displayed the automatic-delivery error message, and revealed the Open email app fallback control. The fallback mailto payload was verified to target only `info@bridgewax.com` and include both the test customer email and selected `BW-WP-001` product.

The browser fetch override and local test-cart state were removed after verification. The preview was reloaded and returned to its normal empty-cart state.

The fallback handoff was re-tested from a controlled simulated failure. The visible Open email app control was invoked successfully, and the generated prefilled mailto payload had already been verified to address only info@bridgewax.com. The sandbox preview browser remained on its HTTPS page after the click because it has no local email-client protocol handler; this is an environment limitation rather than a website failure. On a customer device with a configured mail application, the browser passes the same mailto request to that application.

After restoring normal browser networking and clearing controlled test data, the preview returned to a normal empty-cart state. Final quality checks passed: TypeScript check, all three Vitest suites (including SMTP authentication and quote-mailer tests), and the production build.

Sources:

- https://1-grid.com/client/index.php?rp=/knowledgebase/91/I-cant-send-emails-I-get-an-error.html
- https://1-grid.com/client/index.php?rp=/knowledgebase/9/Commonly-used-port-numbers.html
