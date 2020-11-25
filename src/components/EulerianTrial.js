export function Trail(edgePair,vertices){
    var g = [];
    var i;
    var edgePointer = [];
    var edgeUsed = [];
    var trail = [];
    
    var edgeTraverseOrder=[];
    var nodeTraverseOrder = [];

    var id = {};
    var idReverse = [];
    var idCount = 0;

    function getId(x) {
        if (!id.hasOwnProperty(x)) {
        edgePointer[idCount] = 0;
        idReverse[idCount] = x;
        id[x] = idCount++;
        }
        return id[x];
    }
    

    function dfs(v){
        for (; edgePointer[v] < g[v].length; edgePointer[v] += 1) {
            nodeTraverseOrder.push(v);
            var edge = g[v][edgePointer[v]];
            var to = edge[0];
            var id = edge[1];
            if (!edgeUsed[id]) {
                edgeUsed[id] = true;
                edgeTraverseOrder.push(id);
                dfs(to);
            }
        }
        nodeTraverseOrder.push(v - 51);
        trail.push(v);
    }
    
    function pushEdge(u, v, id) {
        g[u] = g[u] || [];
        g[v] = g[v] || [];
        g[u].push([v, id]);
    }
    
    // main
    var inDeg = [], outDeg = [];
    for (i = 0; i < edgePair.length; i += 1) {
        var edge = edgePair[i];
        var u = getId(edge[0]);
        var v = getId(edge[1]);
        pushEdge(u, v, i);
    
        outDeg[u] = outDeg[u] || 0;
        inDeg[u] = inDeg[u] || 0;
        outDeg[v] = outDeg[v] || 0;
        inDeg[v] = inDeg[v] || 0;
        outDeg[u] += 1;
        inDeg[v] += 1;
    }
    
    function checkDirected() {
        var oddVertex = 0;
        var start = 0, end;
        for (i = 0; i < idCount; i += 1) {
            if (outDeg[i] - inDeg[i] !== 0) {
                if (outDeg[i] > inDeg[i]) {
                    start = i;
                } 
                else {
                    end = i;
                }
                oddVertex += 1;
            }
        }
        return {odd: oddVertex, start: start};
    }
    console.log(idCount);
    if(idCount !== vertices){
        alert("The given graph is not strongly connected");
    }
    
    var check = checkDirected();
    if (check.odd % 2 !== 0 || check.odd > 2) {
        alert("The given graph does not have Eulerian Trail");
        return null;
    }

    dfs(check.start);
    
    if (trail.length !== edgePair.length + 1) {
        alert("The given graph does not have Eulerian Trail");
        return null;
    }
    
    trail.reverse();
    return {
        trial : trail,
        vertices : nodeTraverseOrder,
        path : edgeTraverseOrder
    }
}