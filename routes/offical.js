const express=require('express');
const Escalaltion = require('./../models/escalation');
const GrievanceStatus = require('./../models/grievanceStatus');
const Districtofficer = require('./../models/districtofficer');
const router = express.Router();


router.route('/login')
.post((req,res)=>{
    const {username,password}=req.body;
    


});
router.route('/allocatedGrievances')
.get((req,res)=>{
    const username=req.body.username;
    Escalaltion.find({officerHierarchyStack:{$in:[username]}})
    .then((escalationob)=>{
      //  if(GrievanceStatus.find)

    })





});
module.exports=router;