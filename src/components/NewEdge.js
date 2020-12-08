import {Path,Group } from '@progress/kendo-drawing';
import {Arrow} from './arrow';
import {XY} from './CalXY';
//import {deCasteljau} from './deCasteljau';


function midPoint(a,b){
    var point = [(a[0]+b[0])/2,(a[1]+b[1])/2];
    return point;
}

export function NewEdge(from ,to,colour,directed){
    
    var newTo = XY(from,to);
    var newFrom = XY(to,from);
    var x1 = newFrom[0] ;
    var y1 = newFrom[1] ;
    var x2 = newTo[0];
    var y2 = newTo[1];

    var path = new Path({
            stroke: {
            color: colour,
            width: 3,
        }
    });
    var arrow;
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
    
        var m0 = midPoint([x1,y1],[x3,y3]);
        var m1 = midPoint([x3,y3],[x4,y4]);
        var m2 = midPoint([x4,y4],[x2,y2]);
        var m3 = midPoint(m0,m1);
        var m4 = midPoint(m1,m2);
        var m5 = midPoint(m3,m4);
        arrow = Arrow(m3,m5,colour);

    //var points = [[x1,y1],[x2,y2],[x3,y3],[x4,y4]];
    //var t = 0.5;
    var group = new Group();

    //var result = deCasteljau(points,t);
    //console.log(result);
    
    group.append(path,arrow);
    
    //arrow = Arrow(m3,result,colour);
    //group.append(arrow);
    if(directed){
        return group;
    }
    return path;
}