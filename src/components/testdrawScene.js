import { Group,Rect,geometry,Text,Path } from '@progress/kendo-drawing';
import {NewCircle} from "./NewCircle";
import {NewEdge} from "./NewEdge";
const {Rect: GeoRect,transform} = geometry;


export function testDrawScene(vertexColour,edges,resVer,treeEdges) {
    if(vertexColour.length === 0){
        return null;
    }
    var group  = new Group();
    var x1 = 25;
    var y1 = 20;
    var x2 = 170;
    var y2 = 20;
    var heigh = (vertexColour.length +1) * 20;
    var rect  = new Rect( new GeoRect([5,5],[50,heigh]),{
        fill: {
            color: "#33ccff"
          }
    });

    var rect2  = new Rect( new GeoRect([150,5],[50,heigh]),{
        fill: {
            color: "#33ccff"
          }
    });
    group.append(rect,rect2);
    var visited = new Set();

    for(var i=0;i<vertexColour.length;i++){
        if(resVer === 0 && i===0){
            var text = new Text(i,[x1,y1]);
            y1 +=20;
            group.append(text);
        }
        else if(vertexColour[i]==="yellow" || i ===resVer){
            var text = new Text(i,[x2,y2]);
            y2 +=20;
            group.append(text);
        }
        else{
            var text = new Text(i,[x1,y1]);
            y1 +=20;
            group.append(text);
            visited.add(i);
        }
    }

    x1 = 55;
    y1 = 10;
    x2 = 150;
    y2 = 10;
    for(i=0;i<edges.length;i++){
        if(!visited.has(edges[i][0]) || !visited.has(edges[i][1]) || edges[i][0] === resVer || edges[i][1]===resVer || edges[i][3] === "green"){
            var path = new Path({
                stroke: {
                    color: edges[i][3],
                    width: 2,
                }
            });
            var midx = (x1 + x2)/2;
            var id1 = null;
            var id2 = null;
            if(visited.has(edges[i][0])){
                id1 = edges[i][0];
                id2 = edges[i][1];
            }
            else{
                id1 = edges[i][1];
                id2 = edges[i][0];
            }
            text = new Text(edges[i][2], [midx,y1], {
                font: `bold 15px Arial`
            });
            var text2 = new Text(id1, [x1+5,y1], {
                font: `bold 15px Arial`
            });
            var text3 = new Text(id2, [x2-5,y1], {
                font: `bold 15px Arial`
            });
            path.moveTo(x1,y1).lineTo(x2,y2);
            group.append(path,text,text2,text3);
            y1+=20;
            y2+=20;
        }
    }

    
    x1 = 300;
    y1 = 5;
    var vertexCoordinates = {};
    // if(resVer !== -1){
    //     visited.add(resVer);
    // }
    // visited.forEach(function(value) {
    //     var cir = NewCircle([x1,y1],String(value),"yellow");
    //     vertexCoordinates[value] = [x1,y1];
    //     group.append(cir);
    //     y1 = y1+100;
    // })

    for(var i=0;i<vertexColour.length;i++){
        if(x1>=700){
            x1 = 300;
            y1 = y1+ 100;
        }
        var cir = NewCircle([x1,y1],String(i),"yellow");
        vertexCoordinates[i] = [x1,y1];
        group.append(cir);
        x1 = (x1+100);
    }

    for(var i=0;i<treeEdges.length;i++){
        var from = vertexCoordinates[treeEdges[i][0]];
        var to = vertexCoordinates[treeEdges[i][1]];
        var builtedge = NewEdge(from,to,"green",false,"");
        group.append(builtedge);
    }

    group.transform(transform().translate(575,100));
    return group;
}