const cron = require("node-cron");
const { verifySession } = require("../services/session");

cron.schedule("0 */6 * * *",async () => {
  try {
    const result = await verifySession();
    console.log("🧪 Session cleanup:", result);
  } catch (err) {
    console.error("❌ Session cleanup failed:", err.message);
  }
});
