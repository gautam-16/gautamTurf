const express=require('express')
const{registerTurf, updateTurfOwner,updateTurfAdmin, deleteTurf, createPlayground,cancelPlayground,updatePlayground}=require('../controller/turf.Controller')
const {isAdmin,isMerchant}=require('../middlewares/auth')
const router=express.Router();
router.route('/registerturf').post(isMerchant,registerTurf)
router.route('/updateturf1/:id').put(isMerchant,updateTurfOwner)
router.route('/updateturf2/:id').put(isAdmin,updateTurfAdmin)
router.route('/deleteturf/:id').delete(isMerchant,deleteTurf)
router.route('/createplayground').post(isMerchant,createPlayground)
router.route('/updateplayground').put(isMerchant,updatePlayground)
router.route('/cancelplay/:id').put(isMerchant,cancelPlayground)
module.exports=router;