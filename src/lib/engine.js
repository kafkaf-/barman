var utils = require('./color.js');

var rg = function (palette, cocktailCollection) {
	var similarCocktails = [];
	var margin = 0.1;
	for (var cocktail in cocktailCollection) {
		var currentCocktail = cocktailCollection[cocktail];
		if (currentCocktail.palette.rankSimilarity(palette) <= margin) {
			similarCocktails.push(currentCocktail);
		}
	}
	return similarCocktails[Math.floor(Math.random() * similarCocktails.length)];
};

var g = function (palette, cocktailCollection) {
	var similarCocktail = null;
	var highestRank = 1;
	for (var cocktail in cocktailCollection) {
		var currentCocktail = cocktailCollection[cocktail];
		var currentRank = currentCocktail.palette.rankSimilarity(palette);
		if (currentRank < highestRank) {
			similarCocktail = currentCocktail;
			highestRank = currentRank;
			if (currentRank == 0) {
				break;
			}
		}
	}

	return similarCocktail;
};

exports.getCocktailByPalette = rg;
