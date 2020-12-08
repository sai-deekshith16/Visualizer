import {Path } from '@progress/kendo-drawing';

export function Arrow (from, to,colour){
    var ax = from[0];
    var bx = to[0];
    var ay = from[1];
    var by = to[1];
    var arrow1 = new Path({
        stroke: {
        color: colour,
        width: 3
    }});
    
    var size= 13;
    var ratio = 2;
    var fullness1 = 2;
    var fullness2 = 3;

    var abx = bx - ax;
    var aby = by - ay;
    var ab = Math.sqrt(abx * abx + aby * aby);

    var cx = bx - size * abx / ab;
    var cy = by - size * aby / ab;
    var dx = cx + (by - cy) / ratio;
    var dy = cy + (cx - bx) / ratio;
    var ex = cx - (by - cy) / ratio;
    var ey = cy - (cx - bx) / ratio;
    var fx = (fullness1 * cx + bx) / fullness2;
    var fy = (fullness1 * cy + by) / fullness2;

    arrow1.moveTo(bx, by);
    arrow1.lineTo(dx, dy);
    arrow1.lineTo(fx, fy);
    arrow1.lineTo(ex, ey);
    arrow1.lineTo(bx, by);


    return arrow1;
} 