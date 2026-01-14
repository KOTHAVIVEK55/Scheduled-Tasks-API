const {calculateStale,
    stale_days,
    verifyStale,
    evaluate,
    softDeleteStaleUsers}=require('../services/staleusers');


const {verifySession}=require('../services/session');



async function previewStaleUsers(req, res) {
  try {
    const users = await evaluate();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Preview failed" });
  }
}




async function runCleanupJob(req, res) {
  try {
    const result = await softDeleteStaleUsers();
    res.json({
      scannedUsers: result.scannedUsers,
      staleUsersFound: result.staleUsersFound,
      deletedUsers: result.deletedUsers,
      staleUsers: result.staleUsers,
      executedAt: new Date()
    });
  } catch (err) {
    res.status(500).json({ message: "Cleanup failed" });
  }
}















module.exports = {
  previewStaleUsers,
  runCleanupJob
};