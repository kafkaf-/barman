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

    regression.slope.x = ( size * sxy - sx * sz ) / ( size * sxx - Math.pow(sx, 2));
    regression.slope.y = ( size * syz - sz * sy ) / ( size * syy - Math.pow(sz, 2));
    regression.slope.z = ( size * syz - sz * sy ) / ( size * szz - Math.pow(sy, 2));

    regression.offset.x = (sz - regression.slope.x * sx) / size;
    regression.offset.y = (sy - regression.slope.y * sz) / size;
    regression.offset.z = (sx - regression.slope.z * sy) / size;
  };
  return regression;
}
