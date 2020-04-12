const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
// const jwt = require('jsonwebtoken');
// const db = config.get('mongoURI');

//Register
router.post('/users', async (req, res) => {
    try {
        //Retrieve data from HTML form
        var name = req.body.name;
        var email = req.body.email;
        var pass = req.body.password;
        var pass2 = req.body.password2;
        if (pass2 != pass) res.send("passwords don't match");
        if (name == "" || email == "" || pass == "") res.send("Please enter a value for every field");
        //Hash password and store in data object
        const hashedPassword = await bcrypt.hash(pass, 10)
        var data = {
            "name": name,
            "email": email,
            "password": hashedPassword
        }

        //If a user with this email already exists, do not register!
        let duplicate = await db.collection('users').findOne({ email: email });
        if (duplicate != null) {
            res.send("Account with email already registered.");
        }
        else {

        }

        //redirect upon registration
        //res.redirect('./discoverPage/discoverPage.html');

        db.collection('users').insertOne(data, function (err, collection) {
            if (err) throw err;
            console.log("Record inserted Successfully");
        });
        res.status(201).send()
    } catch{
        res.status(500).send()
    }
});

//Login
router.post('/users/login', async (req, res) => {
    //Find user from database, then compare passwords
    let user = await db.collection("users").findOne({ email: req.body.email });
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        //If login is successful, then redirect to discover page
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.redirect('/discoverPage/discoverPage.html');
        }
    }
    catch{
        res.status(500).send()
    }
});

module.exports = router;