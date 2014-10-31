var nameElement = document.getElementById("name");
var pictureElement = document.getElementById("picture");
var loadingElement = document.getElementById("loading-message");
var ingredientsElement = document.getElementById("ingredients");

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

var setIngredientList = function(ingredients) {
	while(ingredientsElement.firstChild) {
		ingredientsElement.removeChild(ingredientsElement.firstChild);
	}

	for (var index in ingredients) {
			var item = document.createElement("li");
			item.innerHTML = ingredients[index];
			ingredientsElement.appendChild(item);
	}
}

self.port.on("analysisFinished", function (cocktail) {
	hideElement(loadingElement);
	if (cocktail) {
		nameElement.innerHTML = cocktail.title;
		pictureElement.src = cocktail.picture;
		setIngredientList(cocktail.ingredients);
	}
});

self.port.on("hide", function() {
	revert();
});
