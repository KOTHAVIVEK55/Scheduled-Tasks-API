const db=require('../models/session');
const User = require('../models/user');

async function generateReport(){

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
    const totalUsers = await User.countDocuments({});
    const usersCreatedToday = await User.countDocuments({
        createdAt: { $gte: startOfToday,
            $lt: startOfTomorrow
         }
    });

    const totalSessions=await db.countDocuments({});
    const expiredSessions=await db.countDocuments({isExpired:true});
    const activeSessions=totalSessions-expiredSessions;


     return {
    date: new Date().toISOString().split("T")[0],
    totalUsers,
    usersCreatedToday,
    activeSessions,
    expiredSessions,
    generatedAt: new Date()
  };



}



module.exports={
    generateReport,
}