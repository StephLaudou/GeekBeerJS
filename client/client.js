document.addEventListener("DOMContentLoaded", function() {



const getBeers = async function() {
	try{
		let response = await fetch ("/beers");
		if (response.ok) {
			let beers = await response.json()
			for (let beer of beers)
				console.log(beer.name)
				//createBeer(beer)
			}
		else {
			alert('Server response' , response.status)
		}	
	} catch (e) {
		alert(e)
	}

}


/*const createBeer = function(beer) {
			let list = document.querySelector(".liste")
			//Creation de la balise Item
			let item =  document.createElement("div");
			item.classList.add("item");
			list.appendChild(item);
			//Creation de la balise Image
			let img =  document.createElement("div");
			img.classList.add("element label");
			img.style["backgroundimage"] = "url(" + beer.label + ")";
			item.appendChild(img);
			//Creation de la balise label

			//Creation du bouton ajouter




}*/

getBeers();



/*
	let popupClose = document.querySelector(".popupClose");
	popupClose.addEventListener('click',closePopup)

document.querySelectorAll(".name").forEach(function(trigger){
	trigger.addEventListener('click',openPopup)
})

	
	let overlay = document.querySelector(".overlay");
	
	function openPopup (){
		overlay.style.display = 'block';
	}

	function closePopup (){
		overlay.style.display = 'none';
	}
*/

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