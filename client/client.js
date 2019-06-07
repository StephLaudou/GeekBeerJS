document.addEventListener("DOMContentLoaded", function() {
		// We’ll add a tile layer to add to our map, in this case it’s a OSM tile layer.
	 	// Creating a tile layer usually involves setting the URL template for the tile images
		var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
		osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		osm = L.tileLayer(osmUrl, {
				maxZoom: 18,
				attribution: osmAttrib
		});

		var map = L.map('mapid');
		var markerGroup = L.layerGroup().addTo(map);



				////////Initialisation de la liste des bières
				const getBeers = async function() {
					try{
						let response = await fetch ("/beers");
						if (response.ok) {
							let beers = await response.json()
								createBeer(beers);
							}
						else {
							alert('Server response' , response.status)
						}	
					} catch (e) {
						alert(e)
					}

				}

				function supprSelection(event){
					if (localStorage.getItem("listSelection")) {
						let currentJsonList = localStorage.getItem("listSelection");
						let currentObject = JSON.parse(currentJsonList);//on transforme en objet js
						let currentList = currentObject.liste;
						for (var b in currentList) {
							if (currentList[b][0].id == event.target.id) {
								currentList.splice(b,1);
								localStorage.setItem("listSelection", JSON.stringify(currentObject));
								refreshSelection();
								break;
							}
						}

					}
				}

				function refreshSelection(){
					//Suppression de la liste existante
					let element = document.querySelector(".selectionPerso");
					element.innerHTML='<h2 class="titreSel">My selection</h2>';
					/*
					while (element.hasChildNodes()) {
						element.removeChild(element.firstChild);
				 	}
					*/
					let currentJsonList = localStorage.getItem("listSelection");
					let currentObject = JSON.parse(currentJsonList);//on transforme en objet js
					let currentList = currentObject.liste;
					for (var b in currentList) {
						let sel = document.querySelector(".selectionPerso")
						//Creation de la balise Item
						let item =  document.createElement("div");
						item.classList.add("item");
						sel.appendChild(item);
						//Creation de la balise Image
						let img =  document.createElement("div");
						img.classList.add("element");
						img.classList.add("labelSel");
						if (currentList[b][0].labels && currentList[b][0].labels.medium) {
							img.style.backgroundImage = "url(" + currentList[b][0].labels.icon + ")";
						} 
						else {
							img.style.backgroundImage = "url(images/beer-mug-icon.png)";
						}
						item.appendChild(img);
						//Creation de la balise Name
						let name =  document.createElement("div");
						name.classList.add("element");
						name.classList.add("name");
						name.id = currentList[b][0].id;
						name.innerHTML = currentList[b][0].name;
						item.appendChild(name);
						//Creation de la balise Supprimer
						let suppr =  document.createElement("div");
						suppr.classList.add("suppr");
						suppr.classList.add("element");
						suppr.id = currentList[b][0].id;
						suppr.innerHTML = "-";
						item.appendChild(suppr);
						suppr.addEventListener('click', supprSelection)

					}	

				}
				
				async function selectionStorage(event){
							if(typeof localStorage!='undefined') {
								let beerToAdd = await getBeersById(event.target.id);
								if (localStorage.getItem("listSelection")) {
									let currentJsonList = localStorage.getItem("listSelection");
									let currentObject = JSON.parse(currentJsonList);//on transforme en objet js
									let currentList = currentObject.liste;
									let alreadyAdded = false;
									for (var b in currentList) {
										if (currentList[b][0].id == beerToAdd[0].id) {
											alreadyAdded = true;
										}
									}

										if (!alreadyAdded && currentList.length < 6) {
											currentList.push(beerToAdd);
											localStorage.setItem("listSelection", JSON.stringify(currentObject));
										}
										else (
											alert("Sorry, You have reached the maximum number of selected beers")
											)
								} else {
									let newObject = {
										liste : [ beerToAdd ] 
									};
									localStorage.setItem("listSelection", JSON.stringify(newObject))
								}
								refreshSelection()
							} else {
								alert("localStorage n'est pas supporté");
							}
					}	

			const createBeer = function(beers) {
			beers.forEach(function (beer) {
				let list = document.querySelector(".liste")
					//Creation de la balise Item
					let item =  document.createElement("div");
					item.classList.add("item");
					list.appendChild(item);
					//Creation de la balise Image
					let img =  document.createElement("div");
					img.classList.add("element");
					img.classList.add("label");
					if (beer.labels && beer.labels.medium) {
						img.style.backgroundImage = "url(" + beer.labels.medium + ")";
					} 
					else {
						img.style.backgroundImage = "url(images/beer-mug-icon.png)";
					}
					item.appendChild(img);
					//Creation de la balise Name
					let name =  document.createElement("div");
					name.classList.add("element");
					name.classList.add("name");
					name.id = beer.id;
					name.innerHTML = beer.name;
					item.appendChild(name);
					//Creation de la balise Ajouter
					let add =  document.createElement("div");
					add.classList.add("add");
					add.classList.add("element");
					add.id = beer.id;
					add.innerHTML = "+";
					item.appendChild(add);	
				})
					//Ajout du trigger pour la popup
					document.querySelectorAll(".name").forEach(function(trigger){
					trigger.addEventListener('click',openPopup)
					})

					//Ajout du trigger pour les favoris
					document.querySelectorAll(".add").forEach(function(trigger){
						trigger.addEventListener('click',selectionStorage)
					})
			}

			////////////////////////// Mise à jour des info de la popup
			const getBeersById = async function(id) {
				try{
					let response = await fetch ("/BeersById?id="+id);
					if (response.ok) {
							return await response.json();
						}
					else {
						alert('Server response' , response.status)
					}	
				} catch (e) {
					alert(e)
				}
			}

				async function openPopup (event){
						let beerToDisplay = await getBeersById(event.target.id);
						document.querySelector(".popupName").innerText = beerToDisplay[0].name;
						document.querySelector(".popupDesc").innerText = beerToDisplay[0].description;
						document.querySelector(".popupCreated").innerText = beerToDisplay[0].createDate;
						if (beerToDisplay[0].style && beerToDisplay[0].style.category && beerToDisplay[0].style.category.name) {
							document.querySelector(".popupCateg").innerText = beerToDisplay[0].style.category.name;
						}
						if (beerToDisplay[0].breweries[0] && beerToDisplay[0].breweries[0].locations[0] && beerToDisplay[0].breweries[0].locations[0].countryIsoCode) {
							document.querySelector(".popupCountry").innerText = beerToDisplay[0].breweries[0].locations[0].countryIsoCode;
						}
						document.querySelector(".popupIBU").innerText = beerToDisplay[0].ibu;
						document.querySelector(".popupABV").innerText = beerToDisplay[0].abv;
												
						overlay.style.display = 'block';

						// initialize the map on the "map" div with a given center and zoom
						map.setView([37.090240, -95.712891], 3).addLayer(osm);
						
						var lat = beerToDisplay[0].breweries[0].locations[0].latitude;
						var long = beerToDisplay[0].breweries[0].locations[0].longitude;
						var marker = L.marker([lat,long]).addTo(map);
						marker.addTo(markerGroup);

				}
			
			
			
				//////////////////////////////////// Remplissage des options
				const getSearchOption = async function() {
							try{
								let response = await fetch ("/options");
								if (response.ok) {
									let options = await response.json()
									options.forEach(function(option,index) {
											let select = document.getElementById("categorySearch");
											let newOption =  document.createElement("option");
											newOption.setAttribute("value",option);
											newOption.innerText = option;
											select.appendChild(newOption);
									})
							}
							else {
								alert('Server response' , response.status)
							}	
						} catch (e) {
							alert(e)
						}
				}




			////////////////////////////////////Paramétrage bouton Search
			const getBeerSearch = async function(name,categ,organic) {
				try{
					let response = await fetch ("/BeersSearch?name="+name+"&&category="+categ+"&&isOrganic="+organic);
					if (response.ok) {
							return await response.json();
						}
					else {
						alert('Server response' , response.status)
					}
				} catch (e) {
					alert(e)
				}
			}




			function setSearchButton() {
				document.querySelector(".searchButton").addEventListener('click', async function(){
					let beerSearch = document.getElementById("beerSearch").value;
					let select = document.getElementById("categorySearch");
					let selectedCategory= select.options[select.selectedIndex].value;
					let isOrganic = document.getElementById("organicSearch");

					if (beerSearch == "") {
						beerSearch = "undefined"
					}
					if (isOrganic.checked){
						isOrganic = "Y"
					} else {
						isOrganic = "undefined"
					}

					//let beerFetched = await getBeerSearch("Anniversary","British Origin Ales","N");
					let beerFetched = await getBeerSearch(beerSearch,selectedCategory,isOrganic);
					console.log(beerFetched);

					//Suppression de la liste existante
					let element = document.querySelector(".liste")
					while (element.hasChildNodes()) {
						element.removeChild(element.firstChild);
				 	}
					
					createBeer(beerFetched);



				})

			}

		/*//////////////////LANCEMENT*/
		getBeers();
		getSearchOption();
		setSearchButton();
		refreshSelection();

		
		


		function closePopup (){
			overlay.style.display = 'none';
			markerGroup.clearLayers();
		}

		

		



		let popupClose = document.querySelector(".popupClose");
		popupClose.addEventListener('click',closePopup)		
		let overlay = document.querySelector(".overlay");
			
			


})


//FETCH ORIGINE
/*fetch("/beers")
		.then(response => response.json())
		.then(beers => {
			for (let beer of beers)
				console.log(beer.name)
		})*/

		/*DOC MOZILLA
var myList = document.querySelector('ul');

var myRequest = new Request('products.json');

fetch(myRequest)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    for (var i = 0; i < data.products.length; i++) {
      var listItem = document.createElement('li');
      listItem.innerHTML = '<strong>' + data.products[i].Name + '</strong> can be found in ' +
                           data.products[i].Location +
                           '. Cost: <strong>£' + data.products[i].Price + '</strong>';
      myList.appendChild(listItem);
    }
	});*/
	
/*GRAFIKART
7:45
try if resposne.ok else console response.status
catch (e)

*/

/* OCR
ajaxGet("http://localhost/javascript-web-srv/data/films.json", function (reponse) {
    // Transforme la réponse en tableau d'objets JavaScript
    var films = JSON.parse(reponse);
    // Affiche le titre de chaque film
    films.forEach(function (film) {
        console.log(film.titre);
    })
});*/