
// Used to promisify callback functions
const util = require('util');

//Set up connection to mongodb database
const mongoose = require('mongoose');

// API
const http = require('http');
const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require("body-parser");

const config = require('config');
const url = config.get('mongoURI');
// Connect to Mongo
mongoose
	.connect(url, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
	console.log("connection succeeded");
})

//Setting up express
const app = express()
app.use(express.static(__dirname));
app.use(express.static('pulib'));
app.use(bodyParser.urlencoded({
	extended: true
}));

// Import routes
//app.use('/auth.js', require('./routes/auth.js'));

//Register
app.post('/users', async (req, res) => {
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
		res.redirect('/newDiscoverPage/index.html');

		db.collection('users').insertOne(data, function (err, collection) {
			if (err) throw err;
			console.log("Record inserted Successfully");
		});
		res.status(201).send()
	} catch{
		res.status(500).send()
	}
})

//Login
app.post('/users/login', async (req, res) => {
	//Find user from database, then compare passwords
	let user = await db.collection("users").findOne({ email: req.body.email });
	if (user == null) {
		return res.status(400).send('Cannot find user')
	}
	try {
		//If login is successful, then redirect to discover page
		if (await bcrypt.compare(req.body.password, user.password)) {
			res.redirect('/newDiscoverPage/index.html');
		}
	}
	catch{
		res.status(500).send()
	}
})

app.get('/', function (req, res) {
	res.set({
		'Access-control-Allow-Origin': '*'
	});
	return res.redirect('index.html');
}).listen(3001, '0.0.0.0', function () {
	console.log("Server running");
})

