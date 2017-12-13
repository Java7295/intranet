$(document).ready(function(){

		(function($){

		    $.fn.shuffle = function() {

		        var allElems = this.get(),
		            getRandom = function(max) {
		                return Math.floor(Math.random() * max);
		            },
		            shuffled = $.map(allElems, function(){
		                var random = getRandom(allElems.length),
		                    randEl = $(allElems[random]).clone(true)[0];
		                allElems.splice(random, 1);
		                return randEl;
		           });

		        this.each(function(i){
		            $(this).replaceWith($(shuffled[i]));
		        });

		        return $(shuffled);

		    };

		})(jQuery);

	/*		Promo Area
	        Carousel initialization
	        */

		

// Truncate function
	
String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return this.length>n ? this.substr(0,n-1)+'&hellip;' : this;
};

// Spinner

//Create an array of titles
var titles = new Array();
$('#spinner h2').each(function(){
  if ($(this).hasClass('breaking')){
  titles.push($(this).text().trunc(40));
  } else {
  titles.push($(this).text().trunc(50));
}
});
// Links
var hrefs = new Array();
$('#spinner h2').each(function(){
  hrefs.push($(this).find('a').attr('href'));
});
// Breaking News

var breaking = new Array();
$('#spinner h2').each(function(){
  if ($(this).hasClass('breaking')){
  breaking.push(true);
  } else {
  breaking.push(false);
}
});
var breakingTag ="";
function isBreaking(theloop){
	// console.log(theloop);
	if(theloop == true){
	breakingTag = "<span class='breaking'>Breaking</span>";
	} else {
	breakingTag = "";
	}
}
// Open link in new window?
var newWindow = new Array();
$('#spinner h2 a').each(function(){
  if ($(this).hasClass('newWindow')){
  newWindow.push(true);
  } else {
  newWindow.push(false);
}
});
var newWindowTarget ="";
function isNewWindow(theloop){
	// console.log(theloop);
	if(theloop == true){
	newWindowTarget = " target = '_blank'";
	} else {
	newWindowTarget = "";
	}
}
$('#spinner').before('<div class="homeTop"></div><div id="pagerNavContainer"><ul id="pagerNav"></ul></div>').cycle({
		fx:'fade', 
		timeout:3500,
        pager: '#pagerNav',
		pagerEvent: 'mouseover', 
	    pauseOnPagerHover: true,
        pagerAnchorBuilder: function (index) {               //Build the pager
		isBreaking(breaking[index]);
		isNewWindow(newWindow[index]);
        return '<li>'+ breakingTag +'<a href="'+ hrefs[index] + '"' + newWindowTarget + '>' + titles[index] + '</a></li>';
	    },	
	    updateActivePagerLink: function(pager, currSlideIndex) {
	        $(pager).find('li').removeClass('active').filter('li:eq('+currSlideIndex+')').addClass('active');
			
			if (currSlideIndex > 5 && !$("#pagerNavContainer").hasClass('SPINHOVER')){
				topPixels = 39 * (currSlideIndex - 5);
				// console.log(topPixels);
				$('#pagerNav').animate({ "marginTop":"-"+ topPixels +"px" }, "fast");
			}
			if (currSlideIndex < 5 && !$("#pagerNavContainer").hasClass('SPINHOVER')){
				// console.log(currSlideIndex);
				$('#pagerNav').animate({ "marginTop":"0px" }, "fast");
			}
		}
});
$("#pagerNavContainer").hover(function() {
	$(this).toggleClass("SPINHOVER");
});
$("#pagerNavContainer #pagerNav li").click(function(){
	if ($(this).find("a").attr("target") == "_blank"){
		var url = $(this).find("a").attr("href");
		window.open(url, '_blank');
	} else {
	   window.location = $(this).find("a").attr("href");
	}
});


/*		Promo Area
        Carousel initialization
        */
			$('.jcarousel').find('li:gt(0)').shuffle().end();
			$('.jcarousel').jcarousel({	wrap: 'circular'});
        /*
         Prev control initialization
         */
        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                // Options go here
                target: '-=1'
            });

        /*
         Next control initialization
         */
        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                // Options go here
                target: '+=1'
            });

        /*
         Pagination initialization
         */
        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination({
                // Options go here
            });

// Show/hide performance info
	
	$(".performanceOpen").click(function(){

		$(this).parent().find(".info").fadeIn();
	});
	$(".performanceClose").click(function(){

		$(this).parent().parent().find(".info").fadeOut();
	});

});