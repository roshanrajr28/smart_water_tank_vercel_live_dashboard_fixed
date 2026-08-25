SMART WATER TANK - VERCEL LIVE ESP32 DASHBOARD

Use this folder as the ROOT of the Vercel project.

Files:
  index.html
  api/data.js
  api/reset.js
  lib/store.js
  package.json

LIVE DATA FLOW:
  ESP32  --POST-->  /api/data  --stored--> latest state
  Dashboard --GET--> /api/data  --reads--> latest state
  Dashboard --POST--> /api/reset --queues--> resetRequested:true
  ESP32 receives resetRequested:true in its next /api/data POST response.

IMPORTANT:
1. Deploy the ENTIRE folder, not only index.html.
2. The api/ and lib/ folders must be deployed.
3. After deployment, open:
   https://smart-water-tank-automation.vercel.app/api/data
   It should return JSON, not 404.
4. ESP32 must have Internet Wi-Fi access.
5. ESP32 CLOUD_API_URL must be:
   https://smart-water-tank-automation.vercel.app/api/data

The dashboard has been changed to use same-origin /api/data and /api/reset.
It no longer tries to read http://192.168.4.1/data from a hosted HTTPS page.

DEMO STORAGE NOTE:
lib/store.js is an in-memory store. It is fine for a college demonstration,
but Vercel serverless cold starts can reset it. A persistent database can be
added later if you need data to survive restarts.
