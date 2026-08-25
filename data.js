// api/data.js
// ESP32  -> POST here every time it has a new sensor reading.
// Dashboard -> GET here every second to display the latest reading.
// Both sides hit the SAME url: /api/data

const state = require("../lib/store");

module.exports = function handler(req, res) {
  // Allow ESP32 + browser requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle browser/ESP32 preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ---- ESP32 sends new sensor data ----
  if (req.method === "POST") {
    const d = req.body || {};

    state.latest = {
      water: Number(d.water) || 0,
      current: Number(d.current) || 0,
      motor: !!d.motor,
      fault: !!d.fault,
      checking: !!d.checking,
      runtime: d.runtime || "00:00:00",
      minWater: d.minWater !== undefined ? Number(d.minWater) : state.latest.minWater,
      maxWater: d.maxWater !== undefined ? Number(d.maxWater) : state.latest.maxWater,
      peakCurrent: d.peakCurrent !== undefined ? Number(d.peakCurrent) : state.latest.peakCurrent,
      health: d.health !== undefined ? Number(d.health) : (d.fault ? 60 : 100),
      updatedAt: Date.now()
    };

    console.log("ESP32 DATA:", state.latest);

    // Let the ESP32 know (in the same response) if a reset was requested
    // from the dashboard since its last POST.
    const wasResetRequested = state.resetRequested;
    state.resetRequested = false; // consume the flag once

    return res.status(200).json({
      success: true,
      message: "ESP32 data received",
      resetRequested: wasResetRequested,
      data: state.latest
    });
  }

  // ---- Dashboard polls for the latest data ----
  if (req.method === "GET") {
    return res.status(200).json(state.latest);
  }

  return res.status(405).json({ error: "Method not allowed" });
};
