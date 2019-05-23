document.addEventListener("DOMContentLoaded", function() {

fetch("/test")
		.then(response => response.json() ) //--- on ne met pas au format JSON mais on recupere une reposne http qui com,ntient plein de chose et on en ectrait la partie json //--- equiv function(response){return response.json} JE METS LA RESPONSE SANS UNE VARIBLE notes
		.then(notes => {
			console.log("json");
		})


})