function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    result[1] = parseInt(result[1], 16);
    result[2] = parseInt(result[2], 16);
    result[3] = parseInt(result[3], 16);
    result.splice(0, 1);
  } else result = null;
  return result;
}

export {
  hexToRgb,
};
