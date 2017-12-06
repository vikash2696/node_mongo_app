var express = require('express');
var app = express();

//user service
var Users = require('./service/userService');


//Mongo DB credentials
var mongoose = require('mongoose');
//mean_app is database name
var MONGO_DB_URI = 'mongodb://127.0.0.1/mean_app';
mongoose.connect(MONGO_DB_URI, {
    useMongoClient: true
});

//On root 
app.get('/',function(req,res){
	return res.send("Welocme to hello world of Nodejslllllllllllllll");
});


app.get('/users',function(req,res){
	console.log("get all users");	
	Users.find({},function(err,alluser){
		if(err) {
			return	res.status(404).send(err);
		}
		return	res.status(200).json(alluser);
	});
});

//Mongo connection success message
mongoose.connection.on('connected', function() {
    console.log('app is connected to mongodb ', MONGO_DB_URI);
});

mongoose.connection.on('error', err => {
    console.log('error while connecting to mongoose ', err);
});

app.listen('3015', function() {
    console.log('App is running on PORT 3015');
});
