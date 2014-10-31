// TODO: extend the Maths prototype?
exports.multipleRegression = function(dx, dy, dz) {
  var regression = {slope: {}, offset: {}};
  var size = dx.length;
  if (size == 1) {
    regression.slope = {x: dx[0], y: dy[0], z: dz[0]};
    regression.offset = {x: 0, y:0, z:0};
  } else {
    var sxx = syy = szz = sxy = szx = syz = sx = sy = sz = 0;
    for (i = 0; i < size; i++) {
      var x = dx[i];
      var y = dy[i];
      var z = dz[i];
      sxx += Math.pow(x, 2);
      syy += Math.pow(y, 2);
      szz += Math.pow(z, 2);
      sxy += x * y;
      szx += z * x;
      syz += y * z;
      sx += x;
      sy += y;
      sz += z;
    };

    regression.slope.x = (( size * sxy - sx * sz ) / ( size * sxx - Math.pow(sx, 2))) || 0;
    regression.slope.y = (( size * syz - sz * sy ) / ( size * syy - Math.pow(sz, 2))) || 0;
    regression.slope.z = (( size * syz - sz * sy ) / ( size * szz - Math.pow(sy, 2))) || 0;

    regression.offset.x = (sz - regression.slope.x * sx) / size;
    regression.offset.y = (sy - regression.slope.y * sz) / size;
    regression.offset.z = (sx - regression.slope.z * sy) / size;
  };

  return regression;
}

exports.euclideanDistance = function(vector1, vector2) {
    var distance = 0;
    for (i = 0; i < 3; i++) {
      distance += Math.pow((vector1[i] - vector2[i]), 2);
    };

    return Math.sqrt(distance);
}

exports.calcIVector = function(fit) {
  var cords = ["x", "y", "z"];
  var max = {};
  var min = {};

  // r[i] is a hash of the multiple regression of the Palette in RGB space
  var r = fit
  for (var index in cords) {
    var currentCord = cords[index];
    min[currentCord] = 0 * r.slope[currentCord] + r.offset[currentCord];
    max[currentCord] = 255 * r.slope[currentCord] + r.offset[currentCord];
  }

  return {"min": min, "max": max}
};
