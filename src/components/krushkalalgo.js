import heap from "js-heap";
import _ from "lodash";


//blue inqueue green inpath purple outof queue purple fpr path

class UnionFind {
    
    constructor(size) {
        this.parent = new Array(size);
        for(let i = 0; i < size; i++) {
            this.parent[i] = i;
        }
        this.rank = new Array(size);
    }
    
    find(x) {
        var path = [];
        path.push(x);
        while(x !== this.parent[x]){
            x = this.parent[x];
            path.push(x);
        }
        console.log(path);
        // if(this.parent[x] !== x) {
        //     this.parent[x] = this.find(this.parent[x]);
        // }
        return this.parent[x];
    }
    
    union(x,y) {
        let xr = this.find(x);
        let yr = this.find(y);
        if(xr === yr) {
            return false; // already have the same parent
        }
        else if(this.rank[xr] < this.rank[yr]) {
            this.parent[xr] = yr;
        } else if(this.rank[xr] > this.rank[yr]) {
            this.parent[yr] = xr;
        } else {
            // same height
            this.parent[yr] = xr;
            this.rank[xr]++;
        }
        return true;
    }

    connected(x,y){
        if(this.find(x)===this.find(y)){
            return true;
        }
        return false;
    }
}

export function krushkal(vertices,edges){
    let pq = new heap(function(a,b){
        return b.priority - a.priority;
    });

    for(var i=0;i<edges.length;i++){
        for(var j=0;j<edges[i].length;j++){
            var edge = edges[i][j];
            var newEdge = [i,edge.node];
            pq.push({edge: newEdge,priority:edge.weight});
        }
    }

    let uf = new UnionFind(vertices);
    var sample = [];
    
    var colour = "";
    while (!pq.isEmpty()) {
        let nextEdge = pq.pop();
        let nodes = nextEdge.edge;
        var tempVer = {from:nodes[0],to:nodes[1],colour:"#996600"};
        sample.push(tempVer);
        if (!uf.connected(nodes[0], nodes[1])) {
            colour = "green";
            uf.union(nodes[0], nodes[1]);
            tempVer = {from:nodes[0],to:nodes[1],colour:"green"};
        }
        else{
            colour = "white";
            tempVer = {from:nodes[0],to:nodes[1],colour:"white"};
        }
        sample.push(tempVer);
     }
     return sample;
}