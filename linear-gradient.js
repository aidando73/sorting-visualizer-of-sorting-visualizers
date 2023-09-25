function lerp(a, b, value) {
   const colorA = hexColorToFloatColor(a);
   const colorB = hexColorToFloatColor(b);
   return floatColorToHexColor([
      colorA[0] + (colorB[0] - colorA[0]) * value,
      colorA[1] + (colorB[1] - colorA[1]) * value,
      colorA[2] + (colorB[2] - colorA[2]) * value
   ]);
}

function hexColorToFloatColor(hex) {
   return [
      parseInt(hex.substring(1, 3), 16) / 255,
      parseInt(hex.substring(3, 5), 16) / 255,
      parseInt(hex.substring(5, 7), 16) / 255
   ];
}

function floatColorToHexColor(color) {
   return '#' + color.map(c => Math.floor(c * 255).toString(16).padStart(2, '0')).join('');
}