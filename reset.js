// api/reset.js
// Dashboard's "Reset System" button POSTs here.
// We flag it in the shared store; the ESP32 picks up resetRequested:true
// the next time it POSTs to /api/data, and should clear its own fault
// latch + resume automation when it sees that flag.

const state = require("../lib/store");

module.exports = function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  state.resetRequested = true;
  state.latest.fault = false;
  state.latest.checking = false;

  console.log("RESET REQUESTED from dashboard");

  return res.status(200).send("Reset command queued for ESP32");
};
