
const { generateReport } = require("../services/report");

async function getDailySummary(req, res) {
  try {
    const report = await generateReport();
     res.render("report", report);
  } catch (err) {
    console.error("Daily summary error:", err);
    res.status(500).json({ message: "Failed to generate daily summary" });
  }
}

module.exports = {
  getDailySummary
};
