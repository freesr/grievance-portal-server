const mongoose =require('mongoose');
const email = require('mongoose-type-email');
const PublicSchema=new mongoose.Schema({
  username:{
  type:String
  },
  gender:{
    type:String,
    enum:['male','female']
  },
  address:{
    type:String
  },
  state:{
      type:String,
      //enum:['telangana','uttarpradesh']
  },
  district:{
    type:String,
    enum:['kanpur','lucknow','hyderabad','rangareddy']
  },
  pincode:
  {
    type:Number,
    enum:[500081,500067,500011]
 
  },
  phoneNumber:
  {
    type:Number
 

  },
  email:{
 // type:mongoose.SchemaTypes.Email,
 type:String
  },
  password:{
    type:String
  }
 
 
 
});
const Public =mongoose.model('Public',PublicSchema);
module.exports=Public;
moldule.exports.raiseGrievance=(newGrievance,cb)=>{
    newGrievance.save(cb);
};