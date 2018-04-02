// Render Variables
var frameBorderWidth = 1;
var frameBorderColor = '#DDD';

// Image Variables
var ImageCount = 0;
var RenderedImageCount = 0;
var MinImageDimension = 0;

//var ImageSource = [];
var Images = [];
var RenderedImages = [];

function LoadImages()
{
	// Reset Arrays
	Images = [];
	RenderedImages = [];
	
	// Reset Image Counts
	ImageCount = 0;
	RenderedImageCount = 0;
	
	// Parse Image Collections
	var collection = getCollection();
	if (collection != null)
		for(var child = collection.firstChild; child!==null; child=child.nextSibling)
		{
			if (child.tagName == 'IMG')
			{
				Images.push(child);
				++ImageCount;
			}
		}
}

function CreateSlides()
{
    try
    {
		Slides = [];
        for (var i = 0; i < SubDivisions; ++i)
        {
            var SubTheta = (i / SubDivisions) * (2 * Math.PI);
            var Theta = (WheelEndTheta - HalfTheta) - SubTheta;
            var newSlide = {
            	Image: null,
				ImageScaleRatio: 0,
                ThetaOffset: Theta,
                CurrentTheta: Theta,
                CenterX: 0,
                CenterY: 0,
                SlideBasePointX: 0,
                SlideBasePointY: 0,
                SlideTopPointX: 0,
                SlideTopPointY: 0,
                BaseLeftPointX: 0,
                BaseLeftPointY: 0,
                BaseRightPointX: 0,
                BaseRightPointY: 0,
                TopLeftPointX: 0,
                TopLeftPointY: 0,
                TopRightPointX: 0,
                TopRightPointY: 0,
				Style: null
           };
        Slides.push(newSlide);
    	}
    }
    catch(err)
    {
        myAlert("GetMinImageDimension(): " + err.Message);
    }
}

function UpdateSlides()
{
    try
    {
		// Test Order
		TestImageOrder();

		//For each slide
		for (var i = 0; i < Slides.length; ++i)
		{
			//Check for Image Addition and Removal
			if(
				((Slides[i].CurrentTheta + HalfTheta) > WheelBeginTheta && (Slides[i].CurrentTheta - HalfTheta) < WheelEndTheta)
				||
				((Slides[i].CurrentTheta + HalfTheta) > (WheelBeginTheta + 2*Math.PI) && (Slides[i].CurrentTheta - HalfTheta) < (WheelEndTheta + 2*Math.PI))
				||
				((Slides[i].CurrentTheta + HalfTheta) > (WheelBeginTheta - 2*Math.PI) && (Slides[i].CurrentTheta - HalfTheta) < (WheelEndTheta - 2*Math.PI))
			)
			{
				if (Slides[i].Image == null && StepSize > 0) Slides[i].Image = AddRenderedImage();
				if (Slides[i].Image == null && StepSize < 0) Slides[i].Image = AddRenderedImageReverse();
			}
			else
			{
				if (Slides[i].Image != null && StepSize > 0) Slides[i].Image = RemoveRenderedImage();
				if (Slides[i].Image != null && StepSize < 0) Slides[i].Image = RemoveRenderedImageReverse();
			}

			// Update Current Theta of Slide
			Slides[i].CurrentTheta = (Slides[i].ThetaOffset + MasterTheta);
			
			// Update canvas pounts
			UpdateSlidePoints(i);
			
			// Update Minimum Image Dimensions
			GetMinImageDimension();
		}
    }
    catch(err)
    {
        myAlert("UpdateSlides():")
		myAlert(err);
    }
}

function UpdateSlidePoints(i)
{
	try
	{
		//UPDATE SLIDE BASE CENTER POINT
		Slides[i].SlideBasePointX = CenterX - CenterPaddingRadius * Math.cos(Slides[i].CurrentTheta);
		Slides[i].SlideBasePointY = CenterY - CenterPaddingRadius * Math.sin(Slides[i].CurrentTheta);
		
		//UPDATE SLIDE BASE LEFT POINT
		Slides[i].BaseLeftPointX = Slides[i].SlideBasePointX - (HalfBaseLength - SlidePadding) * Math.sin(Slides[i].CurrentTheta);
		Slides[i].BaseLeftPointY = Slides[i].SlideBasePointY + (HalfBaseLength - SlidePadding) * Math.cos(Slides[i].CurrentTheta);
		
		//UPDATE SLIDE BASE RIGHT POINT
		Slides[i].BaseRightPointX = Slides[i].SlideBasePointX + (HalfBaseLength - SlidePadding) * Math.sin(Slides[i].CurrentTheta);
		Slides[i].BaseRightPointY = Slides[i].SlideBasePointY - (HalfBaseLength - SlidePadding) * Math.cos(Slides[i].CurrentTheta);
		
		//UPDATE SLIDE TOP CENTER POINT
		Slides[i].SlideTopPointX = CenterX - WheelRadius * Math.cos(Slides[i].CurrentTheta);
		Slides[i].SlideTopPointY = CenterY - WheelRadius * Math.sin(Slides[i].CurrentTheta);
		
		//UPDATE SLIDE TOP LEFT POINT
		Slides[i].TopLeftPointX = Slides[i].SlideTopPointX - (HalfTopLength - SlidePadding) * Math.sin(Slides[i].CurrentTheta);
		Slides[i].TopLeftPointY = Slides[i].SlideTopPointY + (HalfTopLength - SlidePadding) * Math.cos(Slides[i].CurrentTheta);
		
		//UPDATE SLIDE TOP RIGHT POINT
		Slides[i].TopRightPointX = Slides[i].SlideTopPointX + (HalfTopLength - SlidePadding) * Math.sin(Slides[i].CurrentTheta);
		Slides[i].TopRightPointY = Slides[i].SlideTopPointY - (HalfTopLength - SlidePadding) * Math.cos(Slides[i].CurrentTheta);
		
		//UPDATE SLIDE CENTER POINT
		Slides[i].CenterX = (Slides[i].SlideBasePointX + Slides[i].SlideTopPointX) / 2;
		Slides[i].CenterY = (Slides[i].SlideBasePointY + Slides[i].SlideTopPointY) / 2;
	}
	catch (err)
	{
		myAlert("UpdateSlidePoints():")
		myAlert(err);
	}
}

function AddRenderedImage()
{
    try
    {
        var movedImage = Images.shift();
        RenderedImages.unshift(movedImage); 
		++RenderedImageCount;
		--ImageCount;
        return movedImage;
    }
    catch (err)
    {
        myAlert("AddRenderedImage(): " + err.Message);
    }
}

function RemoveRenderedImage()
{
    try
    {
        Images.push(RenderedImages.pop());
		++ImageCount;
		--RenderedImageCount;
        return null;
    }
    catch (err)
    {
        myAlert("RemoveRenderedImage(): " + err.Message);
    }
}

function AddRenderedImageReverse()
{
    try
    {
        var movedImage = Images.pop();
        RenderedImages.push(movedImage);
		++RenderedImageCount;
		--ImageCount;
        return movedImage;
    }
    catch (err)
    {
        myAlert("AddRenderedImageReverse(): " + err.Message);
    }
}

function RemoveRenderedImageReverse()
{
    try
    {
        Images.unshift(RenderedImages.shift());
		++ImageCount;
		--RenderedImageCount;
        return null;
    }
    catch (err)
    {
        myAlert("RemoveRenderedImageReverse(): " + err.Message);
    }
}

function GetMinImageDimension()
{
	try
	{
		var a,b,c;
		a = Math.abs(Slides[0].TopRightPointX - Slides[0].BaseLeftPointX);
		b = Math.abs(Slides[0].TopRightPointY - Slides[0].BaseLeftPointY);
		var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
		MinImageDimension = c * 1.1;
	}
	catch (err)
	{
		myAlert("GetMinImageDimension():")
		myAlert(err);
	}
	
}

function RenderSlides()
{
    try
    {
        for (var i = 0; i < Slides.length; ++i)
        {
            if (Slides[i].Image != null)
            {
                if (IsRounded) RenderRoundedSlide(Slides[i]);
                else RenderSlide(Slides[i]);
            }
        }
    }
    catch(err)
    {
        myAlert("RenderSlides():");
		myAlert(err);
    }
}

function RenderRoundedSlide(Slide)
{
    try
    {
        var ctx = getContext();
        
        ctx.save();
        //---------------------------------------------
		
        // Define Path
        ctx.beginPath();
        var subtractTheta = Math.asin(SlidePadding / WheelRadius) + Math.PI;
        ctx.arc(CenterX, CenterY, WheelRadius, Slide.CurrentTheta - HalfTheta + subtractTheta, Slide.CurrentTheta + HalfTheta - subtractTheta)
        subtractTheta = Math.asin(SlidePadding / CenterPaddingRadius)  + Math.PI;
        ctx.arc(CenterX, CenterY, CenterPaddingRadius, Slide.CurrentTheta + HalfTheta - subtractTheta, Slide.CurrentTheta - HalfTheta + subtractTheta, true)
        ctx.closePath();
        
        // Render Path
        ctx.lineWidth = frameBorderWidth;
        ctx.strokeStyle = frameBorderColor;
        ctx.stroke();
        
        // Clip Path
        ctx.clip();
        
		// Get Dimensions
		var scale;
		if (Slide.Image.naturalHeight <= Slide.Image.naturalWidth)
			scale = MinImageDimension / Slide.Image.naturalHeight;
		else
			scale = MinImageDimension / Slide.Image.naturalWidth;
		var w = Slide.Image.naturalWidth * scale;
		var h = Slide.Image.naturalHeight * scale;
		var xPos = Slide.CenterX - (w/2);
		var yPos = Slide.CenterY - (h/2);
        
        // Define Path
        ctx.beginPath();
		if (Slide.Image.naturalWidth != 0 || Slide.Image.naturalHeight != 0){
			ctx.drawImage(Slide.Image, xPos, yPos, w, h);
		}
			
        //---------------------------------------------
        ctx.restore();
    }
    catch(err)
    {
		myAlert("RenderRoundedSlide():");
        myAlert(err);
    }
}

function RenderSlide(Slide)
{
    try
    {
        var ctx = getContext();

        ctx.save();
        //---------------------------------------------
		
        // Define Path
        ctx.beginPath();
        ctx.moveTo(Slide.BaseLeftPointX, Slide.BaseLeftPointY);
        ctx.lineTo(Slide.TopLeftPointX, Slide.TopLeftPointY);
        ctx.lineTo(Slide.TopRightPointX, Slide.TopRightPointY);
        ctx.lineTo(Slide.BaseRightPointX, Slide.BaseRightPointY);
        ctx.lineTo(Slide.BaseLeftPointX, Slide.BaseLeftPointY);
        ctx.closePath();

        // Render Path
        ctx.lineWidth = frameBorderWidth;
        ctx.strokeStyle = frameBorderColor;
        ctx.stroke();
		
        // Clip Path
        ctx.clip();
		
		// Get Dimensions
		var scale;
		myAlert(Slide.Image.naturalHeight);
		if (Slide.Image.naturalHeight <= Slide.Image.naturalWidth)
			scale = MinImageDimension / Slide.Image.naturalHeight;
		else
			scale = MinImageDimension / Slide.Image.naturalWidth;
		var w = Slide.Image.naturalWidth * scale;
		var h = Slide.Image.naturalHeight * scale;
		var xPos = Slide.CenterX - (w/2);
		var yPos = Slide.CenterY - (h/2);
		
        // Define Path
        ctx.beginPath();
		if (Slide.Image.naturalWidth != 0 || Slide.Image.naturalHeight != 0){
			ctx.drawImage(Slide.Image, xPos, yPos, w, h);
		}

        //---------------------------------------------
        ctx.restore();
    }
    catch(err)
    {
		myAlert("RenderSlide():");
        myAlert(err);
    }
}

