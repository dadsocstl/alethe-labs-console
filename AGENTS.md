# AletheLabs App Builder — agent contract

## Demo posture
- Auth **OFF**, database **OFF**, zustand seed only.
- Never claim an ATO. Validate ≠ authorize. Do not mark Satisfied on SSP statements.
- GitLab is source of truth; GitHub is the twin.
- Reuse mapped trestle / C2P / SSG / DADSOC repos in `src/lib/estate.ts`. Do not invent a second estate.

## On each run
1. Read this file. Inspect routes, store, seed, `repos.ts`, `estate.ts`.
2. Run typecheck and browser smoke against the live preview. Fix real defects.
3. If QA is clean, ship one focused improvement then re-verify.
4. Do not add auth, a database, a second visual language, or new repos outside the estate.
5. Leave the dev server running via `startup.sh`.
6. If nothing user-visible remains, report production-ready and stop gold-plating.

## Key paths
- `src/lib/estate.ts` — canonical repo/system map
- `src/lib/repos.ts` — GitLab/GitHub helpers
- `src/store/useAppStore.ts` — seed + HITL + promote + audit
- Routes: `/`, `/estate`, `/repos`, `/hitl`, `/promote`, `/compliance`

## Persistence
App Builder artifacts FUSE often fails (`conversation_id is required`). Durable copy: https://github.com/dadsocstl/alethe-labs-console
Local workdir when FUSE is broken: `/home/workdir/alethe-labs`
