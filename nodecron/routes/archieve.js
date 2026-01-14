const express=require('express');
const router=express.Router();


const {afterValidation,downloadArchivedSessions}=require('../controllers/archieve');


router.get("/", (req, res) => {
  res.render("archieve");  
});

router.get("/file", downloadArchivedSessions);




module.exports=router;

