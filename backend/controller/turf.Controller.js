const Turf=require('../models/turf.Model')

exports.registerTurf=async(req,res)=>{
    try {
        const{turfname,owner,hoursopen,managers}=req.body;
        console.log(req.body)
        let turf= await Turf.findOne({turfname})
        if(!turf){
           const turf=await Turf.create({turfname,owner,hoursopen,managers});

            return res.status(200).json({success:true,message:`Successfully registerd turf:${turfname}`,turf})
        }
        return res.status(401).json({success:false,message:'turf already exists'})
        
    } catch (error) {
return res.status(500).json({success:false,message:error.message})
    }
}