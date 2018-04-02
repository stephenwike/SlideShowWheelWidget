var AlertsOn = true;

(function StyleAlertBox()
{
	if(AlertsOn)
	{
		document.write("<div id='AlertBoxPanel'></div>")
		var d = document.getElementById("AlertBoxPanel");
		d.style.position = "absolute";
		d.style.top = "0";
		d.style.right = "0";
		d.style.minHeight = "100%";
		d.style.width = "400px";	
		d.style.backgroundColor = "rgba(0,0,0,0.5)";
		d.style.color = "yellow";
		d.style.pointerEvents = "none";
	}
}())

function myAlert(value)
{
	if(AlertsOn)
	{
        var d = document.getElementById("AlertBoxPanel");
		var p = document.createElement('P');
		p.style.fontSize = "10px";
		p.style.margin = "0";
		var t = document.createTextNode(value);
        p.appendChild(t);
		d.insertBefore(p, d.firstChild);
	}
}