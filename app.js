const  express = require('express');
const  app = express();
const  mysql = require('mysql');
var bodyParser = require('body-parser');
const  con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	 database: "ecom"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})
/* var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
    database: "ecom"
});

con.connect(function(err) {
	if (err) throw err;
}) */

app.set('view engine','ejs');
app.use(express.static(__dirname + '/views'));

var obj = {};
app.get('/',function(req,res){
	con.query( 'SELECT * FROM ecom_category  ', function(err, result1) {
		if(err){
            throw err;
			} else {
			con.query( 'SELECT * FROM  ecom_product', function(err, result2) {
				if(err){
					throw err;
					} else {
					res.render('index', { rows : result1, rows2: result2 });
				}
			})
		}
	})
});
app.get('/shop',function(req,res){
	con.query( 'SELECT * FROM ecom_category  ', function(err, result1) {
		if(err){
						throw err;
			} else {
			con.query( 'SELECT * FROM  ecom_product', function(err, result2) {
				if(err){
					throw err;
					} else {
					res.render('shop', { category : result1, product: result2 });
				}
			})
		}
	})
});
app.get('/shop/:id/:page',function(req,res, next){
	const catid = req.params.id;
	const resPerPage = 4;
	const page = req.params.page || 1;
	con.query( 'SELECT * FROM ecom_category  ', function(err, result1) {
		if(err){
						throw err;
			} else {
			con.query( 'SELECT * FROM  ecom_product WHERE CatId=' + mysql.escape(catid), function(err, result2) {
				if(err){
					throw err;
					} else {
					res.render('shop', { category : result1, product: result2 });
				}
			})
		}
	})
});
app.get('/shop/:id/',function(req,res, next){
	const catid = req.params.id;
	const resPerPage = 4;
	con.query( 'SELECT * FROM ecom_category  ', function(err, result1) {
		if(err){
						throw err;
			} else {
			con.query( 'SELECT * FROM  ecom_product WHERE CatId=' + mysql.escape(catid), function(err, result2) {
				if(err){
					throw err;
					} else {
					res.render('shop', { category : result1, product: result2 });
				}
			})
		}
	})
});
app.get('/detail/:id',function(req,res){
	var ProductId = req.params.id;
			con.query( 'SELECT * FROM  ecom_product WHERE ProductId=' + mysql.escape(ProductId), function(err, product) {
				if(err){
					throw err;
					} else {
					res.render('product-details', {  product: product });
				}
			})

});
app.listen(8081);
