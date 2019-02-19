const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/dippGrievanceDB');
        console.log('connection established successfully');
    } catch (err) {
        console.log('connection was uncessfull');
        throw err;
    }
}

connectToDatabase().then(() => {
    //using body-parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //call auth() function 


    const index = require('./routes/index');
    app.use('/', index);
}).catch((err)=>{
    console.log(err);
})

module.exports = app;