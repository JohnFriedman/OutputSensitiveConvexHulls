var points = [];
points.push({x: 30, y: 30});
points.push({x: 300, y: 200});
points.push({x: 200, y: 300});

var lines = [];
lines.push({p1: points[0], p2: points[1]});
lines.push({p1: points[1], p2: points[2]});
lines.push({p1: points[2], p2: points[0]});


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.fillStyle = 'black';

var iteration = 0;
var timeOfLastDrawing = Date.now();
window.requestAnimationFrame(function loop() {
  while (Date.now() < timeOfLastDrawing + 500) { var i = 1; }
  timeOfLastDrawing = Date.now();
  iteration += 1;
  context.clearRect(0, 0, 400, 400);
  for (i = 0; i < points.length; i++) {
    var current = points[i];
    context.beginPath();
    context.arc(current.x, current.y, 3, 2 * Math.PI, false);
    context.fill();
    context.stroke();
  }
  
  for (i = lines.length - 1; i >= 0; i--) {
    if (i !== iteration % 3) { continue; }
    var current = lines[i];
    context.beginPath();
    context.moveTo(current.p1.x, current.p1.y);   
    context.lineTo(current.p2.x, current.p2.y);
    context.stroke();
  }
  window.requestAnimationFrame(loop);
})
