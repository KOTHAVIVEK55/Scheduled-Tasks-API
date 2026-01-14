const express=require("express");
const router=express.Router();
const verifyToken=require('./middleware/auth');
const { getDailySummary } = require("./controllers/generatereport");

router.get("/login",(req,res)=>{
    res.render("login");
});

router.get("/signup",(req,res)=>{
    res.render("signup");
});

router.get("/home",verifyToken,(req,res)=>{
    res.render("home");
});

router.get("/delete-users", verifyToken, (req, res) => {
  res.render("staleusers", { result: null });
});


router.get("/cleanup-session",verifyToken,(req,res)=>{
    res.render("sessioncleanup");
});


router.get("/dailyreport", getDailySummary);

router.get("/health", verifyToken, (req, res) => {
  res.render("health");
});


module.exports=router;
