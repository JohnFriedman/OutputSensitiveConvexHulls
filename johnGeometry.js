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

function startSim()
{
	
	if(points.length >= 3)
	{
		var lines = [];
		var numLines = 0;
		for(var p = 1; p < points.length; p++)
		{
			lines.push({p1: points[p - 1], p2: points[p]});
		}
		lines.push({p1: points[points.length - 1], p2: points[0]});
		
		var iteration = -1;
		var timeOfLastDrawing = Date.now();
		window.requestAnimationFrame
		(
			function loop() 
			{
				while (Date.now() < timeOfLastDrawing + 500) {}
			  	timeOfLastDrawing = Date.now();
			  	iteration++;
			  	//context.clearRect(0, 0, 400, 400);
				for (i = lines.length - 1; i >= 0; i--)
				{
					if (i !== iteration % lines.length) 
					{
						continue; 
					}
					var current = lines[i];
					context.beginPath();
					context.moveTo(current.p1.x, current.p1.y);   
					context.lineTo(current.p2.x, current.p2.y);
					context.stroke();
					numLines++;
				}
				if(numLines < lines.length)
					window.requestAnimationFrame(loop);
			}
		)
	}
	else
		alert("Not enough points!");
}
