var points = [];
var canvas;
var context;

function generatePoints(n)
{
	if(n > 1000)
		alert("Do not generate more than 1000 points. Even that is way too many")
	else
	{
		canvas = document.getElementById('canvas');
		context = canvas.getContext('2d');
		context.fillStyle = 'red';
		var width = canvas.width;
		var height = canvas.height;
		for(var i = 0; i < n; i++)
		{
			var x = 15 + Math.floor(Math.random() * (width - 30));
			var y = 15 + Math.floor(Math.random() * (height - 30));
			points.push({x: x, y: y});
			drawPoint(x, y);
		}
	}
}

function clickPoint(event)
{
	var x = event.offsetX;
	var y = event.offsetY;
	console.log("x: " + x + " y: " + y);
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	context.fillStyle = 'red';
	points.push({x: x, y: y});
	drawPoint(x, y);
}

function drawPoint(x, y)
{
	context.beginPath();
	context.arc(x, y, 3, 2 * Math.PI, false);
	context.fill();
	context.stroke();
}

function drawAllPoints()
{
	for(var i = 0; i < points.length; i++)
		drawPoint(points[i].x, points[i].y);
}

function ccw(a, b, c)
{
	return Math.sign((b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y));
}

var linesInConvexHull = [];
var linesInConsideration = [];

function drawAllLines() {
    for(var i = 0; i < linesInConvexHull.length; i++) {
        var current = linesInConvexHull[i];
        context.beginPath();
        context.moveTo(current.p1.x, current.p1.y);
        context.lineTo(current.p2.x, current.p2.y);
        context.stroke();
    }
    for(var i = 0; i < linesInConsideration.length; i++) {
        var current = linesInConsideration[i];
        context.fillStyle = 'red';
        context.beginPath();
        context.arccontext.moveTo(current.p1.x, current.p1.y);
        context.lineTo(current.p2.x, current.p2.y);
        context.stroke();
        context.fillStyle = 'black';
    }
}
var splits = [];
var t = 1;


function nextStep() {

}

function startSim() {
    timeLast = Date.now();
    window.requestAnimationFrame(function loop() {
        nextStep();
        while(Date.now() < timeLast + 500) {}
        timeLast = Date.now();
        context.clearRect(0, 0, 400, 400);
        drawAllPoints();
        drawAllLines();
        window.requestAnimationFrame(loop);
    });
}

