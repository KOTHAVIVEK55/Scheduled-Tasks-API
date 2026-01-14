const stale_days=30;
const db=require('../models/user');
function calculateStale(){
    return new Date(
      Date.now() - 1*60*1000
    )
}

async function verifyStale(){
    const cuttoff=calculateStale();
    return await db.find({
        isDeleted:false,
        $or:[
            {lastlogin:{$lt:cuttoff}},

            {
                lastlogin:null,
                createdAt:{$lt:cuttoff}
            }
        ]
    })
}



async function evaluate(){
    const cuttoff=calculateStale();
    const f1=await db.find({isDeleted:false});
    return f1.map(user=>{
        const active=user.lastlogin?user.lastlogin:user.createdAt;
        const isStale=active<cuttoff;
        return{
            id:user._id,
            email:user.email,
            username:user.username,
            lastlogin:user.lastlogin,
            status:isStale?"Stale":"Active"
        }
    });
}

async function softDeleteStaleUsers() {
  const cutoff = calculateStale();

  // 🔹 Get stale users FIRST (for UI)
  const staleUsers = await db.find({
    isDeleted: false,
    $or: [
      { lastlogin: { $lt: cutoff } },
      { lastlogin: null, createdAt: { $lt: cutoff } }
    ]
  }).select("username email");

  const scannedUsers = await db.countDocuments({});

  // 🔹 Then delete
  const result = await db.updateMany(
    {
      isDeleted: false,
      $or: [
        { lastlogin: { $lt: cutoff } },
        { lastlogin: null, createdAt: { $lt: cutoff } }
      ]
    },
    { $set: { isDeleted: true } }
  );

  return {
    scannedUsers,
    staleUsersFound: staleUsers.length,
    deletedUsers: result.modifiedCount,
    staleUsers   
  };
}










module.exports={
    calculateStale,
    stale_days,
    verifyStale,
    evaluate,
    softDeleteStaleUsers
}