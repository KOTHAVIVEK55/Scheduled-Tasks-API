const jwt = require("jsonwebtoken");

function verifyToken(req,res,next){
    const token=req.cookies?.token;
    if(!token){
        return res.status(401).json({message:"access denied"});
    }
    try{
        const d=jwt.verify(token,process.env.JWT_SECRET);
        req.user=d;
        next()
    }catch(error){
        return res.status(401).json({message:"expired or invalid token"});
    }
    
}
module.exports = verifyToken;
