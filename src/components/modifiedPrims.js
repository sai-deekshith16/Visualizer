import heap from "js-heap";
import _ from "lodash";

export function prims (edges,vertices){
    console.log(edges);
    let pq = new heap(function(a,b){
        return b.priority - a.priority;
    });

    //red == unvisted, green == inpath , blue == inqueue, white == deleted
    var resultEdges = [];
    var sample = [];
    var prev = _.cloneDeep(edges);
    var s = 0;
    var copyEdges = _.cloneDeep(edges);
    var temp = null;
    console.log(prev);
    sample.push([0,[],"intial"]);

    for(var i=0;i<edges.length;i++){
        for(var j=0;j<edges[i].length;j++){
            var edge = edges[i][j];
            prev[edge.node].push({node:i,weight:edge.weight,colour:"red"});
            if(i===s){
                var newEdge = [s,edge.node];
                pq.push({edge: newEdge,priority:edge.weight});
                temp = {edge : newEdge, colour:"blue"};
                copyEdges[i][j].colour = "blue";
                resultEdges.push(temp);
            }
            else if(edge.node === s){
                var newEdge = [i,s];
                temp = {edge : newEdge, colour:"blue"};
                resultEdges.push(temp);
                pq.push({edge: [s,i],priority:edge.weight});
                copyEdges[i][j].colour = "blue";
            }
        }
    }

    sample.push([-1,resultEdges,"intial in queue"]);
    resultEdges = [];

    let explored = new Set();
    explored.add(s);

    let currentMinEdge = pq.peek();
    while (!pq.isEmpty()) {
        temp = null;
        while (!pq.isEmpty() && explored.has(currentMinEdge.edge[1])) {
            var count = edges[currentMinEdge.edge[0]].length;
            var tempedges = edges[currentMinEdge.edge[0]];
            var flag =0;
            for(var i=0;i< count;i++){
                if(tempedges[i].node === currentMinEdge.edge[1] && tempedges[i].weight === currentMinEdge.priority){
                    if(copyEdges[currentMinEdge.edge[0]][i].colour !== "green"){
                        temp = {edge: currentMinEdge.edge, colour :"white"};
                    }
                    flag =1;
                    break;
                }
            }
            
            if(flag===0){
                count = edges[currentMinEdge.edge[1]].length;
                tempedges = edges[currentMinEdge.edge[1]];
                for(var i=0;i< count;i++){
                    if(tempedges[i].node === currentMinEdge.edge[0] && tempedges[i].weight === currentMinEdge.priority){
                        if(copyEdges[currentMinEdge.edge[1]][i].colour !== "green"){
                            temp = {edge: [currentMinEdge.edge[1],currentMinEdge.edge[0]], colour :"white"};
                        }
                        break;
                    }
                }                
            }
            if(temp!== null){
                sample.push([-1,[temp],"greyed edges"]);
            }
            currentMinEdge = pq.pop();
        }

        if(pq.isEmpty()){
            temp = null;
            var count = edges[currentMinEdge.edge[0]].length;
            var tempedges = edges[currentMinEdge.edge[0]];
            var flag =0;
            for(var i=0;i< count;i++){
                if(tempedges[i].node === currentMinEdge.edge[1] && tempedges[i].weight === currentMinEdge.priority){
                    if(copyEdges[currentMinEdge.edge[0]][i].colour !== "green"){
                        temp = {edge: currentMinEdge.edge, colour :"white"};
                    }
                    flag =1;
                    break;
                }
            }
            
            if(flag===0){
                count = edges[currentMinEdge.edge[1]].length;
                tempedges = edges[currentMinEdge.edge[1]];
                for(var i=0;i< count;i++){
                    if(tempedges[i].node === currentMinEdge.edge[0] && tempedges[i].weight === currentMinEdge.priority){
                        if(copyEdges[currentMinEdge.edge[1]][i].colour !== "green"){
                            temp = {edge: [currentMinEdge.edge[1],currentMinEdge.edge[0]], colour :"white"};
                        }
                        break;
                    }
                }                
            }
            if(temp!== null){
                sample.push([-1,[temp],"greyed edges"]);
            }
        }

        let nextNode = currentMinEdge.edge[1];
        resultEdges = [];
        if (!explored.has(nextNode)) {
            temp = null;
            var count = edges[currentMinEdge.edge[0]].length;
            var tempedges = edges[currentMinEdge.edge[0]];
            var flag =0;
            for(var i=0;i< count;i++){
                if(tempedges[i].node === currentMinEdge.edge[1] && tempedges[i].weight === currentMinEdge.priority){
                    temp = {edge:currentMinEdge.edge,colour:"green"};
                    copyEdges[currentMinEdge.edge[0]][i].colour = "green";
                    flag =1;
                    break;
                }
            }

            if(flag===0){
                count = edges[currentMinEdge.edge[1]].length;
                tempedges = edges[currentMinEdge.edge[1]];
                for(var i=0;i< count;i++){
                    if(tempedges[i].node === currentMinEdge.edge[0] && tempedges[i].weight === currentMinEdge.priority){
                        temp = {edge: [currentMinEdge.edge[1],currentMinEdge.edge[0]],colour:"green"};
                        copyEdges[currentMinEdge.edge[1]][i].colour = "green";
                        break;
                    }
                }         
            }
            if(temp!==null){
                sample.push([nextNode,[temp],"green edges added "]);
            }
            explored.add(nextNode);


            prev[nextNode].forEach(edge => {
                temp =null;
                if(!explored.has(edge.node)){
                    pq.push({edge: [nextNode, edge.node],priority: edge.weight});                
                    var found =0;
                    for(var i=0;i<edges[nextNode].length;i++){
                        if(edges[nextNode][i].node === edge.node && edges[nextNode][i].weight ===edge.weight){
                            temp = {edge: [nextNode,edge.node], colour:"blue"};
                            copyEdges[nextNode][i].colour = "blue";
                            found =1;
                            break;
                        }
                    }
    
                    if(found ===0){
                        for(var i=0;i<edges[edge.node].length;i++){
                            if(edges[edge.node][i].node === nextNode && edges[edge.node][i].weight === edge.weight){
                                temp = {edge:[edge.node,nextNode], colour:"blue"};
                                copyEdges[edge.node][i].colour = "blue";
                                found =1;
                                break;
                            }
                        }
                    }
                    if(temp!==null){
                        resultEdges.push(temp);
                    }
                }
           });  
           sample.push([-1,resultEdges,"new blue edges",pq.length]);
           s = nextNode;
        }
     }

    console.log(sample);
    return sample;
     //return result;
}