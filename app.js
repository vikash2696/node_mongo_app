var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");

//user service
var QuestionSchema = require('./service/questionService');


//Mongo DB credentials
var mongoose = require('mongoose');
//mean_app is database name
var MONGO_DB_URI = 'mongodb://127.0.0.1/user_question';
mongoose.connect(MONGO_DB_URI, {
    useMongoClient: true
});


var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

// Routes
app.get('/', function(req, res) {
	var title = 'Learning node';
	res.render('pages/index', {
		title : title
	});
});

app.get('/questions',function(req,res){
	
	QuestionSchema.find({},function(err,alluser){
		if(err) {
			return	res.status(404).send(err);
		}
		res.render('pages/question_answer', {
		title : alluser
	});
	}).sort({updated_at: -1});;
});

app.get('/register',function(req,res){
		res.render('pages/register', {
	});
});

app.get('/add_question',function(req,res){
		res.render('pages/question_form', {
	});
});


app.post('/question',function(req,res){
	// console.log(req.body.category);
	QuestionSchema.create({
		category: req.body.category,
		question: req.body.question,
		answer: req.body.answer,
		author:"vikash2696",
		status:'active'
	},function(err,savedquestion){
		if(err) {
			return	res.status(500).send({err:"Something Error!!!"});
		}
		return	res.status(200).json(savedquestion);
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
