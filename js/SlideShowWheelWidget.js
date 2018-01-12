window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

//IMAGES
var Images = [];
var img1 = new Image(400, 400);
img1.src = 'img/testimage1.jpg';
Images.push(img1);
var img2 = new Image(400, 400);
img2.src = 'img/testimage2.jpg';
Images.push(img2);
var img3 = new Image(400, 400);
img3.src = 'img/testimage3.jpg';
Images.push(img3);
var img4 = new Image(400, 400);
img4.src = 'img/testimage4.jpg';
Images.push(img4);
var img5 = new Image(400, 400);
img5.src = 'img/testimage5.jpg';
Images.push(img5);

//CONSTANTS
const AnimationSpeed = 15;
const DefaultStepSize = 0.001;
const MaxStepSize = 0.006;
const CenterX = 800;
const CenterY = 600;
const WheelRadius = 550;
const WheelBeginTheta = 0*Math.PI;
const WheelEndTheta = 0.5*Math.PI;
const SubDivisions = 13;
const SlideMargin = 10;
const PictureWidth = 400;
const PictureHeight = 400;

//STATE CONSTANTS
const GridMode = false;
const isRounded = true;

//PRIVATE GLOBAL VARIABLES
var StepSize = 0.001;
var MasterTheta = 0;
var CenterButton_Radius = 300;
var CenterButton_Padding = 20;
var Slides = [];
var Slide_Padding = 10;

//DERIVED VARIABLES
var CenterButton_PaddingRadius = CenterButton_Radius + CenterButton_Padding;
var HalfTheta = Math.PI / SubDivisions;
var HalfBaseLength = CenterButton_PaddingRadius * Math.tan(HalfTheta);
var HalfTopLength = WheelRadius * Math.tan(HalfTheta);

//PUBLIC PROPERTIES
function getContext(){return getCanvas().getContext('2d');}
function getCanvas(){return document.getElementById('slideShowWheelCanvas');}
	
function SlideShowWheelWidget_Start()
{
	CreateSlides();
}

function animate()
{
	ClearCanvas();
	Update();
	RenderSlides();
	RenderGUI();
	if (GridMode) RenderGrid();

	// request new frame
	setTimeout(function() {
        animate();
      }, AnimationSpeed);
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
	UpdateSlides();
	MakeInterfaceAdjustments();
}

 //wait one second before starting animation
      setTimeout(function() {
        animate();
      }, 10);