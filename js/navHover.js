

function hoverNav(elementID,elementNdx)
  {
  	navName = elementID + "-left" + elementNdx;
  	obj1 = document.getElementById(navName);
  	obj1.className = obj1.className + "-over";

  	navName = elementID + elementNdx;
  	obj1 = document.getElementById(navName);
  	obj1.className = obj1.className + "-over";

  	navName = elementID + "-right" + elementNdx;
  	obj1 = document.getElementById(navName);
  	obj1.className = obj1.className + "-over";
  }

function resetNav(elementID,elementNdx)
  {
  	navName = elementID + "-left" + elementNdx;
  	obj1 = document.getElementById(navName);
  	obj1.className = elementID + "-left";

  	navName = elementID + elementNdx;
  	obj1 = document.getElementById(navName);
  	obj1.className = elementID;

  	navName = elementID + "-right" + elementNdx;
  	obj1 = document.getElementById(navName);
  	obj1.className = elementID + "-right";
  }
  
function jumpMenu(selObj)
  { 
	window.location= selObj.options[selObj.selectedIndex].value;
  }

function MM_jumpMenu(targ,selObj,restore) { eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'"); if (restore) selObj.selectedIndex=0; }