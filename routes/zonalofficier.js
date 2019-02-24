const express =require('express');
const ZonalOfficer=require('./../models/zonalOfficer');
const District=require('./../models/district');
const Grievance = require('./../models/grievance');
const GrievanceStatus = require('./../models/grievanceStatus');
const router = express.Router();

router.route('/')
.get((req,res)=>{
    const id=8328513712;
    const ar=new Array();
    ZonalOfficer.find({username:id}).select('zoneName')
    .then((zone)=>{
        console.log('zone'+zone);
        District.find({zoneName:zone.zoneName})
        .then((dists)=>{
            console.log(dists+'d');
            dists.forEach((dist)=>{
                Grievance.find({district:dist.districtName})
                .then((p)=>{
                    console.log('p'+p);
                    GrievanceStatus.findOne({grievanceId:p.id})
                    .then((l)=>{
                        console.log('l'+l);
                        ar.push(Object.assign(l,p))
                    })
                })
            })
                        
           })
           .catch((err)=>{
               console.log(err);
               res.status(500).json({message:'failure'})
           });

        
        
    })
    .catch((err)=>{
        console.log(err);
    })


})


module.exports = router;