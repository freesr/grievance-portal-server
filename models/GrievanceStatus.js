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