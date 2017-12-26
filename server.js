var express = require('express');
var app = express();
var stringifyFile;
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/getNote', function(req, res) {
	fs.readFile('./testJson.json', 'utf-8', function(err, data) {
		if(err) throw err;
		stringifyFile = data
		res.send(data);
	});
});
app.post('/getNotes/:note', function(req, res) {
	fs.readFile('./testJson.json', 'utf-8', function(err, data) {
		if(err) throw err;
		stringifyFile = data + req.params.note
		fs.writeFile('./testJson.json', stringifyFile, function(err, data) {
			if(err) throw err;
			res.send(stringifyFile);
			console.log('file updated');
		});
	});
});
//odp 404 od serwera
app.use(function(req, res, next) {
	res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});
//nasłuchiwanie localhost 
app.listen(3000);