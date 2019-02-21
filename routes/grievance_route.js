const express = require('express');
const Public = require('../models/public');
const Grievance = require('./../models/grievance');
const Escalaltion = require('./../models/escalation');
const GrievanceStatus = require('./../models/grievanceStatus');

const router = express.Router();
router.route('/status')
.post((req,res)=>{
    const{token,tokenPassWord}=req.body;
    Grievance.findOne({token:token})
    .then((greve)=>{
        if(!greve)
        {
            if(greve.tokenPassWord===tokenPassWord)
            {
                GrievanceStatus.findOne({grievanceId:greve.id}).then(
                    (st)=>{
                        //see
                        Escalaltion.findOne({grievanceId:token})
                        .then((es)=>{
                            console.log(st,greve,es);
                            res.status(200).json(st,greve,es);
                        })
                       
                    }
                )
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({message:'fail'});
                })
              
            }
        }
    })
    
    



});

module.exports = router;