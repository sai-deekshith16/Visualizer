import { Group } from '@progress/kendo-drawing';
import {NewCircle} from "./NewCircle";
import {NewEdge} from "./NewEdge"

export function drawScene(surface,vertices,edges,vertexColour,edgeColour,directed) {
    // Create a path and draw a straight line
   // const circle = NewCircle([100,100]);
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
        if(edges[i][0] <vertices && edges[i][1] <vertices){
            var edge = NewEdge(vertexCoordinates[edges[i][0]],vertexCoordinates[edges[i][1]],edgeColour[i],directed);
            group.append(edge);
        }
    }
    // Render the group on the surface
    surface.draw(group);
}