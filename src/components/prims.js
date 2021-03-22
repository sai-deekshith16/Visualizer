import heap from "js-heap";
import _ from "lodash";

export function prims (edges,vertices){
    let pq = new heap(function(a,b){
        return b.priority - a.priority;
    });

    //red == unvisted, green == inpath , blue == inqueue, grey == deleted

    var resVer = {visited: new Set(),unvisited: new Set()};
    var resEdges = _.cloneDeep(edges);
    var sample = [];
    var prev = _.cloneDeep(edges);
    let result = [];
    var s = 0;
    for(var i=0;i<edges.length;i++){
        result.push([]);
        for(var j=0;j<edges[i].length;j++){
            var edge = edges[i][j];
            prev[edge.node].push({node:i,weight:edge.weight,colour:"red"});
        }
    }

    for(var i=0;i<vertices;i++){
        resVer.unvisited.add(i);
    }
    // sample.push([resVer,resEdges]);
    for(var i=0;i<prev[s].length;i++){
        var edge = prev[s][i];
        resEdges[s][i].colour = "blue";
        var newEdge = [s,edge.node];
        pq.push({edge: newEdge,priority:edge.weight});
    }

    let explored = new Set();
    explored.add(s);

    resVer.unvisited.delete(s);
    resVer.visited.add(s);

    // sample.push([resVer,resEdges]);

    let currentMinEdge = pq.peek();
    console.log(currentMinEdge);

    while (!pq.isEmpty()) {

        while (!pq.isEmpty() && explored.has(currentMinEdge.edge[1])) {
            currentMinEdge = pq.pop();
            var count = resEdges[currentMinEdge.edge[0]].length;
            var tempedges = resEdges[currentMinEdge.edge[0]];
            var flag =0;
            for(var i=0;i< count;i++){
                if(tempedges[i].node === currentMinEdge.edge[1] && tempedges[i].weight === currentMinEdge.priority){
                    tempedges[i].colour = "grey";
                    flag =1;
                    break;
                }
            }

            if(flag===0){
                tempedges = resEdges[currentMinEdge.edge[1]];
                count = resEdges[currentMinEdge.edge[1]].length;
                for(var i=0;i< count;i++){
                    if(tempedges[i].node === currentMinEdge.edge[0] && tempedges[i].weight === currentMinEdge.priority){
                        tempedges[i].colour = "grey";
                        break;
                    }
                }
            }
            // sample.push([resVer,resEdges]);
        }

        let nextNode = currentMinEdge.edge[1];
        console.log(nextNode);
  
        if (!explored.has(nextNode)) {
            
            var count = edges[currentMinEdge.edge[0]].length;
            var tempedges = edges[currentMinEdge.edge[0]];
            var flag =0;
            for(var i=0;i< count;i++){
                if(tempedges[i].node === currentMinEdge.edge[1] && tempedges[i].weight === currentMinEdge.priority){
                    result[currentMinEdge.edge[0]].push({node:currentMinEdge.edge[1],weight:currentMinEdge.priority,colour:"green"});
                    resEdges[currentMinEdge.edge[0]][i].colour = "green";
                    flag =1;
                    break;
                }
            }

            if(flag===0){
                result[currentMinEdge.edge[1]].push({node:currentMinEdge.edge[0],weight:currentMinEdge.priority,colour:"green"});
                count = edges[currentMinEdge.edge[1]].length;
                tempedges = edges[currentMinEdge.edge[1]];
                for(var i=0;i<count;i++){
                    if(tempedges[i].node === currentMinEdge.edge[0] && tempedges[i].priority === currentMinEdge.priority){
                        resEdges[currentMinEdge.edge[1]][i].colour = "green";
                        break;
                    }
                }
            
            }
            resVer.visited.add(nextNode);
            resVer.unvisited.delete(nextNode);
            sample.push([resVer,resEdges]);
            explored.add(nextNode);
            // Again add all edges to the PQ
           prev[nextNode].forEach(edge => {
              pq.push({edge: [nextNode, edge.node],priority: edge.weight});
              
             var found =0;

              for(var i=0;i<resEdges[nextNode].length;i++){
                  if(resEdges[nextNode][i].node === edge.node && resEdges[nextNode][i].weight ===edge.weight){
                      resEdges[nextNode][i].colour ="blue";
                      found =1;
                      break;
                  }
              }

              if(found ===0){
                  for(var i=0;i<resEdges[edge.node].length;i++){
                    if(resEdges[edge.node][i].node === nextNode && resEdges[edge.node][i].weight === edge.weight){
                        resEdges[edge.node][i].colour ="blue";
                        found =1;
                        break;
                    }
                  }
              }

           });  
           s = nextNode;
        }

     }

     console.log(sample);
    return sample;
     //return result;
}