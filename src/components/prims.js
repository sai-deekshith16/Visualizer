import heap from "js-heap";
import _ from "lodash";

export function prims (edges,vertices){
    let pq = new heap(function(a,b){
        return b.priority - a.priority;
    });

    //red == unvisted, green == inpath , blue == inqueue, white == deleted

    var resVer = {visited: new Set(),unvisited: new Set()};
    var resEdges = [];
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
    resEdges = edges;
    sample.push([resVer,resEdges]);

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

    sample.push([resVer.resEdges]);

    let currentMinEdge = pq.peek();
    console.log(currentMinEdge);

    while (!pq.isEmpty()) {
        while (!pq.isEmpty() && explored.has(currentMinEdge.edge[1])) {
            currentMinEdge = pq.pop();
            resEdges[]
        }

        let nextNode = currentMinEdge.edge[1];
        console.log(nextNode);
  
        if (!explored.has(nextNode)) {
            result[currentMinEdge.edge[0]].push({node:currentMinEdge.edge[1],weight:currentMinEdge.priority,colour:"blue"});
            // Again add all edges to the PQ
           prev[nextNode].forEach(edge => {
              pq.push({edge: [nextNode, edge.node],priority: edge.weight});
           });  
           explored.add(nextNode);
           s = nextNode;
        }

     }
     return result;
}