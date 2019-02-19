const mongoose =require('mongoose');
//const email = require('mongoose-type-email');
const DistrictofficerSchema=new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    districtName:{
        type:String,
        enum:['kanpur','lucknow','hyderabad','rangareddy']
    },
    fullName:{
        type:String
    }

},{timestamps:true});
const Districtofficer=mongoose.model('Districtofficer',DistrictofficerSchema);
module.exports=Districtofficer;