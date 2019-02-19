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
  district:{
    type:String,
    enum:['nalgonda','rangareddy','hyderabad']
  },
  pincode:
  {
    type:Number,
    enum:[500081,500067,500011]
 
  },
  phoneNumber:
  {
    type:String,
    default:username
  },
  email:{
  type:mongoose.SchemaTypes.email,
  },
  password:{
    type:String
  }
 
 
 
});
const Public =mongoose.model('Public',PublicSchema);
module.exports=Public;