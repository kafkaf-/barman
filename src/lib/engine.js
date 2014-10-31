var utils = require('./color.js');

var g = function (palette, cocktailCollection) {
	console.log(palette)
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

exports.getCocktailByPalette = g;
