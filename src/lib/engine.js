var dbapi = require('./db.js')
var utils = require('./color.js')

exports.getCocktailByPalette = function (palette) {
	var similarCocktail = null;
	var highestRank = 0;
	for (var cocktail in dbapi.cocktails) {
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
