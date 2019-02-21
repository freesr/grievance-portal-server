const express = require('express');
const Public = require('../models/public');
const Grievance = require('./../models/grievance');
const Escalaltion = require('./../models/escalation');
const GrievanceStatus = require('./../models/grievanceStatus');

const router = express.Router();
router.route('/status')
.post((req,res)=>{
    const{token,tokenPassword}=req.body;
    console.log('hii');
    Grievance.findOne({id:token})
    .then((greve)=>{
        if(greve!==null)
        {
            if(greve.tokenPassword===tokenPassword)
            {
                GrievanceStatus.findOne({grievanceId:greve.id}).then(
                    (st)=>{
                        //see
                        Escalaltion.findOne({grievanceId:token})
                        .then((es)=>{
                           /// const l={...greve,...st,...es};
                           //const l=Object.assign(greve,st,es);
                           const l={
                               a:greve,
                               b:st,
                               c:es.officerHierarchyStack[0]
                           }
                            console.log(l);
                            res.status(200).json(l);
                        })
                        .catch(err=>{
                            console.log(err);
                            res.status(500).json({message:'fail'});
                        });
                       
                    }
                )
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({message:'fail'});
                });
              
            }
            else{
                res.status(500).json({message:'token or password wrong'});
            }
        }
    })
    
    



});

module.exports = router;