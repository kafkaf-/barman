var dbapi = require('./db.js')
var colors = require('./colors.js')

exports.getCocktailByPalette = function (palette) {
	var similarCocktail = null;
	var highestRank = 0;
	for (var cocktail in dbapi.cocktails) {
		var p = new colors.Palette(cocktail.palette);
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
