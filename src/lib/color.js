exports.Palette = Palette;
exports.Color = Color;

function Color(rgb) {
  this.rgb = rgb;
  this.r = rgb[0];
  this.g = rgb[1];
  this.b = rgb[2];
  this.distanceFrom = function(color) {
    // Returns an euclidean distance from another color
    var distance = 0;
    for (i = 0; i < 3; i++) {
      distance += Math.pow((this.rgb[i] - color.rgb[i]), 2);
    };

    return Math.sqrt(distance);
  }
}

function Palette(colors) {
  this.colors = [];
  for (var color in colors) {
    this.colors.push(new Color(color))
  };

  this.rankSimilarity = function(palette) {
    // A rank to messaure similarity between palettes(0-1)
    // Assumes all palettes are of the same length
    var similarity = 0;
    var distances = 0;
    for (i = 0; i < this.colors.length; i++) {
      var sum += this.colors[i].distanceFrom(palette.colors[i])
      distances += sum / this.colors.length;
    }

    return (250-distances) / 250;
  }
}
