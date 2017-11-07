var points = [];
points.push({x: 30, y: 30});
points.push({x: 300, y: 200});
points.push({x: 200, y: 300});

var lines = [];
lines.push({p1: points[0], p2: points[1]});
lines.push({p1: points[1], p2: points[2]});



var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.fillStyle = 'black';
window.requestAnimationFrame(function loop() {
  for (i = 0; i < points.length; i++) {
    var current = points[i];
    context.beginPath();
    context.arc(current.x, current.y, 3, 2 * Math.PI, false);
    context.fill();
    context.stroke();
  }
  for (i = 0; i < lines.length; i++) {
    var current = lines[i];
    context.beginPath();
    context.moveTo(current.p1.x, current.p1.y);   
    context.lineTo(current.p2.x, current.p2.y);
    context.stroke();
  }
})
