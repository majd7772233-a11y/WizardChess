# WizardChess — Project Roadmap

Last reviewed: 2026-10-24
Repository: https://github.com/majd7772233-a11y/WizardChess
Planning status: Initial investigation recorded; feature-development stages have not started.

## 1. Objective and definition of success

Develop the existing gothic 3D chess game into a reliable, complete chess experience while preserving its distinctive cathedral, stone-piece, lighting, and fire aesthetic. Build on the current application rather than replacing it with an unrelated game or throwing away working engine behavior.

The intended product includes:
- Correct, thoroughly verified standard chess rules.
- A strong chess engine that runs locally and works without an internet connection.
- Clearly distinguished fixed difficulty levels, plus a separate optional adaptive-difficulty setting.
- Named AI opponents with distinct presentation and playing profiles.
- A main menu and separate, coherent pages for the available game modes.
- AI matches, two-player local matches, free play/custom matches, story campaign, and puzzles/challenges.
- Persistent match and campaign progress, achievements, unlocks, and settings.
- Untimed play, fixed-clock play, and increment-per-move time controls.
- Arabic as the primary language with an English option and correct RTL/LTR behavior.
- A visually polished, responsive experience that reuses the existing assets and is tested on intended targets.
- Online multiplayer using Cloudflare Workers after the user has verified and accepted the first version.
- A paid distribution branch created only at the end, after the shared free version is stable; it must not duplicate feature development.

The private conversational nickname “Pro Max” is not product branding. Do not place it in player-facing UI, app titles, assets, store metadata, or routine in-game copy unless the user explicitly changes this instruction.

## 2. Non-negotiable product and engineering constraints

1. Preserve the existing game identity and useful behavior. Reuse the current cathedral, board, chess-piece models, materials, lighting, and fire effects wherever appropriate.
2. Do not add weak, mismatched, cartoonish, or unnecessary replacement art. Do not invent new assets merely to fill space.
3. Do not start implementation based only on assumptions. Confirm the real source, call sites, configuration, tests, and behavior first.
4. Do not claim a feature, build, test, CI run, or deployment succeeded without direct evidence.
5. Keep verified facts, inferred risks, and unresolved questions clearly separated.
6. Do not silently discard functionality during refactoring.
7. The large engine may be split into smaller modules later, but only after its behavior and interfaces have been mapped and baseline tests exist. Splitting means reorganizing the same responsibilities without deleting engine features or intentionally changing behavior. Validate callers, initialization, events, asset loading, animation, camera control, chess behavior, and public interfaces after each such change.
8. User requests for a stage mean the whole stage and its applicable acceptance criteria must be completed in one execution cycle. Do not create artificial sub-stages or declare partial completion.
9. Keep the free `main` branch free of ads and in-app purchases. Build common features once. Create the paid branch at the end and limit it to the actual one-time-payment/distribution differences.
10. Do not implement online multiplayer before the first version has been delivered for user testing and the user explicitly confirms that it is acceptable.

## 3. Verified repository baseline

At the time of this review:
- Default branch: `main`.
- Baseline commit before initial project documentation: `24d98f2bef7924a74f6f84f364ddfd95a7c5fae2` (`first commit`, 2026-10-21 06:04:35 UTC).
- The complete recursive Git tree was retrieved from GitHub and was not truncated: 27 entries, including directories.
- Main app files include `src/App.tsx`, `src/main.tsx`, `src/i18n.ts`, `src/styles.css`, and `src/wizardChessEngine.js`.
- Existing assets include six white-piece GLB models and `public/assets/glb/option8_cathedral.glb.gz.b64`.
- The project declares React 19, TypeScript, Vite, Three.js, and `@google/genai`. The precise role of every dependency must be verified before changing it.
- `package.json` contains `dev`, `build`, and `lint` scripts; `lint` is `tsc --noEmit`. There is no configured `test` script.
- `test/applet.test.mjs` contains two tests: one checks selected DOM/HUD expectations and another checks the seven expected compressed GLB assets can be decoded and have valid GLB v2 headers.
- No `README.md`, `ROADMAP.md`, or `GPT.md` existed in the inspected tree before this initial documentation. No `.github` workflow directory was present in the tree.
- The browser-facing app currently enters the chess experience directly; a full main menu and the desired mode-selection flow were not found in the reviewed files.
- A local clone/build/test run has not been completed in this review. Do not represent build or test status as passing. Asset files have been inventoried by filename and size but not all downloaded, decoded, and visually inspected.

See `GPT.md` for detailed technical findings, their confidence levels, and the exact limits of the review.

## 4. Architecture direction

Retain the current React/TypeScript/Vite and Three.js foundation unless testing identifies a concrete reason to change it. Keep chess-rule state and AI decisions distinguishable from rendering, animation, camera/scene setup, UI state, persistence, and network code.

The eventual architecture should have clear contracts between:
- Chess rules and match state.
- AI engine adapter, difficulty configuration, and opponent profiles.
- Three-dimensional scene, models, animation, materials, camera, and board interaction.
- UI navigation and each mode's setup/result flow.
- Save data, campaign progress, achievements, and settings.
- Future multiplayer transport and an authoritative Cloudflare Worker.
- Localization and direction-aware layout.

The module names shown below are organizational targets, not a requirement to create those exact files before inspecting function boundaries. The engine refactor must be behavior-preserving and must not be combined with unrelated feature rewrites.

## 5. Ordered stages

### Stage 1 — Establish a reproducible baseline and verify chess correctness

Scope: inspect the current branch/commit and all relevant files; run available build, type-check, and test commands in an environment with the source available; preserve a record of existing failures; map engine functions and UI-to-engine references; and audit the complete rules and end-of-game behavior.

Required areas include legal moves, check/checkmate, castling rights and conditions, en passant, pawn promotion choices, stalemate, other applicable draw rules, turn order, state consistency, and move-history behavior. Add meaningful automated tests around rules and known edge cases, then fix all defects that belong to this stage.

Acceptance gate:
- Baseline results and limitations are documented accurately.
- Chess-rule expectations are explicit and tested, including regressions for every fixed defect.
- Existing working scene, asset loading, controls, animation, camera behavior, and localization have not knowingly regressed.
- All available relevant checks have been run; unrun checks remain explicitly unverified.
- `ROADMAP.md` and `GPT.md` agree with the resulting repository state.

### Stage 2 — Behavior-preserving engine modularization

Begin only after Stage 1 supplies a usable behavioral baseline. Inventory functions, responsibilities, direct DOM references, state ownership, initialization order, and callers before moving code.

Split `src/wizardChessEngine.js` only where the actual dependency graph supports safe boundaries. Possible areas are chess rules/state, scene initialization, piece/model handling, animation, camera, UI/engine bridging, and legacy network code; final boundaries must follow evidence from the implementation.

Acceptance gate:
- Every existing function and behavior in the refactored engine has a documented destination or a specifically justified disposition approved by the requirements.
- No engine feature or code path is removed merely to simplify refactoring.
- All imports/exports, call sites, initialization, event listeners, IDs, asset paths, and lifecycle behavior are consistent.
- Before/after tests demonstrate the same intended behavior.
- No unrelated feature redesign is hidden inside the refactor.

### Stage 3 — Integrate a strong offline chess engine and opponent profiles

Research and select a suitable engine only after checking its license, offline behavior, browser/runtime compatibility, download/package size, memory and CPU use, worker support, and distribution implications. Do not assume a specific engine until verified.

Provide stable fixed difficulty levels and a separately selectable adaptive mode. Add named opponent profiles with meaningful descriptions and different strategic personalities while retaining genuine legal chess and honest strength limits. The same engine may power different styles through bounded configuration; do not use fake names or fabricated strength claims.

Acceptance gate:
- AI moves are legal, responsive, cancellable when a game ends/restarts, and compatible with the real game state.
- AI operates without a network connection after installation.
- Difficulty tiers are reproducible enough to test; adaptive difficulty is opt-in and does not silently replace fixed levels.
- CPU, memory, responsiveness, engine licensing, and total asset/package impact are measured on the intended targets.
- Failures and unsupported environments are handled honestly.

### Stage 4 — Reliable save/restore and durable player data

Choose storage only after evaluating the current web target and any later Android packaging path. Design versioned records and migrations instead of relying on a collection of unrelated keys.

Persist enough match state to restore a valid game, including side to move, all rule-relevant state, move history, and clock state when applicable. Separately persist story progress, unlocked content, achievements, opponent statistics, and settings. On launch, “Continue” must offer the available saved states for the player to choose among; it must not silently choose between an interrupted match and campaign progress.

Acceptance gate:
- Save/restore round trips preserve the same legal game state and history.
- Old or malformed saves are detected and handled without corrupting other records.
- Save format versions and migrations are tested.
- A match and campaign progress are independent records.
- The user can identify and choose the intended saved activity.

### Stage 5 — Main menu and mode-navigation foundation

Create a dedicated main menu rather than launching directly into an active board. Use the existing gothic scene and assets as the visual foundation where technically practical. Keep the menu legible, responsive, and integrated with the current lighting and fire aesthetic.

Provide separate routes/pages or equivalent isolated screens for story, AI play, local two-player, puzzles/challenges, free play, continue, settings, and achievements as applicable. Each mode must own its setup choices and entry/exit behavior. Keep “Pro Max” out of player-facing copy.

Acceptance gate:
- Menu navigation works end to end and does not initialize conflicting duplicate game sessions.
- Continue is shown/handled correctly for available saves.
- Back/cancel/restart flows are defined, including unsaved activity warnings where needed.
- Existing assets are reused where suitable; no unrelated replacement art is introduced.
- Arabic RTL and English LTR layouts are both usable.

### Stage 6 — Complete match modes and time controls

Deliver complete setup-to-result flows for AI matches, two players on one device, and custom/free-play matches. Each mode has only its relevant configuration and shares the verified rule/state layer rather than duplicating rules.

Provide untimed, fixed-clock, and increment-per-move clock modes. Define behavior on timeout, restart, pause/background, and game completion. AI setup includes opponent, side/color, and difficulty selection.

Acceptance gate:
- Each mode can start, play, end, and return to menus without stale state or broken navigation.
- Both local players can use the same board correctly, with suitable side/orientation controls.
- Time controls behave consistently and survive supported pause/restore flows.
- No mode bypasses the verified chess rules.

### Stage 7 — Story campaign, puzzles, achievements, and rewards

Build a main story path with stages, optional side stages, extra objectives, challenges, and meaningful non-monetized rewards. Rewards may unlock opponents, stages, additional challenges, titles, or achievement ratings. Build data definitions and progress logic so content is not hard-coded into UI event handlers.

Add puzzle/challenge flows with clear objectives, move validation, success/failure outcomes, and saved completion records. Do not assume the story narrative, exact stage count, or final art/content has been approved until discussed.

Acceptance gate:
- Campaign progress, unlock requirements, rewards, and achievements persist and are awarded exactly once where appropriate.
- Optional goals do not accidentally block ordinary stage completion.
- Puzzles validate both success and failure paths and cannot grant rewards for invalid states.
- UI shows what is unlocked, completed, and still available.
- No advertisements, microtransactions, or currency economy are added.

### Stage 8 — End-to-end UX, accessibility, responsive performance, and target packaging

Audit complete player journeys, loading/empty/error states, navigation, text legibility, localization, focus/keyboard use where applicable, reduced effects, responsive layouts, and memory/performance behavior. Confirm whether/how the project will be packaged for Android after the web version is stable; evaluate available options before selecting one.

The design must remain gothic, cinematic, and coherent with the current assets. Motion and fire should support atmosphere without overwhelming the board or unnecessarily exhausting devices. Keep user-facing terminology natural; do not expose the private project nickname.

Acceptance gate:
- Major workflows pass end-to-end verification in Arabic and English.
- Layout and controls work on the intended screen sizes and input methods.
- Performance and memory have been measured on representative devices or are clearly marked unverified where devices are unavailable.
- Packaging method, platform constraints, and offline asset availability are documented and tested as far as tooling allows.

### Stage 9 — First-version integration and user acceptance gate

Integrate the implemented core, AI, persistence, menu, match modes, story/challenges, and quality work into a coherent first release. Run the full feasible build/test/static-analysis/regression suite, review the final diff, and document any external verification that cannot be performed.

Acceptance gate:
- No known release-blocking defect remains in a verified core workflow.
- All accepted first-version requirements are implemented and connected.
- Test, build, asset, offline, performance, and compatibility results are reported from real evidence.
- The user has an opportunity to test the version and explicitly confirm that it is acceptable before online multiplayer work begins.

### Stage 10 — Online multiplayer with Cloudflare Workers

Do not begin this stage until the user explicitly confirms acceptance of the first version. Re-evaluate the current multiplayer remnants before designing the final protocol.

Implement secure room lifecycle, player identity/token handling, turn ordering, legal-move validation on the server, authoritative state/version checks, reconnect/rejoin behavior, timeouts, and error recovery. The server must not trust client-supplied moves or game state. Review secret handling and deployment configuration without recording secret values.

Acceptance gate:
- Two separate clients can play a complete game over the intended deployment.
- The Worker validates moves and state transitions authoritatively.
- Disconnections, stale/duplicate moves, invalid actions, room expiry, and rejoin behavior are tested.
- Actual deployed endpoint and workflow results are verified where permitted; no fabricated deployment claims.

### Stage 11 — Paid distribution branch and final project audit

Only after the shared `main` implementation and online stage are stable, create a paid branch from the completed `main`. Keep feature development shared and introduce only the required one-time-payment/distribution differences. Both versions remain ad-free; the free `main` version remains free and has no in-app purchases.

Perform a final requirements audit, verify shared features have not diverged, examine release artifacts and licensing, and synchronize both memory files.

Acceptance gate:
- Paid branch derives from the validated mainline at a recorded commit.
- Differences are limited to documented distribution/payment requirements.
- No feature needs to be reimplemented in both branches.
- Final build, tests, release artifacts, and remaining limitations are documented accurately.

## 6. Dependencies and gating

- Stage 1 precedes any engine refactor or major features.
- Stage 2 depends on Stage 1 regression coverage.
- Stage 3 depends on the rules/state contract being reliable.
- Stage 4 should be in place before campaign progress and “Continue” depend on it.
- Stages 5–7 depend on the verified shared core and integrate with the persistence layer.
- Stage 8 is continuous in spirit but its complete acceptance gate is applied before first-version acceptance.
- Stage 10 is blocked by design until explicit user acceptance after Stage 9.
- Stage 11 is the final branch/distribution task after the shared mainline is stable.

## 7. Current status and next action

No product-feature stage has started. The present work is requirements consolidation and the initial engineering record. Continue reviewing and confirming the user-visible flows and unresolved design choices before beginning Stage 1. When a stage is requested, execute the entire stage and update both memory files with verifiable results.
