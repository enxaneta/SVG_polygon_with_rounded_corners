function getPoints(poly){// poly is the polygon element
let polyPoints = poly.getAttribute("points").replace(/\r?\n|\r|\t|  +/g, "").replace( /\-/g, " -").split(/[ ,]+/);
polyPoints = removeEmptyElements(polyPoints);
console.log(polyPoints);
// remove last point if equal with the first point 
if(polyPoints[0] == polyPoints[polyPoints.length - 2] &&
   polyPoints[1] == polyPoints[polyPoints.length - 1]){polyPoints.splice(-2,2);}

let points = [];
for(let i = 0; i < polyPoints.length; i+= 2){
  let temp = [Number(polyPoints[i]),Number(polyPoints[i+1])];
  points.push(temp);
}
return points;
 /*output: [
  [10,10],[50,30],[100,10],[100,90],[10,90]
];*/
}

function getAngle(c,l){
  let delta_x = l.x - c.x;
  let delta_y = l.y - c.y;
  let a = Math.atan2(delta_y,delta_x);
  return a;//rad;
}

function removeEmptyElements(array){
  for(let i = 0; i< array.length; i++){
    if(array[i] == ""){array.splice(i,1)}
  }
  return array;
}

function polygonWithRoundedCorners(poly, r){
  
 let points = getPoints(poly);
 let d = ""

for(let i = 0;i< points.length;i++){
  let previous = i-1 >=0 ? i-1 : points.length-1;
  let next = i+1 < points.length ? i+1 : 0;
  
  let c = {}
  c.x = points[i][0];
  c.y = points[i][1];
  let l1 = {}
  l1.x = points[previous][0];
  l1.y = points[previous][1];
  let l2 = {}
  l2.x = points[next][0];
  l2.y = points[next][1]; 
  let a1 = getAngle(c,l1);
  let a2 = getAngle(c,l2);
  
  let x1 = c.x + r*Math.cos(a1);
  let y1 = c.y + r*Math.sin(a1);

  let x2 = c.x + r*Math.cos(a2);
  let y2 = c.y + r*Math.sin(a2);

  
  d +="L"+x1+","+y1+ " Q" + c.x+","+c.y+" "+ x2+","+y2
}

d+="Z";// close the path
return d.replace("L","M");// the first command is "M" 
}
