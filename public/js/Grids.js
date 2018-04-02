// Constants
var MasterThetaLineWidth = 3;
var MasterThetaLineColor = "purple";
var pointWidth = 2;
var LineWidth = 0.5;
var pointBegin = 0;
var pointEnd = 2*Math.PI;
var LineColor = "rgba(255,255,255,0.8)";
var pointColor = '#111';
var marginColor = "rgba(255,255,255,0.5)";

function RenderGrid()
{
    Render_WidgetCircle();
    Render_SubSectionCenterLines();
    Render_SubSectionLines();
    Render_CenterButtonPadding();
    Render_SubSectionPoints();
    Render_SubSectionPictureFrames();
	Render_MasterThetaLine();
	Render_CenterPoint();
}

function Render_WidgetCircle()
{
    var ctx = getContext();

    // Define Path
    ctx.beginPath();
    ctx.arc(CenterX, CenterY, WheelRadius, pointBegin, pointEnd);

    // Render Path
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
}

function Render_SubSectionCenterLines()
{
    for (var i = 0; i < Slides.length; ++i)
    {
        Render_SubSectionCenterLine(Slides[i].CurrentTheta);
    }
}

function Render_SubSectionCenterLine(Theta)
{
    var ctx = getContext();

    // Define Path
    ctx.beginPath();
    ctx.moveTo(CenterX, CenterY);
    x = CenterX - WheelRadius * Math.cos(Theta);
    y = CenterY - WheelRadius * Math.sin(Theta);
    ctx.lineTo(x, y);

    // Render Path
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
}

function Render_SubSectionLines()
{
    for (var i = 0; i < Slides.length; ++i)
    {
        Render_SubSectionLine(Slides[i].CurrentTheta + (1/SubDivisions) * Math.PI);
    }
}

function Render_SubSectionLine(Theta)
{
    var ctx = getContext();

    //DEFINE PATH
    ctx.beginPath();
    ctx.moveTo(CenterX, CenterY);
    // x = radius * cos ( theta )
    x = CenterX - WheelRadius * Math.cos(Theta);
    // y = radius * sin ( theta )
    y = CenterY - WheelRadius * Math.sin(Theta);
    ctx.lineTo(x, y);

    //RENDER PATH
    ctx.lineWidth = SlidePadding * (11/6);
    ctx.strokeStyle = marginColor;
    ctx.stroke();
}

function Render_CenterButtonPadding()
{
        var ctx = getContext();

        //DEFINE PATH
        ctx.beginPath();
        var arcBegin = 0;
        var arcEnd = 2*Math.PI;
        ctx.arc(CenterX, CenterY, CenterPaddingRadius, arcBegin, arcEnd);

        //RENDER PATH
        ctx.lineWidth = LineWidth;
        ctx.strokeStyle = LineColor;
        ctx.stroke();
}

function Render_SubSectionPoints()
{
    for (var i = 0; i < Slides.length; ++i)
    {
        Render_SubSectionPoint(Slides[i]);
    }
}

function Render_SubSectionPoint(Slide)
{
    if (IsRounded)
    {
        Render_SlidePivotPoint(Slide);
    }
    else
    {
        Render_SlideBaseCenterPoint(Slide);
        Render_SlideBaseLeftPoint(Slide);
        Render_SlideBaseRightPoint(Slide);
        Render_SlideTopCenterPoint(Slide);
        Render_SlideTopLeftPoint(Slide);
        Render_SlideTopRightPoint(Slide);
        Render_SlideCenterPoint(Slide);
    }
}

function Render_SlidePivotPoint(Slide)
{
    var ctx = getContext();

    //DEFINE PATH
    ctx.beginPath();
    ctx.arc(Slide.SlidePivotPointX, Slide.SlidePivotPointY, pointWidth, pointBegin, pointEnd);

    //RENDER PATH
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
    ctx.fill();
}

function Render_SlideBaseCenterPoint(Slide)
{
    var ctx = getContext();

    //DEFINE PATH
    ctx.beginPath();
    ctx.arc(Slide.SlideBasePointX, Slide.SlideBasePointY, pointWidth, pointBegin, pointEnd);

    //RENDER PATH
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
    ctx.fill();
}

function Render_SlideBaseLeftPoint(Slide)
{
    var ctx = getContext();

    //DEFINE PATH
    ctx.beginPath();
    ctx.arc(Slide.BaseLeftPointX, Slide.BaseLeftPointY, pointWidth, pointBegin, pointEnd);

    //RENDER PATH
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
    ctx.fill();
}

function Render_SlideBaseRightPoint(Slide)
{
    var ctx = getContext();

    //DEFINE PATH
    ctx.beginPath();
    ctx.arc(Slide.BaseRightPointX, Slide.BaseRightPointY, pointWidth, pointBegin, pointEnd);

    //RENDER PATH
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
    ctx.fill();
}

function Render_SlideTopCenterPoint(Slide)
{
    var ctx = getContext();

    //DEFINE PATH
    ctx.beginPath();
    ctx.arc(Slide.SlideTopPointX, Slide.SlideTopPointY, pointWidth, pointBegin, pointEnd);

    //RENDER PATH
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
    ctx.fill();
}

function Render_SlideTopLeftPoint(Slide)
{
    var ctx = getContext();

    //DEFINE PATH
    ctx.beginPath();
    ctx.arc(Slide.TopLeftPointX, Slide.TopLeftPointY, pointWidth, pointBegin, pointEnd);

    //RENDER PATH
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
    ctx.fill();
}

function Render_SlideTopRightPoint(Slide)
{
    var ctx = getContext();
    
    //DEFINE PATH
    ctx.beginPath();
    ctx.arc(Slide.TopRightPointX, Slide.TopRightPointY, pointWidth, pointBegin, pointEnd);
    
    //RENDER PATH
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
    ctx.fill();
}

function Render_SlideCenterPoint(Slide)
{
    var ctx = getContext();

    //DEFINE PATH
    ctx.beginPath();
    ctx.arc(Slide.CenterX, Slide.CenterY, pointWidth, pointBegin, pointEnd);

    //RENDER PATH
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
    ctx.fill();
}

function Render_SubSectionPictureFrames()
{
    for (var i = 0; i < Slides.length; ++i)
    {
        Render_SubSectionPictureFrame(Slides[i]);
    }
}

function Render_SubSectionPictureFrame(Slide)
{
    var ctx = getContext();

    //DEFINE PATH
    ctx.beginPath();
    ctx.rect(Slide.CenterX - MinImageDimension / 2, Slide.CenterY - MinImageDimension / 2, MinImageDimension, MinImageDimension);

    //RENDER PATH
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fill();
}

function Render_MasterThetaLine()
{
    var ctx = getContext();

    // Define Path
    ctx.beginPath();
    ctx.moveTo(CenterX, CenterY);
    x = CenterX - WheelRadius * Math.cos(MasterTheta);
    y = CenterY - WheelRadius * Math.sin(MasterTheta);
    ctx.lineTo(x, y);

    // Render Path
    ctx.lineWidth = MasterThetaLineWidth;
    ctx.strokeStyle = MasterThetaLineColor;
    ctx.stroke();
}

function Render_CenterPoint()
{
    var ctx = getContext();

    // Define Path
    ctx.beginPath();
    ctx.arc(CenterX, CenterY, pointWidth, pointBegin, pointEnd);

    // Render Path
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = LineColor;
    ctx.stroke();
    ctx.fill();
}