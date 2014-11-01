function barmanPanel(cocktail) {
		this.currentCocktail = cocktail;
		this.nameElement = document.getElementById("name");
		this.pictureElement = document.getElementById("picture");
		this.loadingElement = document.getElementById("loading-message");
		this.ingredientsElement = document.getElementById("ingredients");
		this.recipeLinkElement = document.getElementById("recipe-link");

		this.hiddenElements = {}

		this.renderCocktailInfo = function() {
				this.nameElement.innerHTML = this.currentCocktail.title;
				this.pictureElement.src = this.currentCocktail.picture;
				this.setIngredientList(this.currentCocktail.ingredients);
				this.recipeLinkElement.onclick = function () { redirectToRecipeSite(); };
		}

		this.hideElement = function(element) {
			hiddenElements[element] = this.element.style;
			element.style.visibility = "hidden";
		}

		this.showElement = function(element) {
			element.style = this.hiddenElements[element];
		}

		this.setIngredientList = function(ingredients) {
			while(this.ingredientsElement.firstChild) {
				this.ingredientsElement.removeChild(this.ingredientsElement.firstChild);
			}

			for (var index in ingredients) {
					var item = document.createElement("li");
					item.innerHTML = ingredients[index];
					this.ingredientsElement.appendChild(item);
			}
		}
}

var currentPanel = null;

var redirectToRecipeSite = function() {
	self.port.emit("redirectToRecipe", currentPanel.currentCocktail.url);
}

self.port.on("analysisFinished", function (cocktail) {
	if (cocktail) {
		currentPanel = new barmanPanel(cocktail);
		currentPanel.renderCocktailInfo();
	}
});


self.port.on("hide", function() {
});
