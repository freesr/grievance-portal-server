const mongoose = require('mongoose');

const Resolutionschema = new mongoose.Schema({
    grievanceId: {
        type: String
    },
    Description: {
        type: String
    },
    attachments: {
        type: [String]
    }


});
const GrievanceResolution=mongoose.model('GrievanceResolution',Resolutionschema);
module.exports=GrievanceResolution;