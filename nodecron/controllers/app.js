const mongoose=require('mongoose');
const userSchema=require('../models/user');
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");
const Session = require("../models/session");

async function createUser(req,res){
    try{
        const {username,email,password}=req.body;
        const doesesists=await userSchema.findOne({
            $or:[{username},{email}],
        });
        if(doesesists){
            return res.status(409).json({message:"user already exists"});
        }
        const hp=await bcrypt.hash(password,10);
        const creatingUser=new userSchema({
            username:username,
            email:email,
            password:hp
        })
        await creatingUser.save();
        return res.redirect("/login");
    }catch(error){
        return res.status(500).json({message:"user creation failed"});
    }

}



async function login(req, res) {
    try {
        const { email, password } = req.body;

        const exists = await userSchema.findOne({ email });
        if (!exists) {
            return res.status(404).json({ message: "invalid credentials" });
        }

        const cp = await bcrypt.compare(password, exists.password);
        if (!cp) {
            return res.status(404).json({ message: "invalid credentials" });
        }

        exists.lastlogin = new Date();
        await exists.save();

        const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

        await Session.create({
            userId: exists._id,
            expiresAt: new Date(Date.now() + SESSION_DURATION_MS)
        });

        const token = jwt.sign(
            { id: exists._id, email: exists.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: SESSION_DURATION_MS
        });

        return res.redirect("/home");

    } catch (error) {
        console.error("error:", error);
        return res.status(500).json({ message: "error", error: error.message });
    }
}



module.exports={
    createUser,
    login
}