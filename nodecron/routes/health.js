const {healthroute}=require('../controllers/health');
const {getEndpointsHealth}=require('../controllers/endpoints');

const express=require('express');
const router=express.Router();

router.get('/',healthroute);
router.get('/endpoints',getEndpointsHealth);

module.exports=router;
