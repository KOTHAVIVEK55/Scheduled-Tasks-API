const express=require('express');
const router=express.Router();

const {runSessionCleanup}=require('../controllers/cleanup');


const {previewStaleUsers,
  runCleanupJob}=require('../controllers/staleusers');


router.get('/preview',previewStaleUsers);

router.post('/clean',runCleanupJob);
router.post("/run", runSessionCleanup);

module.exports=router;