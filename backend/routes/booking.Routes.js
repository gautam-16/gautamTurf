const express=require('express');
const { createBooking } = require('../controller/booking.Controller');
const { isAuthenticated } = require('../middlewares/auth');
const router=express.Router();
router.route('/createbooking').post(isAuthenticated,createBooking)






module.exports=router;

