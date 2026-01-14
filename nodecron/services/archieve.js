const s=require('../models/session');

const Session = require("../models/session");

async function validateLogs() {
  const cutoff = new Date(
    Date.now() - 30 *24* 60 *60* 1000
  );

  const logs = await Session.find({
    $or: [
      { lastLogin: { $lt: cutoff } },

      { lastLogin: null, createdAt: { $lt: cutoff } }
    ]
  });

  return {
    archivedCount: logs.length,
    logs
  };
}

module.exports = { validateLogs };




module.exports={
    validateLogs,
};