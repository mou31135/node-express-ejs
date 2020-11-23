var app = require('express')();
var users = require('./users');
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
    database: "ecom"
});

con.connect(function(err) {
	if (err) throw err;
	  console.log("Connected!");

})

var port = process.env.PORT || 7777;

app.get('/',  (req, res) => {
	con.query("SELECT * FROM users",(err, result, fields)=>{
		if (!err)
		res.send(result);
		else
		console.log(err);
	})
});

app.get('/index', function (req, res) {
    res.send('<h1>This is indexw page</h1>');
});

app.get('/listen', function (req, res) {
    res.send('<h1>This is listen page</h1>');
});

app.get('/user', function (req, res) {
    res.json(users.findAll());
});

app.get('/user/:id', function (req, res) {
	var id = req.params.id;
	res.json(users.findById(id));
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});