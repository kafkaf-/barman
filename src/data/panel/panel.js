var closeElem = document.getElementById("close");
var nameE = document.getElementById("name");
var pictureE = document.getElementById("picture");
var loadingElem = document.getElementById("loading-message");

var revert = function () {
	loadingElem.style.visibility = "visible";
}

closeElem.addEventListener('click', function (event) {
	self.port.emit("hide-request");
});

self.port.on("analysisFinished", function (cocktail) {
	loadingElem.style.visibility = "hidden";
	if (cocktail) {
		nameE.innerHTML = cocktail.name;
		pictureE.src = cocktail.picture;
	}
});

self.port.on("hide", function() {
	revert();
});
