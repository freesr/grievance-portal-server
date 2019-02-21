const express = require('express');
const Public = require('./../models/public');
const Grievance = require('./../models/grievance');
const Escalaltion = require('./../models/escalation');
const GrievanceStatus = require('./../models/grievanceStatus');
const Districtofficer = require('./../models/districtofficer');
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
router.route('/newGrievance')
    .post((req, res) => {
        //  const grievance_var;
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
                // grievance_var = newGrievanceobj.id;
                Districtofficer.findOne({
                        districtName: newGrievanceobj.district
                    })
                    .then((officer) => {
                        console.log(officer);
                        if (officer !== null) {
                            //Escalation.findOne({grievanceId:newgrievance.id})
                            // .then((esclationobj)=>{
                            //  if(!esclationobj)
                            // {
                            const Escalationvar = new Escalaltion({
                                grievanceId: newgrievance.id,
                                officerHierarchyStack: officer.username,
                                escalationStack: Date.now()

                            });
                            Escalaltion.esclate(Escalationvar)
                                .then((esclationobj) => {
                                    console.log(esclationobj);
                                    /*send notification*/
                                    const gs = new GrievanceStatus({
                                        grievanceId: newGrievanceobj.id,
                                        submittedtime: newGrievanceobj.id,
                                        status: 'submitted'

                                    });
                                    GrievanceStatus.setStatus(gs)
                                        .then((statusobj) => {
                                            console.log(statusobj);
                                            res.status(200).json({
                                                message: 'succesful'
                                            });


                                        })
                                        .catch(err => {
                                            res.status(500).json({
                                                message: `status not updated`
                                            });

                                        });


                                })
                                .catch(err => {
                                    console.log(err);
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
                        console.log(err + 'offercer cat');
                    });



            })
            .catch(err => {
                console.log(err + 'grivence catch');
            });
        // ((grievance_var)=>{
        //     setTimeout((grievance_var)=>{
        //     if(checkStatus(grievance_var))
        //     {


        // //
        //     }
        //     else{
        // //next level
        //     }    

        //     },5000);

        // })();


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

router.route('/cancelGrievance')
    .get((req, res) => {
        console.log('cancel request');
        const id = req.query.token;
        console.log(id);
        Grievance.findOne({
                id: id
            })
            .then((obj) => {
                console.log(obj);
                if (obj !== null) {
                    GrievanceStatus.findOne({
                            grievanceId: obj.id
                        })
                        .then((statusob) => {
                            console.log(statusob);
                            if (statusob.status === 'submitted') {
                                GrievanceStatus.updateOne({
                                            grievanceId: obj.id
                                        }, {
                                            cancelledTime: Date.now(),
                                            status: 'cancelled'
                                        }


                                    )
                                    .then((cancelledstatus) => {
                                        console.log(cancelledstatus);

                                        res.status(200).json({
                                            message: 'success'
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(500).json({
                                            message: 'failure'
                                        });
                                    });
                            } else {
                                res.status(500).json({
                                    message: 'cant cancelled'
                                });

                            }
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                message: 'failure'
                            });
                        });
                } else {
                    console.log('no id found');
                    res.status(500).json({
                        message: 'no grievance found'

                    });
                }




            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'failure'
                });
            });
    });
router.route('/submittedGrievences')
    .get((req, res) => {
        var username = 8790;
        Grievance.find({
                username: username
            })
            
            .then((grievancearray) => {
                if (grievancearray.length > 0) {
                    const arr=new Array();
                 //   for (let i = 0; i < grievancearray.length; i++)
                    grievancearray.forEach((grievance,i)=> {
                        arr[i] = new Array();
                        arr[i][0] = (grievancearray[i]);
                        GrievanceStatus.findOne({
                                grievanceId: grievancearray[i].id
                            })
                            .then((prom1) => {
                             //   console.log(prom1);
                                   //  if(prom1)
                                {
                                    arr[i][1] = (prom1);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                res.state(500).json({
                                    message: 'error'
                                });
                            })
                        Escalaltion.findOne({
                                grievanceId: grievancearray[i].id
                            })
                            .then((prom2) => {
                               console.log(prom2);
                                //  if(!prom2)
                                {
                                    arr[i][2] = (prom2);
                                }
                                if(i==grievancearray.length-1)
                                {
                                    console.log(arr);
                                    res.status(200).send(arr);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                res.state(500).json({
                                    message: 'error'
                                });
                            })
                        // let a='key'+i;




                    });
                  //  console.log(arr);
                   
                }
            })
    })



module.exports = router;