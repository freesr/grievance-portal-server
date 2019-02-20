const mongoose=require('mongoose');
const GrievanceStatusSchema =new mongoose.Schema({
    grievanceId:{
        type:String
    },
    Staus:{
        type:String
    },
    scrutinizedTime:{
        type:String
    },
    rejectedTime:{
        type:String
    },
    resolvedTime:{
        type:String
    },
    inProgressTime:{
        type:String
    },
    submittedtime:{
        type:String
    },
    cancelledTime:{
        type:String
    }
});
const GrievanceStatus = mongoose.model('Grievancestatus',GrievanceStatusSchema);
module.exports=GrievanceStatus;

module.exports.setStatus=async (gs)=>{
    try{
        const statusobj =await gs.save();
        console.log('grievance succesfully saved');
        return statusbj;
    }
    catch(err){
        console.log(`Following error occurred while updating status : ${err}`);
        throw err;
    }

};
module.exports.checkstatus=((grievance)=>{
    GrievanceStatus.find({grievanceId:grievance})
    .then((obj)=>{
        if(obj.scrutinizedTime!==null)
        {
            return true;
        }
        else{
            return false;
        }
    })
    .catch(err=>{
        console.log(err);
        return err;
        //see here
    })

});

