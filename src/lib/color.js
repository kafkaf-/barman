var emath = require("./math.js");

function euclideanDistance(vector1, vector2) {
    var distance = 0;
    for (i = 0; i < 3; i++) {
      distance += Math.pow((vector1[i] - vector2[i]), 2);
    };

    return Math.sqrt(distance);
}


function Color(rgb) {
  this.rgb = rgb;
  this.r = rgb[0];
  this.g = rgb[1];
  this.b = rgb[2];
  this.distanceFrom = function(color) {
    // Returns an euclidean distance from another color
    return euclideanDistance(this.rgb, color.rgb);
  }
}

function Palette(colors) {
  this.colors = [];
  for (var index in colors) {
    this.colors.push(new Color(colors[index]))
  };

  this.rankSimilarity = function(palette) {
    // A rank to messaure similarity between palettes(0-1)
    // Assumes all palettes are of the same length
    var cords = ["x", "y", "z"];
    var r = [];
    var a = [{}, {}];
    var b = [{}, {}];

    // r[i] is a hash of the multiple regression of the Palette in RGB space
    r[0] = this.fit()
    r[1] = palette.fit();
    for (i = 0; i < 2; i++) {
      for (var index in cords) {
        var currentCord = cords[index];
        a[i][currentCord] = 0 * r[i].slope[currentCord] + r[i].offset[currentCord];
        b[i][currentCord] = 255 * r[i].slope[currentCord] + r[i].offset[currentCord];
      }
    }

    var dMax = Math.sqrt(3 * Math.pow(65025, 2))
    var d1 = euclideanDistance([a[0].x, a[0].y, a[0].z], [a[1].x, a[1].y, a[1].z]) / dMax;
    var d2 = euclideanDistance([b[0].x, b[0].y, b[0].z], [b[1].x, b[1].y, b[1].z]) / dMax;

    return d1 + d2;
  }

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
}

exports.Palette = Palette;
exports.Color = Color;
