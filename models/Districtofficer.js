const mongoose =require('mongoose');
//const email = require('mongoose-type-email');
const PublicSchema=new mongoose.Schema({
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