var points = [];
var canvas;
var context;
var numLines;

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
	numLines = 0;
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

var chPoints = [];

function jarvis()
{
	chPoints = [];
	var n = points.length;
	var left = 0;
	for(var i = 1; i < n; i++)
	{
		if(points[i].x < points[left].x)
			left = i;
	}
	var a = left;
	var b;
	do
	{
		b = (a + 1) % n;
		for(var i = 0; i < n; i++)
		{
			if(ccw(points[a], points[i], points[b]) === 1)
				b = i;
		}
		chPoints.push(points[b]);
		a = b;
	}
	while(a != left);
}

function ccw(a, b, c)
{
	return Math.sign((b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y));
}

var lines = [];

function startSim()
{
	if(points.length < 3)
		alert("Not enough points!")
	else
	{
		numLines = 0;
		clearLines();
		jarvis();
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
		{
			jarvis();
			organizeLines();
		}
		if(numLines === lines.length)
			alert("All lines drawn!");
		else
			window.requestAnimationFrame(next);
	}
}

function organizeLines()
{	
	lines = [];
	for(var p = 1; p < chPoints.length; p++)
		lines.push({p1: chPoints[p-1], p2: chPoints[p]});
	lines.push({p1: chPoints[chPoints.length - 1], p2: chPoints[0]});
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

function clearLines()
{
	context.clearRect(0, 0, 400, 400);
	drawAllPoints();
	numLines = 0;
}
