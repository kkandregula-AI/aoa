# The Age of Agents — a two-part interactive PWA

A cover (`index.html`) that opens two interactive pieces:
- **Part I — The Age of AI That Acts** (`agentic-ai.html`)
- **Part II — Digital Workers** (`digital-workers.html`)

Installable, and works offline after the first load via `sw.js`.

## Files (keep them together, same folder)
```
index.html
agentic-ai.html
digital-workers.html
sw.js
manifest.webmanifest
favicon.svg
icons/
  icon-192.png
  icon-512.png
  icon-maskable-512.png
  apple-touch-icon.png
```

## Deploy: GitHub → Vercel
1. Create a new GitHub repo and upload every file above (keep the `icons/` folder).
   - Web: repo → **Add file → Upload files** → drag them in → **Commit**.
   - CLI: `git init && git add . && git commit -m "Age of Agents" && git branch -M main && git remote add origin <your-repo-url> && git push -u origin main`
2. Go to **vercel.com → Add New → Project → Import** your repo.
3. Framework preset: **Other**. Build command: **none**. Output directory: **/** (root). Click **Deploy**.
4. Open the live URL. Visit once online — the service worker caches everything, so it opens offline afterward.

It's a plain static site, so there is no build step and no config file needed.

## Install as an app
- **iPhone/iPad (Safari):** Share → **Add to Home Screen**.
- **Android/Desktop (Chrome/Edge):** an **Install** button appears bottom-right, or use the browser's install icon in the address bar.

## Updating later
Edit a file, then bump the version in `sw.js` (`age-of-agents-v1` → `-v2`) and redeploy.
That tells installed devices to refresh their cached copy.

Designed & Architected by Krishnamurthy Kandregula · Made by Claude
"# aoa" 
