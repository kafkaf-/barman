var color = require("./color.js");

cocktails = [];

exports.cocktails = cocktails;

exports.insert = function(cocktail) {
    if (cocktail.palette) {
        cocktail.palette = new color.Palette(cocktail.palette.colors,
          cocktail.palette.IVector);
        cocktails.push(cocktail);
    } else {
      throw "Cocktail must have a palette"
    }
  }
