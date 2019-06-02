# GeekBeerJS
School Project using JS

----INSTALLATION
Installer mongodb / créer la variable d'environnement si nécessaire pour pouvoir lancer le programme
Créer un repertoire de stockage de BDD si un dossier /data/bd n'a pas été généré à la racine du disque
npm install express 
npm install mongodb


-----LANCEMENT
Lancer le serveur MongoDB avec la commande mongod (--dbpath inutile si dossier créé à la racine):  "Mongod --dbpath "D:\DIMArchive\MongoDBData\data\db"
Lancer le client Mongo 
Importer les données dans la base depuis un fichier json : "mongoimport --jsonArray -d beers --file D:\DIMArchive\WEB\GeekBeerJS\data.json"
=> cela crée automatiquement une base beers et une collection data
Utiliser la commande "show dbs" pour vérifier
Lancer node sur le répertoire du projet  : "node server.js"
Lancer la page sur un navigateur: http://localhost:8080/

-----PRINCIPES DU SITE
Le but du site est de rechercher des bières, d'afficher leurs caractéristiques (Popup) et de les ajouter à une liste de sélection (par exemple, faire la liste des bières que je voudrais tester)
Les bières proposées viennent de l'API https://www.brewerydb.com/ (=> fichier data.json)
La liste de selection est stockée dans le Local Storage.
=> site en vanilla js, et basé sur nodejs.


