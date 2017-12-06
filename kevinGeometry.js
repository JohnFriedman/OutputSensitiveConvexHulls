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
//	for(var i = 0; i < points.length; i++)
//		drawPoint(points[i].x, points[i].y);
    colorList = [];
    colorList.push("black");
    colorList.push("red");
    colorList.push("yellow");
    colorList.push("blue");
    colorList.push("green");
    colorList.push("purple");
    colorList.push("orange");
    colorList.push("pink");
    colorList.push("brown");
    colorList.push("cyan");
    colorList.push("maroon");
    colorList.push("violet");
    colorList.push("silver");
    colorList.push("teal");
    colorList.push("olive");
    for (var i = 0; i < splits.length; i++){
        context.fillStyle = colorList[i % colorList.length];
        for (var j = 0; j < splits[i].length; j++) {
            drawPoint(splits[i][j].x, splits[i][j].y);
        }
    }

}

function ccw(a, b, c)
{
	return Math.sign((b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y));
}

var linesInConvexHull = [];
var linesInConsideration = [];
var splits = [];
var splitsConvexHulls = [];
var currentGrahamStack = [];

function drawAllLines() {
    console.log(currentGrahamStack);
    for(var i = 0; i < currentGrahamStack.length - 1; i++) {
        context.strokeStyle = 'red';
        var current1 = currentGrahamStack[i];
        var current2 = currentGrahamStack[i + 1];
        context.beginPath();
        context.moveTo(current1.x, current1.y);
        context.lineTo(current2.x, current2.y);
        context.stroke();
        context.strokeStyle = 'black';
    }
    for(var i = 0; i < splitsConvexHulls.length; i++) {
        for (var j = 0; j < splitsConvexHulls[i].length; j++) {
            context.fillStyle = 'black';
            var current1 = splitsConvexHulls[i][j];
            var current2 = splitsConvexHulls[i][(j + 1) % splitsConvexHulls[i].length];
            context.beginPath();
            context.moveTo(current1.x, current1.y);
            context.lineTo(current2.x, current2.y);
            context.stroke();
        }
    }
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
    for (var i = 0; i < splits.length; i++){

    }
}
var t = 0;
var m;
var algorithmStep = 0;
var n;
var whichPartitionForGrahamScan = 0;
// 0 is partition phase
// 1 is graham scan preprocessing
// 2 is graham scan pushing phase
// 3 is graham scan popping phase

function grahamScansQuickSort(leftMost, array) {
    if (array.length < 2) {
        return array;
    }
    var pivotIndex = Math.floor(Math.random() * array.length);
    var pivot = array[pivotIndex];
    var lessThan = [];
    var greaterThan = [];
    for (var i = 0; i < array.length; i++) {
        if (i === pivotIndex) {
            continue;
        }
        //Comparator to check which is more to the right or "less than"
        if (ccw(leftMost, pivot, array[i]) < 0) {
            lessThan.push(array[i]);
        } else {
            greaterThan.push(array[i]);
        }
    }
    var sortedLeft = grahamScansQuickSort(leftMost, lessThan);
    var sortedRight = grahamScansQuickSort(leftMost, greaterThan);
    var retList = [];
    for (var i = 0; i < sortedLeft.length; i++) {
        retList.push(sortedLeft[i]);
    }
    retList.push(pivot);
    for (var i = 0; i < sortedRight.length; i++) {
        retList.push(sortedRight[i]);
    }
    return retList;
}

function getIndexOfLeftmost(list) {
    var currentIndex = 0;
    for (var i = 1; i < list.length; i++) {
        if (list[i].x < list[currentIndex].x) {
            currentIndex = i;
        }
    }
    return currentIndex;
}

var currentLeftmost;
var currentSortedByAngleFromLeftmost;
var currentGrahamIncrementer;
function nextStep() {
    console.log("algorithmStep = " + algorithmStep);
    if (algorithmStep === 3) {
        var l = currentGrahamStack.length;
        var stack = currentGrahamStack;
        if (ccw(stack[l - 3], stack[l - 2], stack[l - 1]) < 0) {
            //This mean it is a right turn
            var save = stack.pop();
            stack.pop();
            stack.push(save);
        } else {
            if (currentGrahamIncrementer === currentSortedByAngleFromLeftmost.length) {
                //This means we have finished this partition's graham scan
                splitsConvexHulls.push(currentGrahamStack);
                whichPartitionForGrahamScan++;
                if (whichPartitionForGrahamScan === splits.length) {
                    //This means we have done graham scan on all partitions
                    algorithmStep = 4;
                } else {
                    algorithmStep = 1;
                }
            } else {
                algorithmStep = 2;
            }
        }
    } else if (algorithmStep == 2) {
        console.log("stack before pushing: " + currentGrahamStack);
        currentGrahamStack.push(currentSortedByAngleFromLeftmost[currentGrahamIncrementer]);
        console.log("stack after pushing: " + currentGrahamStack);
        currentGrahamIncrementer++;
        algorithmStep = 3;
    } else if (algorithmStep === 1) {
        var currentSplit = splits[whichPartitionForGrahamScan];
        var leftmostIndex = getIndexOfLeftmost(currentSplit);
        var listWithoutLeftmost = [];
        var leftmost = currentSplit[leftmostIndex];
        for (var i = 0; i < currentSplit.length; i++) {
            if (i === leftmostIndex) {
                continue;
            }
            listWithoutLeftmost.push(currentSplit[i]);
        }
        var sortedList = grahamScansQuickSort(leftmost, listWithoutLeftmost);
        var stack = [];
        stack.push(leftmost);
        stack.push(sortedList[0]);
        currentGrahamStack = stack;
        currentLeftmost = leftmost;
        currentSortedByAngleFromLeftmost = sortedList;
        currentGrahamIncrementer = 1;
        algorithmStep = 2;
    } else if (algorithmStep === 0) {
        n = points.length;
        t = t + 1;
        m = Math.pow(2, Math.pow(2, t));
        var k = (Math.ceil(n / m) * m) - n;
        //k is number of partitions of size m - 1

        var incrementerForPartitions = 0;
        for (var i = 0; i < Math.ceil(n / m); i++) {
            var temp = [];
            if (i < k) {
                for (var j = 0; j < m - 1; j++) {
                    temp.push(points[incrementerForPartitions]);
                    incrementerForPartitions++;
                }
            } else {
                for (var j = 0; j < m; j++) {
                    temp.push(points[incrementerForPartitions]);
                    incrementerForPartitions++;
                }
            }
            splits.push(temp);
        }
        algorithmStep = 1;
    }
}














var alreadyClickedOnce = false;

function stepLoop() {
    nextStep();
    context.clearRect(0, 0, 400, 400);
    drawAllPoints();
    drawAllLines();
}

function initialize() {
    window.requestAnimationFrame(stepLoop);
}

function oneStep() {
    if(alreadyClickedOnce) {
        window.requestAnimationFrame(stepLoop);
    }
    else{
        initialize();
        alreadyClickedOnce = true;
    }
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

