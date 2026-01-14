const { validateLogs } = require('../services/archieve');
const cron = require("node-cron");

cron.schedule("* 2 * * *", async () => {
  try {
    console.log("[CRON] Archive logs job started");

    const result = await validateLogs();

    console.log(
      `[CRON] Archive logs completed. Archived: ${result.archivedCount}`
    );
  } catch (error) {
    console.error("[CRON] Archive logs failed:", error);
  }
});
