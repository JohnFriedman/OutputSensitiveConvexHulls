var points = [];
var canvas;
var context;

function addPoint(event)
{
	var x = event.offsetX;
	var y = event.offsetY;
	console.log("x: " + x + " y: " + y);
	points.push({x: x, y: y});
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	context.fillStyle = 'red';
	context.beginPath();
	context.arc(x, y, 3, 2 * Math.PI, false);
	context.fill();
	context.stroke();
}

var lines = [];
var numLines = 0;

function startSim()
{
	if(points.length < 3)
		alert("Not enough points!")
	else
	{
		organizeLines();
		window.requestAnimationFrame(fullSim);
	}
}

function oneStep()
{
	if(points.length < 3)
		alert("Not enough points!");
	else
	{
		if(lines.length === 0)
			organizeLines();
		if(numLines === lines.length)
			alert("All lines drawn!");
		else
			window.requestAnimationFrame(next);
	}
}

function organizeLines()
{	
	lines = [];
	for(var p = 1; p < points.length; p++)
		lines.push({p1: points[p-1], p2: points[p]});
	lines.push({p1: points[points.length - 1], p2: points[0]});
}

function next()
{
	var current = lines[numLines];
	context.beginPath();
	context.moveTo(current.p1.x, current.p1.y);
	context.lineTo(current.p2.x, current.p2.y);
	context.stroke();
	numLines++;
}

function fullSim()
{
	var timeLast = Date.now();
	while(Date.now() < timeLast + 500) {}
	timeLast = Date.now();
	next();
	if(numLines < lines.length)
		window.requestAnimationFrame(fullSim);
}
