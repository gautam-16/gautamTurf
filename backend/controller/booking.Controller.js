const Booking=require('../models/booking.Model')
const User=require('../models/user.Model')
const Turf=require('../models/turf.Model')
const Playground=require('../models/playground.Model')
const { findOne } = require('../models/user.Model')



//exports.createBooking=async(req,res)=>{
//     try {
//         const{turfname,user_id,location,booking_cost,booking_status,payment_status}=req.body;
//         const turf= await Turf.findOne({turfname})
//         if(!turf){
//             return res.status(404).json({success:false,message:"turf not found"})
//         }
//         const booking= await Booking.create({user_id,booking_cost,booking_status,
//             payment_status,location})
//             if(booking){
//                 return res.status(404).json({success:false,message:"booking already exists"})
//             }
//             turf.bookings.push(booking)
//             console.log(turf)
//         return res.status(200).json({success:true,message:"Booked successfully"})
//     } catch (error) {
//         return res.status(500).json({success:false,message:error.message})
        
//     }

 //}
exports.updateBooking=async(req,res)=>{
    try {
        const booking=await Booking.findByIdAndUpdate(req.params.id,{$set:req.body})
        return res.status(200).json({success:true,message:"Booking Updated successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }
}
exports.getBooking=async(req,res)=>{
    try {
        const booking=await Booking.findById(req.params.id)
        console.log(booking)
        if(!booking){
            return res.status(404).json({success:false,message:"Booking not found"})
        }
        res.status(200).json({success:true,booking})
        
    } catch (error) {
        
    }
}
exports.cancelBooking=async(req,res)=>{
    try {
        const booking=await Booking.findById(req.params.id)
        console.log(booking)

        res.status(200).json({success:true,})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}



exports.createBooking=async(req,res)=>{
    try {
        const{user_id,turfname,createdat,playground_id,location,
            booking_cost,booking_status,payment_status,st,et,date}=req.body;
        let playground= await Playground.findOne({playground_id});
        booking= await Booking.findOne().where(req.body.st).where(req.body.et);
                if(playground.slot==0){
                    console.log('hello')
                let booking= await Booking.create({user_id,turfname,createdat,playground_id,location,
                booking_cost,booking_status,payment_status,st,et,date})
                obj={st:req.body.st,et:req.body.et,date:req.body.date}
                playground.slot.push(obj)
                await playground.save()
                return res.status(200).json({success:true,booking});}
                //
                for (a of playground.slot){
                if(playground.slot!=0){
                if(a.date==req.body.date){
                if(a.st==req.body.st||a.et==req.body.et){
                    return res.status(400).json({success:false,message:'already exists'})}
        
                        //checking time slot conditions
                    if(a.st<req.body.st&&a.et<req.body.st||a.st>req.body.st&&a.et>req.body.st){
                        console.log('hello1')
                        let booking= await Booking.create({user_id,turfname,createdat,playground_id,location,
                            booking_cost,booking_status,payment_status,st,et,date})
                            obj={st:req.body.st,et:req.body.et,date:req.body.date}
                            playground.slot.push(obj)
                            await playground.save()
                            return res.status(200).json({success:true,booking})}
                            
            
                if(a.st==req.body.st||a.et==req.body.et){
                    return res.status(400).json({success:false,message:'already exists'})}
                        //checking time slot conditions
                    if(a.st<req.body.st&&a.et<req.body.st||a.st>req.body.st&&a.et>req.body.st){
                        let booking= await Booking.create({user_id,turfname,createdat,playground_id,location,
                            booking_cost,booking_status,payment_status,st,et,date})
                            obj={st:req.body.st,et:req.body.et,date:req.body.date}
                            playground.slot.push(obj)
                            await playground.save()
                            return res.status(200).json({success:true,booking})}
    
    
                            return res.status(400).json({success:false,message:"cannot create booking"})
    
            }}
        }}
     catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }
    }