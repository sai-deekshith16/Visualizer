import { Group,geometry} from '@progress/kendo-drawing';
import {NewCircle} from "./NewCircle";
import {NewEdge} from "./NewEdge";
import {testDrawScene} from "./testdrawScene";
const {transform} = geometry;

function midPoint(a,b){
    var point = [(a[0]+b[0])/2 - 5,(a[1]+b[1])/2 -5];
    return point;
}

export function primsDrawScene(surface,vertices,edges,vertexColour,greenedge,resVer,treeEdges) {
    // Create a path and draw a straight line
   // const circle = NewCircle([100,100]);
    var x = 30;
    var y = 75;
    var group  = new Group();
    var vertexCoordinates = [];
    for(var i=0;i<vertices;i++){
        if(x>=600){
            x = 30;
            y = y+ 150;
        }
        var cir = NewCircle([x,y],String(i),vertexColour[i]);
        vertexCoordinates.push([x,y]);
        group.append(cir);
        x = (x+150);
    }

    var cutEdges = [];
    if(greenedge !== null){
         cutEdges.push(greenedge);
    }
    for(i=0;i<edges.length && vertices >0;i++){
        for(var j=0;j<edges[i].length;j++){
            var edge = edges[i][j];
            if(edge.colour =="white"){
                continue;
            }
            var fromCor = vertexCoordinates[i];
            var toCor = vertexCoordinates[edge.node];
            var builtedge = NewEdge(fromCor,toCor,edge.colour,false,edge.weight);
            if(edge.colour === "blue"){
                var temp = [i,edge.node,edge.weight,"blue"];
                cutEdges.push(temp);
            }
            group.append(builtedge);
        }
    }

    var temp = testDrawScene(vertexColour,cutEdges,resVer,treeEdges);
    if(temp!==null){
        group.append(temp);
    }
    group.transform(transform().translate(50,10));
    surface.draw(group);
}