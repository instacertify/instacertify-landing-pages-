# Deploy on Hostinger (Node.js Web App)

This app is an **Express** server (`server/index.js`), not a static site. Use Hostinger **Business / Cloud** Node.js Web App hosting, or a **VPS**.

## Recommended: Managed Node.js Web App (hPanel)

1. In [hPanel](https://hpanel.hostinger.com) → **Websites** → **Add website** → **Node.js web app**
2. Choose **GitHub** and connect `instacertify/instacertify-landing-pages-`
3. Use these settings:

| Setting | Value |
| --- | --- |
| Framework | Express / Other |
| Branch | `main` (after merge) or `cursor/unique-designs-complete-editor-14b8` |
| Node.js version | **20** or **22** (24 also OK) |
| Build command | `npm run build` |
| Entry file | `server/index.js` |
| Start command | `npm start` (if asked) |

> Uses pure-JS SQLite (`sql.js`) — no Python / node-gyp / native build tools required on Hostinger.

4. Add environment variables in Hostinger:

| Key | Example |
| --- | --- |
| `NODE_ENV` | `production` |
| `PORT` | leave blank / Hostinger assigns |
| `ADMIN_PASSWORD` | strong password |
| `SESSION_SECRET` | long random string |
| `PUBLIC_BASE_URL` | `https://info.instacertify.com` |

5. Point domain **info.instacertify.com** to this Web App and enable SSL.
6. After deploy, open:
   - `https://info.instacertify.com/sds-certificate`
   - `https://info.instacertify.com/admin`

## File upload method (ZIP)

If you prefer upload instead of GitHub:

1. Upload a project ZIP (no `node_modules`, no `.git`, no local `data/*.db` unless you want that DB)
2. Same entry file: `server/index.js`
3. Same env vars as above

## VPS method (SSH)

```bash
git clone https://github.com/instacertify/instacertify-landing-pages-.git
cd instacertify-landing-pages-
npm install
cp .env.example .env   # edit values
npm run seed
npm start              # or: pm2 start server/index.js --name instacertify-lp
```

Put Nginx/Caddy in front and proxy to `PORT`.

## Notes

- Uploaded images store under `public/uploads/` (must stay writable).
- SQLite DB stores under `data/landing.db` (must stay writable).
- `npm run build` runs the seed so SDS / LMPC / BIS sample pages exist on first deploy.
