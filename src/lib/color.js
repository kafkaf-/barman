var emath = require("./math.js");

var values = function(arr) {
  var vals = [];
  for (var index in arr) {
    vals.push(arr[index]);
  }
  return vals;
}

function Color(rgb) {
  this.rgb = rgb;
  this.r = rgb[0];
  this.g = rgb[1];
  this.b = rgb[2];
  this.distanceFrom = function(color) {
    // Returns an euclidean distance from another color
    return emath.euclideanDistance(this.rgb, color.rgb);
  }
}

function Palette(colors, IVector) {
  this.colors = [];
  this.IVector = IVector;

  for (var index in colors) {
    this.colors.push(new Color(colors[index]))
  };

    this.fit = function() {
      // Create a 3xn matrix where n = colors.length to represent the set of colors
      var reds = [];
      var greens = [];
      var blues = [];
      for(i = 0; i < this.colors.length; i++) {
          reds.push(this.colors[i].r)
          greens.push(this.colors[i].g)
          blues.push(this.colors[i].b)
      }
      return emath.multipleRegression(reds, greens, blues);
  }


  this.getIVector = function() {
    if (!this.IVector) {
      this.IVector = emath.calcIVector(this.fit());
    }

    return this.IVector;
  }

  this.rankSimilarity = function(palette) {
    var dMax = Math.sqrt(3 * Math.pow(65025, 2));

    var myVector = this.getIVector();
    var otherVector = palette.getIVector();

    var d1 = emath.euclideanDistance(values(myVector.min), values(otherVector.min)) / dMax;
    var d2 = emath.euclideanDistance(values(myVector.max), values(otherVector.max)) / dMax;

    return d1 + d2;
  }
}

exports.Palette = Palette;
exports.Color = Color;
