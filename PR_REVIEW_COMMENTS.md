PR review comments for Pull Request

Files changed:

- src/components/Navbar.tsx
- src/components/HeroSection.tsx
- src/components/Advertisments.tsx
- src/components/Footer.tsx

== Navbar.tsx ==

- Accessibility: Add explicit label for category select (visually hidden or aria-label).
- DRY: Extract duplicate desktop/mobile search into a reusable `SearchForm` component.
- Behavior: Replace console.log in handler with an `onSearch` callback or routing logic.

== HeroSection.tsx ==

- Heading semantics: change second <h1> to <h2> to avoid multiple <h1> elements.
- Keys: prefer stable unique ids for stats keys if available in data.

== Advertisments.tsx ==

- Network: use AbortController (done) and check res.ok before parsing JSON (done).
- Add retry UI and basic runtime validation for API responses.
- Error handling: surface errors in UI (message + retry) rather than only console errors.

== Footer.tsx ==

- Change multiple <h1> to <h2> to preserve document outline.
- Add aria-labels to social links.
