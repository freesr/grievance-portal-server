const mongoose =require('mongoose');
const EscalaltionSchema=new mongoose.Schema({
grievanceId:{
    type:String

},
officerHierarchyStack: {
    type:[string]
},
escalationStack:{
    type:[String]
}
});
const Escalaltion=mongoose.model('Escalaltion',EscalaltionSchema);
module.exports=Escalaltion;