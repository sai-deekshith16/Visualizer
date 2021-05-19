import { Group,geometry} from '@progress/kendo-drawing';
import {NewCircle} from "./NewCircle";
import {NewEdge} from "./NewEdge";
const {transform} = geometry;

export function krushkalDrawScene(surface,vertices,edges,vertexColour,greenEdge) {
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
        var cir2 = NewCircle([x + 700,y],String(i),vertexColour[i]);
        vertexCoordinates.push([x,y]);
        group.append(cir);
        group.append(cir2);
        x = (x+150);
    }

    for(i=0;i<edges.length && vertices >0;i++){
        for(var j=0;j<edges[i].length;j++){
            var edge = edges[i][j];
            if(edge.colour ==="white"){
                continue;
            }
            var fromCor = vertexCoordinates[i];
            var toCor = vertexCoordinates[edge.node];
            var builtedge = NewEdge(fromCor,toCor,edge.colour,false,edge.weight);
            group.append(builtedge);
            if(edge.colour === "green"){
                builtedge = NewEdge([fromCor[0]+700,fromCor[1]],[toCor[0]+700,toCor[1]],edge.colour,false,"");
            }
            group.append(builtedge);
        }
    }
    group.transform(transform().translate(50,10));
    surface.draw(group);
}