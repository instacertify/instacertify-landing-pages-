# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single Node.js/Express app (Instacertify Landing Pages) — an SEO landing-page CMS with an embedded SQLite database. There is no monorepo, no build step, and no bundler.

### Services

Only one process is needed to run the product end to end:

- App server: `npm run dev` (dev mode, `node --watch server/index.js`, auto-restarts on file changes) or `npm start` (no watch). Listens on `PORT` (default `3000`).
  - Public home: `http://localhost:3000`, Admin UI: `http://localhost:3000/admin`, health check: `GET /api/health`.
  - Default admin password is `change-me` (from `ADMIN_PASSWORD`).

The SQLite database is embedded via `better-sqlite3` (file at `data/landing.db`) — there is no separate DB service to start. The `data/` dir and DB file are created automatically on first run.

### Lint / test / build

- There are no lint, test, or build scripts defined in `package.json`. Only `start`, `dev`, and `seed` exist. Do not assume a test runner or linter is available.

### Non-obvious caveats

- `.env` is optional: every variable in `.env.example` also has a code default, so the app boots without it. Copy `.env.example` → `.env` only if you need to override values (e.g. `ADMIN_PASSWORD`). Note `.env` and `data/*.db` are gitignored, so they do not persist via git — recreate them per environment as needed.
- `npm run seed` loads sample pages (`/sds-certificate`, `/lmpc-registration`, `/bis-registration`, `/iso-certification`) into `data/landing.db`. It inserts/updates seed pages by slug, so it is safe to re-run, but it is optional and not part of dependency setup.
- `better-sqlite3` is a native module; `npm install` compiles/downloads a prebuilt binding. If Node's ABI changes, run `npm rebuild better-sqlite3`.
