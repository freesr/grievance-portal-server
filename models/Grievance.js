const mongoose =require('mongoose');
const email = require('mongoose-type-email');
const GrievanceSchema=new mongoose.Schema({
    id:{
        type:String,
        default:Date.now
    },
    username:{
        type:String
    },
    name:{
        type:String
    },
    country:{
        type:String
    },
    address:{
        type:String
    },
    gender:{
       type:String,
       enum: ['male','femal']
    },
    disrict:{
        type:String,
         enum:['nalgonda','rangareddy','hyderabad']
    },
    pincode: {
    type:Number,
    enum:[500081,500067,500011]
 
   },
   token:{
       type:String
   },
   email:mongoose.SchemaTypes.email,
    
    phoneNumber:{
        type:Number,
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