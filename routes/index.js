const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');
const Public=require('./../models/Public');
const Grievance =require('./../models/Grievance');
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

module.exports = router;