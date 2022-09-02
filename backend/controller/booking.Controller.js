const Booking = require('../models/booking.Model')
const User = require('../models/user.Model')
const Turf = require('../models/turf.Model')
const Playground = require('../models/playground.Model')
const { findOne } = require('../models/user.Model')




exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, { $set: req.body })
        return res.status(200).json({ success: true, message: "Booking Updated successfully." })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}
exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        console.log(booking)
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" })
        }
        res.status(200).json({ success: true, booking })

    } catch (error) {

    }
}
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id, { $set: { 'booking_status': req.body.booking_status } })
        console.log(booking)

        res.status(200).json({ success: true, booking })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }

}

 
exports.createBooking=async(req,res)=>{
    try {
        // const currentTime = new Date();
        const { user_id, turfname, createdat, playground_id, location,
            booking_cost, booking_status, payment_status,st,et} = req.body;
            //if playground.slot is empty
          let turf =await Turf.findOne({turfname})

          const startTime = new Date(req.body.st);
          const endTime = new Date(req.body.et)
          let turfsTime=new Date(turf.hoursopen.ot)
          let turfeTime=new Date(turf.hoursopen.ct)

          const cond11 =  startTime.getTime()>turfsTime.getTime() && startTime.getTime()<turfeTime.getTime();

          const cond22 =  endTime.getTime()>turfsTime.getTime() && endTime.getTime()<turfeTime.getTime();
       if (cond11 && cond22) {
       

        booking = await Booking.findOne().where(req.body.st).where(req.body.et);
        //console.log(booking)
        let playground = await Playground.findOne({ playground_id });
    
        if (playground.slot == 0) {
            console.log('hello')
            let booking = await Booking.create({
                user_id, turfname, createdat, playground_id, location,
                booking_cost, booking_status, payment_status, st, et
            })
            obj = { st: req.body.st, et: req.body.et}
            playground.slot.push(obj)
            await playground.save()
            return res.status(200).json({ success: true, booking });
        }

        //if playground.slot is not empty
        let flag=0;
        if (playground.slot != 0) {
            //console.log('hello1')
            for (a of playground.slot){
                console.log('hello not empty')
            //    console.log( a.st );
            const start=new Date(a.st)
            const end= new Date(a.et)

        
                if (start.getTime() == startTime.getTime() || endTime.getTime() == end.getTime()) {
                    return res.status(400).json({ success: false, message: 'already exists' })
                }
              
                const cond1 =  startTime.getTime()< start.getTime() && endTime.getTime() < start.getTime();
                const cond2 = startTime.getTime()>end.getTime()&& startTime.getTime()>end.getTime();
                if (cond1 || cond2){
                
                    flag=1;
                
                }else{
                    flag=0;
                    break;
                }
            }}

if(flag==1){
    console.log('found condition to create booking');

    let booking = await Booking.create({
        user_id, turfname, createdat, playground_id, location,
        booking_cost, booking_status, payment_status, st, et
    })
    obj = { st: req.body.st, et: req.body.et}
    playground.slot.push(obj)
    await playground.save()
    return res.status(200).json({ success: true, booking })

}
else{
return res.status(400).json({ success: false, message: "cannot create booking"});}
       }
    return res.status(400).json({success:false,
        message:"cannot create booking.exceeds turf opening/closing time."})
 } 
    catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }
}