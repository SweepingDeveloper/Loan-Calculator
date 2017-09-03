document.getElementById("navBar").innerHTML = 
		   "<h4>"
		 + "<a href='index.html'>Home</a></li>" 
		 + "</h4>"
		 + "<b>Programs</b>"
		 + "<ul>"
		 + "<li><a href='loans_js.html'>Loan Calculator</a></li>"
		 + "<li><a href='budget_js.html'>Budget Calculator</a></li>"
		 + "<li><a href='bankrun_js.html'>Bank Run</a></li>"
		 + "<li><a href='eggcrate_js.html'>Eggcrate Display Control</a></li>"
		 + "<li><a href='coryat_js.html'>Coryat Scorekeeper</a></li>"
		 + "</ul>"
		 + ""
		 + "<p><b><a href='about.html'>About The Site</a></b></p>"
		 + "<p><b><a href='download.html' target='new'>Download Instructions</a></b></p>"
		 + "<p><b><a href='bills.html'>How To Pay Your Bills</a></b></p>"
		 + "<hr>"
		 + "Choose a color scheme:"
		 + "<ul>"
		 + "<li><a href='#' id='style1'>Light</a>"
		 + "<li><a href='#' id='style2'>Dark</a>"
		 + "</ul>"
	
document.getElementById("myHeader").innerHTML = 
		     
		    "<p align='center'><img src='pics/tsd_logo.png'></img></p>";
		   

		 
		 
		   
		   
document.getElementById("myFooter").innerHTML = 
			"<p><a href='privacy.html'>Privacy Policy</a>  &#9642 "
		 +  "Acts 16:30-31</p>"
	     +  "<p><div id='curColor'></div></p>";

	                              

		 
function style1() {
	
	
	
	//document.getElementById('teststyler').innerHTML = "<link rel='stylesheet' href='style.css' id='styler'>";
	document.getElementById("styler").setAttribute("href", "style.css");

	document.getElementById("curColor").innerHTML = "<tiny><i>Current color scheme is Light.</i></tiny>";
	document.cookie = 'cssstyle=style1';
	
	try
	{
		changecash();		
	}
	catch (err)
	{
		console.log("You're not currently using the budget program.  This is normal.  Go about your business.  Move along.");
	}

	
}
function style2() {
	//document.getElementById('teststyler').innerHTML = "<link rel='stylesheet' href='styledark.css' id='styler'>";
	document.getElementById("styler").setAttribute("href", "styledark.css");
	document.getElementById("curColor").innerHTML = "<tiny><i>Current color scheme is Dark.</i></tiny>";
	document.cookie = 'cssstyle=style2';
	
	try
	{
		changecash();		
	}
	catch (err)
	{
		console.log("You're not currently using the JS budget program.  This is normal.  Go about your business.  Move along.");
	}

}

window.onload = function() 
{
	var x = document.cookie;

	if (x == '')
	{
		x = 'cssstyle=style1';
	}
	
	if (x == 'cssstyle=style2')
	{
		style2();
	}
	else
	{
		style1();
	}
	
	document.title = "The Sweeping Developer";
	document.getElementById('style2').onclick = style2;
	document.getElementById('style1').onclick = style1;

	try
	{
		startProgram();		
	}
	catch (err)
	{
		console.log("You're not currently using the JS budget or the loan program.  This is normal.  Go about your business.  Move along.");
	}

	
	
	
	console.log(document.cookie);
	
	
}
