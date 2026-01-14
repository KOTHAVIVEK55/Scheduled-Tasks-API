const cron = require("node-cron");
const { softDeleteStaleUsers } = require("../services/staleusers");

cron.schedule("0 12 * * *", async () => {
  try {
    console.log("🕑 Cron started: Stale user cleanup");

    const result = await softDeleteStaleUsers();

    console.log("✅ Cron completed:", {
      scannedUsers: result.scannedUsers,
      staleUsersFound: result.staleUsersFound,
      deletedUsers: result.deletedUsers,
      time: new Date().toLocaleString()
    });

  } catch (error) {
    console.error("❌ Cron failed:", error.message);
  }
});

