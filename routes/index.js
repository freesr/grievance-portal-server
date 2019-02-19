const express = require('express');
const router = express.Router();

//Public registration process
router.route('/public/register')
    .post((req, res) => {
        console.log('Trigered post request on public/register');
        res.status(200);
    });

//Public login process
router.route('/public/login')
    .post((req, res) => {
        console.log('Trigered post request on public/login');
        res.status(200);
    });

module.exports = router;