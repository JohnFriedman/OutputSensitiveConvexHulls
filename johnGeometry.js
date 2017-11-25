var points = [];
function addPoint(event)
{
	var x = event.offsetX;
	var y = event.offsetY;
	console.log("x: " + x + " y: " + y);
	points.push({x: event.x, y: y});
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
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
		for(var p = 1; p < points.length; p++)
		{
			lines.push({p1: points[p - 1], p2: points[p]});
		}
		lines.push({p1: points[points.length - 1], p2: points[0]});
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		context.fillStyle = 'red';
		
		var iteration = 0;
		var timeOfLastDrawing = Date.now();
		window.requestAnimationFrame
		(
			function loop() 
			{
				while (Date.now() < timeOfLastDrawing + 500) 
				{}
			  	timeOfLastDrawing = Date.now();
			  	iteration++;
			  	context.clearRect(0, 0, 400, 400);
			  	for (var i = 0; i < points.length; i++) 
				{
					var current = points[i];
					context.beginPath();
					context.arc(current.x, current.y, 3, 2 * Math.PI, false);
					context.fill();
					context.stroke();
				}
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
				}
				window.requestAnimationFrame(loop);
			}
		)
	}
	else
		alert("Not enough points!");
}
