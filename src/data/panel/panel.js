var nameElement = document.getElementById("name");
var pictureElement = document.getElementById("picture");
var loadingElement = document.getElementById("loading-message");

var hiddenElements = {}

var revert = function () {
	showElement(loadingElement);
}

var hideElement = function(element) {
	hiddenElements[element] = element.style;
	element.style.visibility = "hidden";
}

var showElement = function(element) {
	element.style = hiddenElements[element];
}

self.port.on("analysisFinished", function (cocktail) {
	hideElement(loadingElement);
	if (cocktail) {
		nameElement.innerHTML = cocktail.name;
		pictureElement.src = cocktail.picture;
	}
});

self.port.on("hide", function() {
	revert();
});
