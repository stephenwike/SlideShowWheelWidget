// setup requestAnimFrame
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

// Provided Variables
var CenterX = 0;
var CenterY = 0;
var WheelRadius = 200;
var CenterPaddingRadius = 100;
var GridMode = false;
var IsRounded = false;
var HasLabels = false;
var WheelBeginTheta = 0;
var WheelEndTheta = Math.PI;//2*Math.PI;
var SubDivisions = 12;
var SlidePadding = 10;

// Constants
var AnimationSpeed = 80;
var StepSizeAcceleration = 0.0008;

// Global Variables
var MasterTheta = 0;
var StepSize = 0.01;
var Slides = [];

// Derived Variables
var HalfTheta;
var HalfBaseLength;
var HalfTopLength;

// Properties
function getContext(){return getCanvas().getContext('2d');}
function getCanvas(){return document.getElementById('slideshow-wheel-widget-container');}

// Methods
(function Start()
{
	// Set EventListener
	var canvas = getCanvas();
	if (canvas != null)
	{
		myAlert("Adding Listener...");
		canvas.addEventListener('reload', ReloadUserInputs, false);
	}
	
	// Get and parse provided variables
	GetProvidedParams();
	
	// Get user provided styleSheets
	GetStyles();
	
	// Calculate Derived Variables
	DeriveVariables();
	
	// Load Images from Slides.js
	LoadImages();
	
	// Create Slides from Slides.js
	CreateSlides();
	
	// Start Animation
	Animate();
}())

function DeriveVariables()
{
	HalfTheta = Math.PI / SubDivisions;
	HalfBaseLength = CenterPaddingRadius * Math.tan(HalfTheta);
	HalfTopLength = WheelRadius * Math.tan(HalfTheta);
}

function Animate()
{
	try
	{
		ClearCanvas();
    	Update();
    	RenderSlides();
    	if (GridMode) RenderGrid();
		if (HasLabels) RenderLabels();

    	// request new frame
    	setTimeout(function() {
    	  Animate();
    	}, AnimationSpeed);
	}
	catch(err)
    {
    	myAlert("Animate():");
		myAlert(err);
    }
}

function ClearCanvas()
{
    getContext().clearRect(0, 0, getCanvas().width, getCanvas().height);
}

function Update()
{
	MasterTheta += StepSize;
    if (MasterTheta > 2*Math.PI) MasterTheta -= 2*Math.PI;
    if (MasterTheta < -2*Math.PI) MasterTheta += 2*Math.PI;
    //MakeInterfaceAdjustments();
	UpdateSlides();
}