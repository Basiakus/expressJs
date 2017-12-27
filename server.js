const express = require('express');
const app = express();
let stringifyFile;
const fs = require('fs');
const bodyParser = require('body-parser');
let fileToObj;
app.use(bodyParser.json());

app.get('/getNote', function(req, res) {
	fs.readFile('./testJson.json', 'utf-8', function(err, data) {
		if(err) throw err;
		stringifyFile = data;
		res.send(data);
	});
});



app.post('/updateNote/:note', function(req, res) {
	fs.readFile('./testJson.json', 'utf-8', function(err, data) {
		if(err) throw err;
		fileToObj = JSON.parse(data);
		fileToObj.notes.push(req.params.note);
		stringifyFile = JSON.stringify(fileToObj);

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