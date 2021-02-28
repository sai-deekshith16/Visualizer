import { Group } from '@progress/kendo-drawing';
import {NewCircle} from "./NewCircle";
import {NewEdge} from "./NewEdge"

function midPoint(a,b){
    var point = [(a[0]+b[0])/2 - 5,(a[1]+b[1])/2 -5];
    return point;
}

export function primsDrawScene(surface,vertices,edges,vertexColour,directed) {
    // Create a path and draw a straight line
   // const circle = NewCircle([100,100]);
   console.log(edges);
    var x = -100;
    var y = 75;
    var group  = new Group();
    var vertexCoordinates = [];
    for(var i=0;i<vertices;i++){
        x = (x+200);
        if(x>=900){
            x = 100;
            y = y+ 200;
        }
        var cir = NewCircle([x,y],String(i),vertexColour[i]);
        vertexCoordinates.push([x,y]);
        group.append(cir);
    }
    for(i=0;i<edges.length && vertices >0;i++){
        for(var j=0;j<edges[i].length;j++){
            var edge = edges[i][j];
            var fromCor = vertexCoordinates[i];
            var toCor = vertexCoordinates[edge.node];
            var builtedge = NewEdge(fromCor,toCor,edge.colour,directed,edge.weight);
            group.append(builtedge);
        }
    }
    // Render the group on the surface
    surface.draw(group);
}