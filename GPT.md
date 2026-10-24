# WizardChess — Persistent Engineering Memory

Last updated: 2026-10-24
Repository: https://github.com/majd7772233-a11y/WizardChess
Default branch: `main`
Status: Requirements review and initial baseline documentation; no game-code changes have been made in this review.

## 1. Purpose and product intent

WizardChess is an existing React/Three.js 3D chess game with a dark gothic cathedral setting, stone chess pieces, fire/lighting effects, and Arabic/English localization. The goal is to grow the current game into a complete, polished chess experience by preserving its identity and reusing original assets instead of replacing it with an unrelated visual design.

The phrase “Pro Max” is a private conversational shorthand only. It must not appear throughout the game, in the public product name, player-facing UI, store metadata, or artwork unless the user explicitly changes this requirement.

## 2. User-confirmed requirements and constraints

### Modes and navigation
- Add a real main menu; the current reviewed app enters the chess game directly.
- Include story campaign, AI match, two players on the same device, puzzles/challenges, and free/custom play.
- Each mode needs a distinct page/setup flow and only the configuration relevant to it.
- “Continue” should let the player choose among available saved activities. If an interrupted match and campaign progress are both present, do not silently choose one.
- Match options include untimed, fixed time, and increment after each move.

### AI
- The AI should be genuinely strong, local, and usable without internet.
- Provide fixed selectable difficulty levels and a separate optional adaptive-difficulty mode.
- Provide named opponents with clear profiles, different playing styles, useful descriptions, and meaningful statistics when enough games exist.
- Do not claim false playing strengths. Reuse the current visual identity for opponent presentation.

### Campaign and rewards
- Provide a clear main story path, side stages/missions, optional objectives, and additional challenges.
- Non-monetized rewards may unlock opponents, stages, challenges, titles, and achievement ratings.
- No ads, in-app purchases, or unnecessary currency economy in the free version.
- Do not invent an exact story narrative, number of stages, or replacement assets before discussion.

### Art and presentation
- Preserve the existing gothic/cathedral identity, stone pieces, fire, materials, and warm lighting.
- Reuse existing models/scene effects wherever suitable. Avoid cartoonish visuals or creating poor new assets merely to fill a requirement.
- Main-menu scene ideas discussed: use the existing board/cathedral scene, existing royal pieces, and edge fire/lighting as a live atmospheric background. This is an agreed direction to explore, not a fully approved pixel-level design.
- Provide clear Arabic-primary and English-toggle behavior with RTL/LTR support.
- Consider performance options for motion/effects and responsive layouts.

### Engine refactor preservation rule
The current large `src/wizardChessEngine.js` may be split into smaller files later. This is not authorization to rewrite it now. Before splitting:
1. Map the engine's functions, responsibilities, callers, IDs, events, initialization, shared state, and asset paths.
2. Establish tests around current intended behavior.
3. Move responsibilities to modules with correct imports/exports and connected call sites.
4. Preserve all existing functions and useful behavior; do not delete pieces of the engine just to make it smaller.
5. Keep pure refactoring separate from functional chess-rule/AI improvements where practical.
6. Re-run tests and inspect all references and user-visible behavior after the split.

### Release and online plans
- `main` is the free, ad-free version, with no in-app purchases.
- Develop shared features only once in `main`.
- After the first version is implemented and the user has tested and explicitly accepted it, proceed with online multiplayer using Cloudflare Workers.
- The paid one-time-payment, ad-free branch is created at the end from the stable shared mainline, with only distribution/payment-specific differences.

## 3. Repository state and inventory

### Verified GitHub state at the start of this documentation change
- Repo: `majd7772233-a11y/WizardChess`, public.
- Default branch: `main`.
- Head before these documentation files: `24d98f2bef7924a74f6f84f364ddfd95a7c5fae2`, message `first commit`, committed at 2026-10-21 06:04:35 UTC.
- The recursive Git tree query returned `truncated: false` and 27 entries.
- Before this initial documentation, there was no `ROADMAP.md`, `GPT.md`, or `README.md` in the returned repository tree.
- No `.github` CI workflow directory was present in the complete tree.
- Root and nested paths present:
  - `.gitignore`, `index.css`, `index.html`, `metadata.json`, `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`
  - `public/assets/glb/bishop_white.glb.gz.b64`
  - `public/assets/glb/king_white.glb.gz.b64`
  - `public/assets/glb/knight_white.glb.gz.b64`
  - `public/assets/glb/pawn_white.glb.gz.b64`
  - `public/assets/glb/queen_white.glb.gz.b64`
  - `public/assets/glb/rook_white.glb.gz.b64`
  - `public/assets/glb/option8_cathedral.glb.gz.b64`
  - `src/App.tsx`, `src/main.tsx`, `src/i18n.ts`, `src/styles.css`, `src/vite-env.d.ts`, `src/wizardChessEngine.js`
  - `test/applet.test.mjs`

The names/sizes in the Git tree inventory are verified. The contents of large binary/base64 assets have not all been downloaded, decompressed, or visually inspected in this review.

## 4. Technology and available validation

- React 19, TypeScript, Vite, Three.js, and `@google/genai` are declared in package/dependency metadata. Verify whether every dependency is actually used before changing it.
- Package scripts include `dev`, `build`, and `lint`; `lint` runs `tsc --noEmit`. No `test` script is declared.
- `test/applet.test.mjs` has two tests:
  1. Selected DOM/HUD and prohibited-element expectations.
  2. Decode/check seven compressed GLB assets, including the GLB v2 header.
- The existing tests do not establish comprehensive chess-rule correctness.
- No local clone, build, test, or static-analysis run has been performed during this review. A prior local Git connection attempt failed because the container could not resolve `github.com`. Do not report the build/tests as passing. Revisit execution when a working local environment or CI path is available.
- Do not assume the tests have been run merely because the test source exists.

## 5. Reviewed implementation findings

These findings describe the files examined in the preceding review. They must be revalidated against the live tree before code changes. “Not found” means not found in the inspected implementation, not proof that an unexamined dynamic path cannot exist.

### UI and localization
- `src/App.tsx` defines the current React UI, controls, and game setup; it currently enters the board experience rather than providing the desired mode-select home screen.
- `src/i18n.ts` contains Arabic and English translations.
- `src/styles.css` styles the current game UI.
- `src/main.tsx` is the React entry point.
- A prior DOM/reference audit found many engine `getElementById` references that do not directly match IDs declared in the inspected JSX. Some may be dynamically created or legacy paths; treat these as audit targets, not confirmed defects, until traced.
- No implemented story-campaign/save-selection navigation was identified in the files reviewed.

### Chess engine
- `src/wizardChessEngine.js` is the large engine module (about 196 KB and about 4,970 lines in the reviewed snapshot).
- `chooseSmartAIMove` is a heuristic AI based on approximated factors such as captures/piece values, board position/center, pawn advancement, check, and some randomness. It is not evidence of a strong search engine.
- The code contains movement generation and handling for major standard chess behavior, including castling, checking for check, captures/animated moves, and stalemate detection.
- Pawn promotion was observed to default automatically to a queen; user-choice promotion was not established in the reviewed implementation.
- En passant was not found in the movement generation reviewed.
- A complete implementation of other standard draw rules was not established. This requires a focused rules audit and tests; do not assume every draw rule is missing until verified.
- A move history exists in memory, but reliable persistent match/campaign saves were not found in the reviewed paths.
- No strong offline chess engine such as Stockfish was identified among the inspected source files. This is a finding about the inspected tree, not a final engine-selection decision.

### Assets and rendering
- Assets are stored as `.glb.gz.b64` files under `public/assets/glb`: the cathedral scene and six white-piece models.
- The reviewed engine reuses white piece models with adjusted materials for the opposing set.
- The existing scene uses gothic/cathedral presentation, stone surfaces, warm lights, and shader-driven fire effects. Preserve and validate these elements before making visual changes.
- Binary assets have not all been decoded/rendered for direct visual inspection; the existing asset test's source checks compressed payloads and GLB v2 headers.

### Network/multiplayer remnants and state handling
- The engine contains remnants of an earlier multiplayer flow: room creation/joining, room/player tokens, remote-move handling, polling/EventSource-style connection logic, localStorage room keys, and BroadcastChannel usage.
- The previously inspected `CLOUD_MP_API_BASE` was empty, so a configured, production-ready online endpoint was not established.
- LocalStorage keys found in the inspected code included `wizardchess_mp_room_id`, `wizardchess_mp_player_token`, and `wizardchess_mp_last_room`; these are multiplayer-related, not proof of durable chess/campaign saves.
- The inspected remote-move path calls `executeChessMove` with a remote flag that bypasses a client-side legality check. When multiplayer is implemented, the Worker must validate moves/state authoritatively; never trust client-supplied moves.

## 6. Findings that still need confirmation

- Build and TypeScript/lint status on a working local/CI environment.
- Full chess-rule audit, especially en passant, promotion selection, repeated-position/fifty-move and other applicable draw rules, and any edge cases not covered by existing tests.
- The status of engine IDs/references that did not match the direct JSX inventory.
- Actual runtime use of `@google/genai` and every declared dependency.
- Performance and memory behavior of the cathedral scene, fire effects, and existing engine.
- Direct inspection of the compressed binary assets.
- The best licensed offline AI engine and its runtime, performance, worker, and packaging impact.
- The appropriate persistence backend and Android packaging approach.
- The exact story narrative, stage content, opponent roster, and final menu design.
- Current working-tree state cannot be obtained via this repository-only GitHub contents integration; inspect it in the actual development environment before any local edits.

## 7. Requirements decisions and open boundaries

### Confirmed
- Use a main menu and distinct modes: story, AI play, local two-player, puzzles/challenges, free play.
- Strong offline AI; fixed levels plus separate optional adaptive difficulty; named opponents/styles.
- Untimed, fixed-time, and per-move increment time controls.
- Story main route with side content, optional goals, challenges, persistent rewards/unlocks, titles/ratings/achievements.
- Reuse gothic scene and existing art; avoid cartoonish replacement assets.
- Player must choose among available saved activities in Continue.
- Preserve engine behavior during later modularization.
- Online play with Cloudflare Workers only after first-version user acceptance.
- Free, ad-free `main`; paid one-time-payment, ad-free branch last; common features built once.
- Never put the private “Pro Max” nickname into the player-facing game.

### Discussed as directions, not final details
- Exact module/file names for the engine split.
- Exact menu composition, animation intensity, and final page layouts.
- Story plot, character names, stage count, puzzle catalog, and reward schedule.
- AI engine selection and exact difficulty calibration.
- Save-storage technology.
- Android packaging technology and release storefront.
- The details of the online protocol and deployment.

## 8. Engineering workflow and permanent rules

- Read this file and `ROADMAP.md` before resuming development; verify against the actual GitHub/source state rather than trusting old notes blindly.
- Inspect all affected code, call sites, configuration, tests, and assets before editing.
- Separate confirmed facts, hypotheses, and untested assumptions.
- Preserve working functionality and user changes.
- Never perform an engine split by deletion or rewrite; create an inventory/mapping and regression coverage first.
- Run meaningful checks and report actual results only.
- Fix in-scope regressions within the requested stage; do not leave a stage half-done and ask the user to request the same completion again.
- Update both memory files when requirements, architecture, defects, decisions, test results, or stage state change.
- Never store actual secret values in these files.
- The roadmap stage is complete only when its implementation, integration, appropriate verification, and documentation gate is met. If a genuine blocker prevents this, identify the exact unmet criteria and leave the stage marked blocked.

## 9. Current operational state

- Current phase: requirements consolidation and initial engineering documentation.
- No implementation stage has started in this review.
- No game source, asset, dependency, or test file has been modified by this documentation setup.
- The next action is to continue reviewing and confirming the user-visible experience and unresolved product decisions. After that review, begin Stage 1 as a complete unit when requested.
