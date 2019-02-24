const mongoose =require('mongoose');
const EscalaltionSchema=new mongoose.Schema({
grievanceId:{
    type:String

},
officerHierarchyStack: {
    type:[String]
},
escalationStack:{
    type:[String]
}
});




const Escalaltion=mongoose.model('Escalaltion',EscalaltionSchema);
module.exports=Escalaltion;

module.exports.esclate=async (Escalationvar)=>{
    try{
        const Escalteobj =await Escalationvar.save();
        console.log('grievance succesfully saved');
        return Escalteobj;
    }
    catch(err){
        console.log(`Following error occurred while cescaltion : ${err}`);
        throw err;
    }

    
};