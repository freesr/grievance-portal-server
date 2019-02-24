const express=require('express');
const Escalaltion = require('./../models/escalation');
const GrievanceStatus = require('./../models/grievanceStatus');
const Districtofficer = require('./../models/districtofficer');
const Grievance = require('./../models/grievance');
const GrievanceResolution=require('./../models/grievanceresolation');
const router = express.Router();


router.route('/login')
.post((req,res)=>{
    const {username,password}=req.body;
    


});

// router
//   .route('/allocatedGrievances')
//     .get( (req, res) => {
//       const username = 'varun';

//       const escalationDoc = await (async function(){
//         try {
//           Escalaltion.find( { officerHierarchyStack: { $in: [username] } } ).exec()
//         } catch(err) {

//         }
        
//       })();

//     })

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


    
    router.route('/updateGrievanceStatus')
    .put((req,res)=>{
      console.log('put');
      const grievanceId=req.query.grievanceId;
      const status=req.query.status;
     // console.log(status);
      if(status=='scrutinized')
      {
        GrievanceStatus.updateOne({grievanceId:grievanceId},{status:'scrutinized',scrutinizedTime:Date.now()})
        .then((o)=>{
          console.log('hii');
         console.log(o);
          res.status(200).json({message:'success'});
  
        })
        .catch((err)=>{
         console.log(err);
          res.status(500).json({message:'failure'});
        });
      }
      if(status=='accepted'){
        GrievanceStatus.updateOne({grievanceId:grievanceId},{status:'inProgress',inProgressTime:Date.now()})
        .then((o)=>{
          console.log('hii1');
          console.log(o);
          res.status(200).json({message:'success'});
  
        })
        .catch((err)=>{
          console.log(err);
          res.status(500).json({message:'failure'});
        });

      }
      
      
      
    });
    router.route('/updateGrievanceStatus')
    .post((req,res)=>{
      const{grievanceId,Description,attachments}=req.body;
      console.log(grievanceId)
      const gr=new GrievanceResolution({
        grievanceId,Description,attachments

      });
      gr.save()
      .then((l)=>{
        GrievanceStatus.updateOne({grievanceId:grievanceId},{status:'rejected',rejectedTime:Date.now()})
        .then((i)=>{
          console.log(l);
          res.status(200).json({message:'success'});
        })
        .catch((err)=>{
          console.log(err);
          res.status(500).json({message:'failure'});
         })
       
      })
      .catch((err)=>{
        console.log(err);
        res.status(500).json({message:'failure'});
       })
     
    });

    router.route('/updateGrievanceStatus1')
    .post((req,res)=>{
      const{grievanceId,Description,attachments}=req.body;
      console.log(grievanceId)
      const gr=new GrievanceResolution({
        grievanceId,Description,attachments

      });
      gr.save()
      .then((l)=>{
        GrievanceStatus.updateOne({grievanceId:grievanceId},{status:'resloved',reslovedTime:Date.now()})
        .then((i)=>{
          console.log(l);
          res.status(200).json({message:'success'});
        })
        .catch((err)=>{
          console.log(err);
          res.status(500).json({message:'failure'});
         })
       
      })
      .catch((err)=>{
        console.log(err);
        res.status(500).json({message:'failure'});
       })
     
    });


    


    



module.exports=router;