const cron = require("node-cron");
const { generateReport } = require("../services/report");

/*
  CRON FORMAT:
  ┌──────── minute (0 - 59)
  │ ┌────── hour (0 - 23)
  │ │ ┌──── day of month (1 - 31)
  │ │ │ ┌── month (1 - 12)
  │ │ │ │ ┌─ day of week (0 - 6)
  │ │ │ │ │
  │ │ │ │ │
  0 0 * * *  => Every day at 12:00 AM
*/

cron.schedule("0 0 * * *", async () => {
  try {
    const report = await generateReport();

    console.log("📊 Daily Report Generated:");
    console.log(report);

    // OPTIONAL (later):
    // save report to DB
    // send email
    // write to file

  } catch (err) {
    console.error("❌ Daily report cron failed:", err);
  }
});

console.log("🕒 Daily report cron scheduled");