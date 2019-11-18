const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser=require("body-parser");

//Set up connection to mongodb database
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
})
//Setting up express
const app = express()
app.use(express.static(__dirname));


app.use(bodyParser.json());
app.use(express.static('pulib'));
app.use(bodyParser.urlencoded({
	extended: true
}));

//Register
app.post('/users', async (req, res) => {
	try{
		//Retrieve data from HTML form
		var name = req.body.name;
		var email = req.body.email;
		var pass = req.body.password;
		var pass2 = req.body.password2;
		if(pass2 != pass) res.send("passwords don't match");
		if(name == "" || email == "" || pass == "") res.send("Please enter a value for every field");
		//Hash password and store in data object
		const hashedPassword = await bcrypt.hash(pass, 10)
		var data = { 
			"name": name, 
			"email":email, 
			"password":hashedPassword
		} 
	//If a user with this email already exists, do not register!
	let duplicate = await db.collection('details').findOne({email:email});
	if (duplicate != null){
		//alert("Account with email already registered.");
		res.redirect("index.html");
	}
	else{
		
	}

	//redirect upon registration
	res.redirect('discoverPage/discoverPage.html'); 

	db.collection('details').insertOne(data,function(err, collection){ 
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
	let user = await db.collection("details").findOne({email: req.body.email});
	if(user == null){
		return res.status(400).send('Cannot find user')
	}
	try{
		//If login is successful, then redirect to discover page
		if (await bcrypt.compare(req.body.password, user.password)){
			res.redirect('/discoverPage/discoverPage.html');
		}
	}
	catch{
		res.status(500).send()
	}
})

app.get('/',function(req,res){ 
	res.set({ 
		'Access-control-Allow-Origin': '*'
		}); 
	return res.redirect('landingPage.html'); 
	}).listen(3000) 

