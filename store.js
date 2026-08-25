// lib/store.js
// Simple shared in-memory store for the Smart Water Tank dashboard.
//
// NOTE: This lives in server memory. It works well for a hobby / demo
// project as long as Vercel keeps reusing the same warm serverless
// instance (which it usually does for low-traffic apps). Data will
// reset to defaults on a cold start, and could differ across instances
// if traffic scales up. For a production setup, swap this out for a
// real store (Vercel KV, Supabase, Firebase, etc.) but keep the same
// shape so api/data.js and api/reset.js don't need to change.

let state = {
  latest: {
    water: 0,          // %
    current: 0,        // A
    motor: false,
    fault: false,
    checking: false,
    runtime: "00:00:00",
    minWater: 0,
    maxWater: 0,
    peakCurrent: 0,
    health: 100,
    updatedAt: null     // server timestamp of last ESP32 POST
  },
  resetRequested: false
};

module.exports = state;
