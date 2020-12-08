function calculatePoints (points, t) {
    var p1X = points[0][0], //x coord of first point
        p1Y = points[0][1], //y coord of first point
        p2X = points[1][0], //x coord of second point
        p2Y = points[1][1]; //y coord of second point

    var pInterX = p1X + (p2X - p1X) * t,
        pInterY = p1Y + (p2Y - p1Y) * t;

    return [pInterX, pInterY];
}
export function deCasteljau (points, t) {
    const len = points.length;
    if (len === 1) {
      return points[0];
    } else {
      let p = [];
      for (let i = 0; i < len - 1; i++) {
        const p1 = points[i],
          		p2 = points[i + 1];
        p.push([
          (1 - t) * p1[0] + t * p2[0],
          (1 - t) * p1[1] + t * p2[1]
        ]);
      }
      return deCasteljau(p, t);
    }
}
