# GeekBeerJS
School Project using JS

----INSTALLATION
Installer mongodb / cr�er la variable d'environnement si n�cessaire pour pouvoir lancer le programme
Cr�er un repertoire de stockage de BDD si un dossier /data/bd n'a pas �t� g�n�r� � la racine du disque
npm install express 
npm install mongodb


-----LANCEMENT
Lancer le serveur MongoDB avec la commande mongod (--dbpath inutile si dossier cr�� � la racine):  "Mongod --dbpath "D:\DIMArchive\MongoDBData\data\db"
Lancer le client Mongo 
Importer les donn�es dans la base depuis un fichier json : "mongoimport --jsonArray -d beers --file D:\DIMArchive\WEB\GeekBeerJS\data.json"
=> cela cr�e automatiquement une base beers et une collection data
Utiliser la commande "show dbs" pour v�rifier
Lancer node sur le r�pertoire du projet  : "node server.js"
Lancer la page sur un navigateur: http://localhost:8080/

