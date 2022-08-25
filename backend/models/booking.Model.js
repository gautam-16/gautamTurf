const mongoose=require('mongoose')
const User=require('../models/user.Model')
const Turf=require('../models/turf.Model')


const bookingSchema= new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    turfname:{type:String},
    createdat:{type:Date,default:Date.now()},
    playground_details:{type:mongoose.Schema.Types.ObjectId,ref:'playground'},
    location:{type:String,ref:'Turf'},
    playground_slot:{type:mongoose.Schema.Types.Date,ref:'playground'},
    booking_cost:{type:Number,ref:"Turf"},
    booking_status:{type:Boolean,required:[true,"confimed booking"]},
    payment_status:{type:String,default:"Pending"}

})





module.exports=mongoose.model('Booking',bookingSchema)