const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser=require("body-parser");

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
})

const app = express()
app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(express.static('pulib'));
app.use(bodyParser.urlencoded({
	extended: true
}));

const users = []

app.get('/users', (req, res) => {
	res.json(users)
})

//Register
app.post('/users', async (req, res) => {
	console.log("It's working!");
	try{
		var name = req.body.name;
		var email = req.body.email;
		var pass = req.body.password;

		const hashedPassword = await bcrypt.hash(pass, 10)
		var data = { 
			"name": name, 
			"email":email, 
			"password":hashedPassword
		} 
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
	const user = users.find(user => user.name = req.body.name)
	if(user == null){
		return res.status(400).send('Cannot find user')
	}
	try{
		if (await bcrypt.compare(req.body.password, user.password)){
			res.send('Success')
		}
		else{
			res.send('Not Allowed')
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

