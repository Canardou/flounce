/**
 * handle entrances ?
 */
var Entrance = function(x, y, minWave) {
    this.x = x;
    this.y = y;
    this.minWave = def(minWave, 1);
};