const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

async function connectToDatabase() {
    try {
        const connection = await mongoose.connect('mongodb://localhost:27017/dippGrievanceDB',{useNewUrlParser:true});
        console.log(`connection established successfully`);
        return connection;
    } catch (err) {
        console.log(`connection was uncessfull`);
    }
};

connectToDatabase().then(() => {
    //using body-parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //call auth() function 


    const index = require('./routes/index');
    app.use('/', index);

    const public = require('./routes/public');
    const grievance1=require('./routes/grievance_route');
    const official=require('./routes/offical');
    const zonalofficier=require('./routes/zonalofficier');
    app.use('/public', public);
    app.use('/grievance',grievance1);
    app.use('/official',official);
    app.use('/zonal',zonalofficier);
});

module.exports = app;