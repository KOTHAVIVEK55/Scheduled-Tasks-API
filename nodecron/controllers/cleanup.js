const {verifySession}=require('../services/session');


async function runSessionCleanup(req, res) {
  try {
    const result = await verifySession();
    res.json({
      scannedSessions: result.scannedSessions,
      expiredSessionsFound: result.expiredSessionsFound,
      expiredSessionsMarked: result.expiredSessionsMarked,
      executedAt: new Date()
    });
  } catch (err) {
    res.status(500).json({ message: "Session cleanup failed" });
  }
}



module.exports={
    runSessionCleanup,
}

