# AGENTS.md

## Mission
This repository is a static, immersive course platform for teaching AI concepts in an amphitheater setting.

The code must serve the pedagogy and presenter experience. The code structure must reflect the course structure, not the other way around.

## Non-negotiable architecture
- Stack: Vite + React + TypeScript + MDX + Tailwind CSS + Motion.
- Client-side only. No backend, SSR, database, or server dependency for the course.
- GitHub Pages consumes the generated dist/.
- Learners/presenters must not need Node.js, npm, or a local build.
- Keep content, presentation engine, input handling, transitions, and scenes separated.
- Do not introduce a global god component.
- Do not duplicate navigation or presentation-state logic inside scenes.
- Scenes receive explicit typed state and render from that state.
- The presentation engine must not know about scene-specific technologies such as WebGL/Three.js.
- Heavy visual dependencies must be isolated to the scene that needs them.

Preferred structure:

src/
  presentation/
    engine/
    input/
    transitions/
    types/
  scenes/
    course-01/
      intro/
      pipeline/
      tokens/
      embeddings/
      attention/
      transformer/
      generation/
      simulation/
      hallucinations/
      synthesis/
  components/
  data/
  lib/

## Presentation rules
The primary target is a 16:9 projected screen at 1920x1080.
- One scene = one pedagogical idea.
- One presenter action should reveal one meaningful state whenever possible.
- Use deterministic, state-driven rendering.
- Keep text large and readable from an amphitheater.
- Avoid dense dashboards, tiny UI, excessive badges, decorative gradients, generic AI imagery, and unnecessary 3D.
- Animations are explanatory, not decorative.
- Critical information must remain understandable without animation.
- Presenter controls are global and consistent: Right/Space/Enter next; Left previous; R restart; M course map; F fullscreen; Escape exit.
- Do not implement scene-local keyboard navigation.
- Keyboard shortcuts must work regardless of which non-text control currently has focus.
- Preserve logical focus and visible focus-visible states.

## Scene implementation
Every scene should have a clear typed step contract, predictable progression, no duplicated engine logic, accessible labels for important visuals, responsive behavior, reduced-motion behavior, and cleanup for timers/listeners/animation loops/WebGL resources.
Prefer declarative derived state. Avoid boolean explosions and hidden global state.

## Pedagogical accuracy
Scientific simplifications are allowed only when explicitly pedagogical.
- A token is not necessarily a word.
- Embedding coordinates shown in class are illustrative.
- A 3D embedding visualization is a projection, not a faithful representation of the full embedding space.
- Attention visualizations show selected relationships, not the complete internal computation.
- Probability values used in demonstrations are illustrative unless sourced from an actual model run.
- The presentation pipeline is a mental model, not a literal single-pass implementation.
Never turn a pedagogical simplification into a factual claim about how a production model literally executes.

## CSS rules
Treat src/styles.css as a maintained design system, not a dumping ground.
- Keep styles grouped by responsibility and scene.
- Use design tokens for shared colors, radii, shadows, and layout constants.
- Reuse existing tokens before introducing new literals.
- Do not add duplicate selectors for the same component.
- Do not leave CSS for removed components.
- Do not add a class in JSX without verifying its CSS.
- Do not add CSS for an unused class unless it is intentionally a reusable primitive.
- Keep responsive rules organized with the relevant section.
- Preserve the existing visual language unless the task explicitly changes it.
- Avoid !important except when a component boundary genuinely requires it.
- Never use CSS hacks to hide functional problems.
- Check alpha colors when converting literals to variables; never create invalid constructs such as var(--color-ink)22.
Before a CSS refactor, inspect both JSX class usage and stylesheet definitions.

## Accessibility
- Use semantic HTML.
- Interactive elements must be real buttons/links.
- Icon-only buttons need accessible names.
- Preserve visible focus.
- Do not rely on color alone to communicate state.
- Important visual information needs an accessible textual equivalent where practical.
- Respect prefers-reduced-motion.
- Keep contrast appropriate for projected text.

## Performance
- Avoid unnecessary render loops.
- Do not keep inactive animation loops alive.
- Lazy-load heavy scenes/dependencies when significant.
- Dispose WebGL resources.
- Avoid large numbers of decorative DOM/SVG nodes without a reason.
- Keep the initial homepage lightweight.
- Do not add a dependency when native CSS/React is sufficient.

## QA and validation
Every presentation change must be evaluated at 1920x1080.
The Course 01 visual QA suite should cover all scenes and steps, overflow, scene navigation, keyboard navigation, course-map opening and selection, restart, exit control, and presenter-visible labels.
Before declaring a change complete:
1. Run TypeScript/build validation.
2. Run relevant Playwright visual QA.
3. Inspect failures rather than weakening selectors/assertions to make them pass.
4. Document intentional visual regressions in the PR.
5. Never claim CI/build success without a verified result.

## Tests are contracts
Tests should validate user-visible behavior, not implementation trivia.
Prefer accessible roles, accessible names, and stable semantic structure. Avoid incidental DOM selectors when an accessible locator exists.
When a test fails, determine whether it is application behavior, accessibility/semantics, test targeting, or environment/tooling. Do not blindly patch the selector.

## Git and PR workflow
Use focused branches and focused commits.
Branch examples: feat/course-01-..., fix/course-01-..., refactor/..., chore/....
Commit prefixes: feat, fix, refactor, chore, docs.
Keep PRs small enough to review.
PR descriptions state what changed, why, important decisions, validation, and known limitations.
Do not mix unrelated refactors into a feature PR unless required for safe implementation.

## Definition of Done
- Architecture remains consistent with this document.
- No duplicated state/navigation logic.
- JSX classes have maintained CSS where required.
- Removed UI has no leftover CSS.
- Responsive behavior considered.
- Accessibility considered.
- Reduced motion considered.
- TypeScript/build passes.
- Relevant Playwright QA passes.
- No known console/runtime errors.
- Intentional pedagogical simplifications are documented.
- No backend/SSR dependency introduced.

## Working rule
When two solutions are technically valid, prefer the one that makes pedagogical intent clearer, keeps presenter control deterministic, reduces hidden state, minimizes dependencies, and is easier to visually QA and replace later.
Do not optimize for cleverness. Optimize for clarity, stability, and teaching quality.