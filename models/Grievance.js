const mongoose =require('mongoose');
const email = require('mongoose-type-email');
const Enumeration = require('./enumeration');
const GrievanceSchema=new mongoose.Schema({
    id:{
        type:String,
        //default:Date.now
    },
    username:{
        type:String
    },
    name:{
        type:String
    },
    country:{
       // type:String
    },
    address:{
        type:String
    },
    gender: {
        type: String,
        enum: Enumeration.Gender,
       // required: true
    },
    state: {
        type: String,
        enum: Enumeration.State,
        required: true
    },
    district: {
        type: String,
        enum: Enumeration.District,
       // required: true
    },
    pincode: {
        type: String,
        enum: Enumeration.Pincode,
     //   required: true
    },
   token:{
       type:String
   },
  
   email: {
    type: mongoose.SchemaTypes.Email,
   // required: true
},
    
phoneNumber: {
    type: String,
   // required: true
},
    description:{
        type:String
    },
    department:{
        type:String
    },
    attachments:{
        type:[{String}]
    },
    tokenPassword:{
        type:String
    }

},{timestamps:true});
const Grievance =mongoose.model('Grievance',GrievanceSchema);
module.exports=Grievance;

module.exports.raiseGrievance=async (newGrievance)=>{
    try{
        const newGrievanceobj =await newGrievance.save();
        console.log('grievance succesfully saved');
        return newGrievanceobj;
    }
    catch(err){
        console.log(`Following error occurred while creating new user : ${err}`);
        throw err;
    }

    
};