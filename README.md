# GeekBeerJS
School Project using JS

----INSTALLATION
Installer mongodb
Cr�er le dbpath si besoin /data/bd 
(D:\DIMArchive\MongoDBData\data\db dans mon cas)
npm install express 
npm install mongodb


-----LANCEMENT
Lancer le serveur MongoDB
Cr�er un repertoire de stockage de BDD : Mongod --dbpath "D:\DIMArchive\MongoDBData\data\db"

-----IMPORT DE LA BASE DE DONNEES DANS MONGODB
Lancer le client Mongo
Importer les donn�es dans la base depuis un fichier json : mongoimport --jsonArray -d beers --file D:\DIMArchive\WEB\GeekBeerJS\data.json

