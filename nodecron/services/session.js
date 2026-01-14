const Session = require("../models/session");

async function verifySession() {
  const now = new Date();

  const scannedSessions = await Session.countDocuments({});

  const r = await Session.updateMany(
    {
      isExpired: false,
      expiresAt: { $lt: now }
    },
    {
      $set: { isExpired: true }
    }
  );

  return {
    scannedSessions,
    expiredSessionsFound: r.matchedCount,
    expiredSessionsMarked: r.modifiedCount
  };
}

module.exports = {
  verifySession,
};
