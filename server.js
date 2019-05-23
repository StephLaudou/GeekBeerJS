var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

app.use("/css", express.static(__dirname +"/css"))
app.use("/js", express.static(__dirname +"/client"))


//Connexion à la base de données
let beersDb = null;
MongoClient.connect(url, function(error, databases) {
	if (error) throw error;
	beersDb = databases.db("beers");
  
  	//TEST
  	//beersDb.collection("data").find({"name" : "11.5° PLATO"}).toArray(function(err,result){
  		//console.log(result)
  	//})


});


/*app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});*/

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
