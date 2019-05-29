document.addEventListener("DOMContentLoaded", function() {



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
					img.style.backgroundImage = "url(" + beer.labels.medium + ")";
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
					add.classList.add("element");
					add.innerHTML = "Bouton Ajouter";
					item.appendChild(add);	
				})
					//Ajout du trigger pour la popup
					document.querySelectorAll(".name").forEach(function(trigger){
					trigger.addEventListener('click',openPopup)
					})
			}


			const getBeersById = async function(id) {
				try{
					let response = await fetch ("/BeersById?id="+id);
					if (response.ok) {
						//let beers = await response.json()
							//console.log(beers);
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
				//console.log(event.target.id);
				let beerToDisplay = await getBeersById(event.target.id);
				//console.log(beerToDisplay[0].name);
				document.querySelector(".popupName").innerText = beerToDisplay[0].name;
				document.querySelector(".popupDesc").innerText = beerToDisplay[0].description;
				document.querySelector(".popupCreated").innerText = beerToDisplay[0].createDate;
				document.querySelector(".popupCateg").innerText = beerToDisplay[0].style.category.name;
				document.querySelector(".popupCountry").innerText = beerToDisplay[0].breweries[0].locations[0].countryIsoCode;
				document.querySelector(".popupIBU").innerText = beerToDisplay[0].ibu;
				document.querySelector(".popupABV").innerText = beerToDisplay[0].abv;
				
				overlay.style.display = 'block';
		
			}

		getBeers();

	

		function closePopup (){
			overlay.style.display = 'none';
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