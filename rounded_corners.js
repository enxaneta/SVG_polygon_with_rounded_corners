let r; //roundness
let poly; // points of the polygon
let d; // the d attribute of the path

function getPoints(poly) {
  // poly is the  polygon element
  let polyPoints = poly
    .replace(/(\r?\n|\r|\t)+/g, "")
    .replace(/\-/g, " -")
    .split(/[ ,]+/);
  polyPoints = removeEmptyElements(polyPoints);
  console.log(polyPoints);
  // remove last point if equal with the first point
  if (
    polyPoints[0] == polyPoints[polyPoints.length - 2] &&
    polyPoints[1] == polyPoints[polyPoints.length - 1]
  ) {
    polyPoints.splice(-2, 2);
  }
  let points = [];
  for (let i = 0; i < polyPoints.length; i += 2) {
    let temp = [Number(polyPoints[i]), Number(polyPoints[i + 1])];
    points.push(temp);
  }
  return points;
  /*output: [  [10,10],[50,30],[100,10],[100,90],[10,90]];*/
}
function getAngle(c, l) {
  let delta_x = l.x - c.x;
  let delta_y = l.y - c.y;
  let a = Math.atan2(delta_y, delta_x);
  return a; //rad;
}
function removeEmptyElements(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == "") {
      array.splice(i, 1);
    }
  }
  return array;
}
function polygonWithRoundedCorners(poly, r) {
  let points = getPoints(poly);
  let d = "";
  for (let i = 0; i < points.length; i++) {
    let previous = i - 1 >= 0 ? i - 1 : points.length - 1;
    let next = i + 1 < points.length ? i + 1 : 0;
    let c = {};
    c.x = points[i][0];
    c.y = points[i][1];
    let l1 = {};
    l1.x = points[previous][0];
    l1.y = points[previous][1];
    let l2 = {};
    l2.x = points[next][0];
    l2.y = points[next][1];
    let a1 = getAngle(c, l1);
    let a2 = getAngle(c, l2);

    //if great precision is needed remove .toFixed(3)
    let x1 = (c.x + r * Math.cos(a1)).toFixed(3);
    let y1 = (c.y + r * Math.sin(a1)).toFixed(3);
    let x2 = (c.x + r * Math.cos(a2)).toFixed(3);
    let y2 = (c.y + r * Math.sin(a2)).toFixed(3);
    d += "L" + x1 + "," + y1 + " Q" + c.x + "," + c.y + " " + x2 + "," + y2;
  }
  d += "Z"; // close the path
  return d.replace("L", "M"); // the first command is "M"
}

onInput();

itr.addEventListener("input", onInput);

TA.addEventListener("input", onInput);

function onInput() {
  // the roundness value
  r = itr.value;
  // output the roundness
  val.innerHTML = r;
  // get the `points` attribute's value
  poly = TA.value;
  // set the value of the attribute `points` for the polygon
  thePoly.setAttributeNS(null, "points", poly);
  // reset the value of the viewBox attributes of the two svg elements
  resetViewBox();
  // the d attribute for the path
  d = polygonWithRoundedCorners(poly, r);
  // output the d attribute as the value of the output text area
  outputTA.value = d;
  rounded.setAttributeNS(null, "d", d);
}

function resetViewBox() {
  let BB = thePoly.getBBox();
  let viewBox = `${BB.x - 10} ${BB.y - 10} ${BB.width + 20} ${BB.height + 20}`;
  polygonSVG.setAttributeNS(null, "viewBox", viewBox);
  pathSVG.setAttributeNS(null, "viewBox", viewBox);
}
