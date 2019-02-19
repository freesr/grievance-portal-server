const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');
const Public=require('./../models/Public');
const Grievance =require('./../models/Grievance');
const Districtofficer=require('./../model/Districtofficer');
const Escalation =require('./../models/Escalation');
const GrievanceStatus=require('./../models/GrievanceStatus');


//Public registration process
router.route('/public/register')
    .post((req, res) => {
        console.log('Trigered post request on public/register');
        const {username,gender,address,country,state,district,pincode,phoneNumber,email,password}=req.body;
       Public.findOne({
           username:username
        }).then((user)=>{
            if(user)
            {
                console.log('username alredy existed');
                res.status(500).json({message:'username alredy existed'});
            }
            else{
                const newuser =new Public({
username,
gender,
address,
country,
state,
district,
pincode,
phoneNumber,
email,
password
                });
                newuser.save()
                .then((user)=>{
                    console.log('succesfully sevaed');
                    res.status(200).json({message:'success '});
                })
                .catch(err=> 
                    console.log('error in saving into db'+err)
                    );
            }

        })
        res.status(200);
    });

//Public login process
router.route('/public/login')
    .post((req, res) => {
        console.log('Trigered post request on public/login');
        const {username,password}=req.body;
        Public.find({username:username})
        .then((user)=>{
            console.log(user);
            if(user.length==0)
            {
                res.status(500).json({message:'username or password wrong1'});
            }
            else{
              //  console.log(user+password);
                if(user[0].password===password)
                {
                    res.status(200).json({message:'success'},/* jwt*/ );
                }
                else{
                    res.status(500).json({message:'username or password wrong'});
                }
            }
        })
        .catch(err=>{
            console.log(`error is ${err}`);
        });
       // res.status(200).json({message:'ok'});
    });
    router.route('/public/newGrievance')
    .post((req,res)=>{
        console.log('Trigered post request on public/newGrievance');
        const {username,name,country,address,gender,state,district,pincode,token,email,phoneNumber,description,department,attachments}=req.body;
        const newgrievance =new Grievance({
            username,
            name,
            country,
            address,
            gender,
            state,
            district,
            pincode,
            token,
            email,
            phoneNumber,
            description,
            department,
            attachments

        });
        newgrievance.id=Date.now();
        newgrievance.token=newgrievance.id;
        newgrievance.tokenPassword=username.substring(0,4);
        raiseGrievance(newgrievance,(err,newgrievance)=>{
            if(err)
            {
                throw err;
            }
            else{
                Districtofficer.findOne({district:district})
                .then((officer)=>{
                    if(officer.length>0)
                    {
                        Escalation.findOne({grievanceId:newgrievance.id})
                        .then((esclationobj)=>{
                            if(esclationobj!=0)
                            {
                                const Escalationvar  =new Escalation({
                                    grievanceId:newgrievance.id,
                                    officerHierarchyStack:officer.username,
                                    escalationStack:Date.now()
        
                                }).save()
                                .then()
                                .catch();
                            }
                        })
                        .catch(err=>{
                            console.log('err');
                        })
                        
                    }
                })
                .catch(err=>{
                    console.log('err');
                })

            }
        });

    })

module.exports = router;