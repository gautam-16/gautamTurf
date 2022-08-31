const mongoose=require('mongoose')

const playgroundSchema= new mongoose.Schema({
    turf_id:{type:mongoose.Schema.Types.ObjectId,ref:'Turf',required:true},
    slot:[{st:{type:Number},et:{type:Number},date:{type:Number}}],
    playground_name:{type:String,required:true},
    managers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    playground_status:{type:String,default:'Unoccupied',required:true}
});

module.exports= mongoose.model('Playground',playgroundSchema)