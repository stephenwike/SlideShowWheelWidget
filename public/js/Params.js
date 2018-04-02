// Collection
var Styles = {};

// Properties
function getCollection(){return document.getElementById('slideshow-wheel-widget-collection');}
function getStyles(){return document.getElementById('slideshow-wheel-widget-style');}

// Methods
function ReloadUserInputs()
{
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
}

function GetProvidedParams()
{
	var canvas = getCanvas();
	if (canvas != undefined)
	{
		var params = JSON.parse(canvas.getAttribute('value'));
		CenterX = params.CenterX || 0;
		CenterY = params.CenterY || 0;
		WheelRadius = params.WheelRadius || 200;
		CenterPaddingRadius = params.CenterPaddingRadius || 100;
		GridMode = params.GridMode || false;
		IsRounded = params.IsRounded || false;
		HasLabels = params.HasLabels || false;
		WheelBeginTheta = params.WheelBeginTheta || 0;
		WheelEndTheta = params.WheelEndTheta || Math.PI;
		SubDivisions = params.SubDivisions || 7;
		SlidePadding = params.SlidePadding || 10;
	}
}

function GetStyles()
{
	try
	{
		// Reset Styles
		Styles = [];
		
		// Get User Defines Styles
		var styles = getStyles();
		if (styles != undefined)
		{
			var params = JSON.parse(styles.getAttribute('value'));
			Styles.Label_LineWidth = params.Label_LineWidth  || 0.25;
			Styles.Label_Font = params.Label_Font = "35px Elephant";
			Styles.Label_Fill = params.Label_Fill = "#628edd";
			Styles.Label_Stroke = params.Label_Stroke = "black";
			Styles.Label_Align = params.Label_Align = "center";
		}
		else
		{
			Styles.Label_LineWidth = 0.25;
			Styles.Label_Font = "35px Elephant";
			Styles.Label_Fill = "#628EDD";
			Styles.Label_Stroke = "black";
			Styles.Label_Align = "center";
		}
	}
	catch (err)
	{
		myAlert("GetStyles():");
		myAlert(err);
	}
}