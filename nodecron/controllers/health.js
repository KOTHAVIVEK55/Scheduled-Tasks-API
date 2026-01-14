const { report } = require("../services/health");

async function healthroute(req, res) {
  try {
    const r = await report();
    res.json(r);
  } catch (error) {
    res.status(500).json({ message: "error in checking db health" });
  }
}

module.exports = { healthroute };
