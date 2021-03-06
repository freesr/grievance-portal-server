const mongoose = require('mongoose');
const Enumeration = require('./enumeration');

const districtSchema = new mongoose.Schema({
    districtName: {
        type: String,
        enum: Enumeration.District,
        required: true
    },
    zoneName: {
        type: String,
        enum: Enumeration.Zone,
        required: true
    }
});

const District = mongoose.model('District', districtSchema);
module.exports = District;