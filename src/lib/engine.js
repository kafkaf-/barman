var dbapi = require('./db.js');
var utils = require('./color.js');

var g = function (palette, cocktailCollection) {
	if (!cocktailCollection) {
		cocktailCollection = dbapi.cocktails;
	}

	var similarCocktail = null;
	var highestRank = 0;
	for (var cocktail in cocktailCollection) {
		var p = new utils.Palette(cocktail.palette);
		var currentRank = p.rankSimilarirty(palette);
		if (currentRank > highestRank) {
			similarCocktail = cocktail;
			highestRank = currentRank;
			if (currentRank >= 0.9) {
				break;
			}
		}
	}

	return similarCocktail;
};

exports.getCocktailByPalette = g;
