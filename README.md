# OutputSensitiveConvexHulls

Introduction:
The scope of this project is to visualize an output sensative convex hull algorithm running in O(nlogh).

Convexity: 
A set X in R-d is convex if for all x and y in X, the line created by x and y is in X.

Convex Hull:
The sequence of points in a set P describing the minimal convex polygon containing all points in P.

Languages and Tools:
We chose to create a web based visualization.
This means we will use javascript, HTML, and canvas.
A basic proof of concept of working with the visualization tools is included.

Algorithm:
This project focuses on visualizing an O(nlogh) algorithm for finding convex hulls.
We decided to visualize chan's algorithm.
It combines a standard O(nlogn) algorithm (Graham Scan) with the Jarvis's march algorithm.
This algorithm's time complexity depends on the size of the solution through h.
h represents the number of vertices in the convex hull of the input.
This is where "Output Sensitive" comes from.

Design:
Drawing of design is in the Visual Design.jpeg

Have point placement phase with 2 options.
1. Randomly Generated Points
2. User Placed Points
Upon pressing enter, the animation begins with the points that were placed.
The animation will show the lines we know are in the convex hull as we go through the algorithm.
It will also show each line being considered during the Jarvis's March phase.
Refresing the page will restart animation at point placement phase.
