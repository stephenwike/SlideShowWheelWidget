function RenderLabels()
{
	for (var i = 0; i < Slides.length; ++i)
    {
        if (Slides[i].Image != null)
        {
			RenderLabel(Slides[i]);
        }
    }
}

function RenderLabel(Slide)
{
	var ctx = getContext();
	ctx.font = Styles.Label_Font;
	ctx.fillStyle = Styles.Label_Fill;
	ctx.textAlign = Styles.Label_Align;
	ctx.strokeStyle = Styles.Label_Stroke;
	var txt = Slide.Image.getAttribute('alt');
	ctx.fillText(txt, Slide.CenterX, Slide.CenterY);
	ctx.strokeText(txt, Slide.CenterX, Slide.CenterY);
}