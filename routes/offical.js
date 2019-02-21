const express=require('express');
const Escalaltion = require('./../models/escalation');
const GrievanceStatus = require('./../models/grievanceStatus');
const Districtofficer = require('./../models/districtofficer');
const Grievance = require('./../models/grievance');
const router = express.Router();


router.route('/login')
.post((req,res)=>{
    const {username,password}=req.body;
    


});
router.route('/allocatedGrievances')
.get((req,res)=>{
    //const username=req.body.username;
    const username='varun';
    
    console.log('allocatedGrievances');
    Escalaltion.find({officerHierarchyStack:{$in:[username]}})
    .then((escalationob)=>{
      if(escalationob.length!==0)
      {
        var ar =new Array();
        escalationob.forEach((escal,i)=>{
          GrievanceStatus.findOne({grievanceId:escal.grievanceId})
          .then((p)=>{
          if(p.status!=='cancelled')
          {
            Grievance.findOne({id:escal.grievanceId})
            .then((g)=>{
              const object2 = {grevob:g,statob:p};
              ar.push(object2);
              if(i==escalationob.length-1)
              {
                res.status(200).json(ar,);
              }
            }).catch((err)=>{
              console.log(err);
              res.status(500).json({message:'failure'});
            })

           
          }
          })
          .catch((err)=>{
            console.log(err);
            res.status(500).json({message:'failure'});
          })

        });
      }
      else{
        res.status(200).json({message:'no grievance found'});
      }
     

    })
    .catch((err)=>{
      console.log(err);
      res.status(500).json({message:'failure'});
    })





});
module.exports=router;