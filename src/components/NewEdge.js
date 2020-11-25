import {Path } from '@progress/kendo-drawing';

export function NewEdge(from ,to,colour){
    var x1 = from[0];
    var y1 = from[1];
    var x2 = to[0];
    var y2 = to[1];

    var path = new Path({
        stroke: {
        color: colour,
        width: 3
    }});

    if( Math.abs(x2-x1) === 200 || Math.abs(y2-y1) === 200){
        path.lineTo(x1,y1).lineTo(x2,y2).close();
    }

    else{
        var dx = x1-x2
        var dy = y1-y2
        var dist = Math.sqrt(dx*dx + dy*dy)
        dx = dx/dist
        dy = dy/dist
        var x3 = x1 + (dist/17)*dy
        var y3 = y1 - (dist/17)*dx
        var x4 = x2 + (dist/17)*dy
        var y4 = y2 - (dist/17)*dx
    
        
        path.moveTo(x1, y1).curveTo([x3, y3], [x4, y4], [x2, y2]);
    }

    return path;
}