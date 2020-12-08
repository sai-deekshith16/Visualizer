export function XY(from, to){
    var ax = from[0];
    var bx = to[0];
    var ay = from[1];
    var by = to[1];

    var size= 20;
    var fullness1 = 5;
    var fullness2 = 6;

    var abx = bx - ax;
    var aby = by - ay;
    var ab = Math.sqrt(abx * abx + aby * aby);

    var cx = bx - size * abx / ab;
    var cy = by - size * aby / ab;
    var fx = (fullness1 * cx + bx) / fullness2;
    var fy = (fullness1 * cy + by) / fullness2;

    return [fx,fy];
}