var express = require('express');
var app = express();

/*app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});*/

app.use("/css", express.static(__dirname +"/css"))
app.use("/js", express.static(__dirname +"/client"))

app.get("/", function (req,res){	
	res.sendFile(__dirname + "/html/index.html");
});

app.listen(8080);






/* SANS EXPRESS
var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
server.listen(8080);*/
