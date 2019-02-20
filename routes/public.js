const express = require('express');
const Public = require('../models/public');
const Grievance = require('../models/grievance');
const Escalation = require('../models/escalation');
const GrievanceStatus = require('./../models/grievanceStatus');
const router = express.Router();


//Public registration process
router.route('/register')
    .post((req, res) => {
        const username = req.body.phoneNumber;
        const {
            gender,
            address,
            country,
            state,
            district,
            pincode,
            phoneNumber,
            email,
            password
        } = req.body;

        const public = new Public({
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

        Public.createPublicUser(public)
            .then(user => {
                console.log(user);
                res.status(200).json({
                    message: `success`
                });
            }).catch(err => {
                res.status(500).json({
                    message: `username/password already exists`
                });
            })
    });

router.route('/login')
    .post((req, res) => {
        console.log(`Trigered post request on "public/login"`);
        res.status(200).json({
            message: `successful`
        });
    });
router.route('/public/newGrievance')
    .post((req, res) => {
        let grievance_var;
        console.log('Trigered post request on public/newGrievance');
        const {
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
        } = req.body;
        const newgrievance = new Grievance({
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
        newgrievance.id = Date.now();
        newgrievance.token = newgrievance.id;
        newgrievance.tokenPassword = username.substring(0, 4);
        Grievance.raiseGrievance(newgrievance)
            .then((newGrievanceobj) => {
                console.log(newGrievanceobj);
                grievance_var=newGrievanceobj.id;
                Districtofficer.findOne({
                        districtName: newGrievanceobj.district
                    })
                    .then((officer) => {
                        console.log(officer);
                        if (officer.length > 0) {
                            //Escalation.findOne({grievanceId:newgrievance.id})
                            // .then((esclationobj)=>{
                            //  if(!esclationobj)
                            // {
                            const Escalationvar = new Escalation({
                                grievanceId: newgrievance.id,
                                officerHierarchyStack: officer.username,
                                escalationStack: Date.now()

                            });
                            Escalation.escalate(Escalationvar)
                                .then((esclationobj) => {
                                    console.log(esclationobj);
                                    /*send notification*/
                                    const gs = new GrievanceStatus({
                                        submittedtime: newGrievanceobj.id

                                    });
                                    Grievance.setStatus(gs)
                                        .then((statusobj) => {
                                            console.log(statusobj);
                                            

                                        })
                                        .catch(err => {
                                            res.status(500).json({
                                                message: `status not updated`
                                            });

                                        });


                                })
                                .catch(err => {
                                    res.status(500).json({
                                        message: `not escalated`
                                    });

                                });



                        } else {
                            console.log('no officer found');
                            res.status(500).json({
                                message: `no officer found`
                            });


                        }
                    })
                    .catch(err => {
                        console.log('err' + 'offercer cat');
                    });



            })
            .catch(err => {
                console.log('err' + 'grivence catch');
            });
            ((grievance_var)=>{
                setTimeout((grievance_var)=>{
                if(checkStatus(grievance_var))
                {
            //
                }
                else{
            //next level
                }    
            
                },5000);
            
            })();


    });
//         if(err)
//         {
//             console.log(`error is ${err}`)
//             throw err;
//         }
//         else{


//         }
//     });

// })


module.exports = router;






