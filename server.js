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
  
		//TESTS QUERY MONGODB
		/*beersDb.collection("data").find({"labels.medium":{$exists:true}}).limit(10).toArray(function(err,result){
  		console.log(result)
  		console.log(err)
  	})*/


  	/*beersDb.collection("data").find({"name" : "11.5° PLATO"}).toArray(function(err,result){
  		console.log(result)
  		console.log(err)
  	})*/
  	/*var cursor = beersDb.collection("data").find({"name" : "11.5° PLATO"},{"name":1}) //PROJECTION NE MARCHE PAS
  	cursor.each(function(err, doc) {

        console.log(doc);

    });*/

});




app.get("/", function (req,res){	
	res.sendFile(__dirname + "/html/index.html");
	
});

app.get("/beers", function (req,res){	
	//console.log("beers")
	beersDb.collection("data").find({"labels.medium":{$exists:true}}).limit(10).toArray(function(err,result){
		res.json(result)
  	})

});

app.get("/BeersById", function (req,res){	
	console.log("getBeersById")
	if (req.query.id) {
		console.log(req.query.id)
		beersDb.collection("data").find({"id":req.query.id}).toArray(function(err,result){
			res.json(result)
			})
	} else 
	console.log("error")

	

});

app.listen(8080);




/*app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});*/

/* SANS EXPRESS
var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
server.listen(8080);*/
