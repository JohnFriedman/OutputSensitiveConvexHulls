var points = [];
var lines = [];


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.fillStyle = 'black';



var iteration = 0;
var timeOfLastDrawing = Date.now();
window.requestAnimationFrame(function loop() {
  compute()
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
