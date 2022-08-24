const express=require('express')
const{registerTurf}=require('../controller/turf.Controller')
const {isAdmin,isMerchant}=require('../middlewares/auth')
const router=express.Router();
router.route('/registerturf').post(isMerchant,registerTurf)

module.exports=router;