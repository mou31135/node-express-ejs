var express = require('express');
var multer = require('multer');
var fs = require('fs');
var pathModule = require('path')

var upload = multer();

var app = express();
app.use(multer({dest:__dirname+'/uploads/'}).any());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.post('/upload', function(req, res) {
    var readerStream = fs.createReadStream(req.files[0].path);
    var dest_file = pathModule.join(req.files[0].destination, req.files[0].originalname);
    var writerStream = fs.createWriteStream(dest_file);

    var stream = readerStream.pipe(writerStream);
    stream.on('finish', function(){
        fs.unlink(req.files[0].path);
	res.send('<h1>Sussess</h1>');
    });
});

app.listen(5555, function() {
    console.log('App running on port 5555');
});