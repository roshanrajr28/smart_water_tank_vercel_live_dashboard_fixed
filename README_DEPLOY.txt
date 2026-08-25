SMART WATER TANK - VERCEL DEPLOYMENT

IMPORTANT: deploy THIS FOLDER as the Vercel project root.

Required structure:
index.html
api/data.js
api/reset.js
lib/store.js
package.json

API TEST:
GET https://YOUR-DOMAIN.vercel.app/api/data
Expected: JSON, NOT 404.

ESP32 POST:
POST https://YOUR-DOMAIN.vercel.app/api/data
Content-Type: application/json

Dashboard reset:
POST /api/reset

If your current domain still returns 404 after deployment, you are opening an older deployment/project. Redeploy this folder to the same Vercel project or update the domain's production deployment.
