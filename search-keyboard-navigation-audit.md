# Accessible Search Keyboard Navigation Audit

## Implementation

The search input now operates as a combobox. Arrow Up and Arrow Down cycle through available results; Home and End jump to the first and last result; and Enter opens the active result. A visible **Exit** control resets the search, while Escape exits the dropdown and restores focus to the input. The active result is exposed through `aria-activedescendant` and a selected option state.

## Automated Verification

The search-index test suite covers Arrow Up/Down wraparound, Home, End, and empty-result behavior. New component-level jsdom tests cover Arrow keys, Home, End, Enter navigation, Escape exit, and the visible Exit control, including focus restoration on the mobile component. The final quality run passed eight Vitest files with fifteen tests, TypeScript validation, and the production build.

## Browser Verification

On the live header search, a `centrifugal` query exposed the combobox, result listbox, Exit button, and two product options. Pressing Arrow Down selected the first result and applied the visible active-result styling.

Pressing Enter on that active result navigated to the exact `/products/water-pumps#BW-WP-001` catalogue entry, confirming keyboard activation preserves the existing deep-link behavior.

After reopening the query, pressing Escape cleared the query, closed the dropdown, and retained focus on the search input so the next search can begin immediately.

The refreshed build also confirmed that the visible **Exit** control now clears the query and closes the dropdown completely when focus returns to the input; it no longer reopens on that returned focus event.

The shared mobile search component was exercised with an Arrow Down event: it exposed its first result through `aria-activedescendant` and `aria-selected`, then cleared and closed on Escape. The visible desktop search input was separately verified to retain focus after Escape while the query and result list were cleared.
