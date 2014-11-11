var utils = require('./color.js');

var rangeGenerator = function (palette, cocktailCollection) {
	var similarCocktails = [];
	var margin = 0.1;
	for (var index in cocktailCollection) {
		var currentCocktail = cocktailCollection[index];
		var diff = currentCocktail.palette.rankSimilarity(palette);
		if (diff <= margin) {
			similarCocktails.push([currentCocktail, diff]);
		}
	}

	var topMatches = similarCocktails.sort(function(a, b) { return b[1] - a[1] }).slice(0, similarCocktails.length >= 5 ? 4 : similarCocktails.length - 1).map(function(item){ return item[0]; });
	return topMatches[Math.floor(Math.random() * topMatches.length)];
};

var closestMatchGenerator = function (palette, cocktailCollection) {
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

exports.getCocktailByPalette = closestMatchGenerator;
