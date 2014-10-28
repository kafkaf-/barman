var color = require("./color");

exports["test distance from"] = function(assert) {
  var point_collection = [
      {
        points: [[0,0,0], [1,1,1]],
        distance: Math.sqrt(3)
        },
      {
        points: [[0,0,0], [2,2,2]],
        distance: Math.sqrt(12)
        }
    ];
  for (var index in point_collection) {
    var test_obj = point_collection[index];
    var color1 = new color.Color(test_obj.points[0]);
    var color2 = new color.Color(test_obj.points[1]);
    var distance = test_obj.distance;
    assert.ok(color1.distanceFrom(color2) == distance, "distanceFrom returned expected result");
  };
}
//
exports["test similarity ranking, same palettes"] = function(assert) {
  var palettes =[
    [[0,0,255]], [[255,0,0]], [[0,255,0], [0,0,0], [100,120,90]], [[0,255,0], [0,0,0]],
    [[255,0,255], [1,0,1]], [[0,0,0], [0,0,0]]
  ];

  for (var index in palettes) {
    var palette = new color.Palette(palettes[index]);
    assert.ok(palette.rankSimilarity(palette) == 0,
    "Similarity ranking of same palettes is 0")
  }
}

exports["test similarity ranking on palettes with different lengths"] = function(assert) {
  var palettes =[
    [[0,255,0], [0,0,0], [100,120,90]], [[0,255,0], [0,0,0]]
  ];

  var palette = new color.Palette(palettes[0]);
  var palette1 = new color.Palette(palettes[1]);
  assert.ok(typeof palette.rankSimilarity(palette1) === "number",
  "Similarity ranking works on palettes with different lengths");
}


exports["test similarity ranking, black and white"] = function(assert) {
  var palettes =[
    [
      [[0,0,0]], [[255,255,255]]
      ]
  ];

  for (var index in palettes) {
    var palette1 = new color.Palette(palettes[index][0]);
    var palette2 = new color.Palette(palettes[index][1]);
    assert.ok(palette1.rankSimilarity(palette2) == 1,
    "Similarity ranking of black and white is 1")
  }
}

require("sdk/test").run(exports);
