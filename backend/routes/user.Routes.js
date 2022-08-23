const express=require('express');
const{register,loginUser,logout,updateRole,getUser, getUserDetails, updateUserProfile, deleteUserProfile,getAllUsers, forgotPassword, resetPassword, updatePassword}=require('../controller/user.Controller')

const{isAuthenticated,isAdmin,isMerchant}=require('../middlewares/auth')
const router=express.Router();
router.route('/register').post(register)
router.route('/loginuser').post(loginUser)
router.route('/updateRole').put(updateRole)
router.route('/getuserdetails/:id').post(isAuthenticated,getUserDetails)
router.route('/update/:id').put(isAuthenticated,updateUserProfile)
router.route('/delete/:id').delete(isAuthenticated,deleteUserProfile)
router.route('/allusers').get(isAuthenticated,getAllUsers)
router.route('/forgot/password').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route("/updatepass").put(isAuthenticated,updatePassword)
module.exports=router;

