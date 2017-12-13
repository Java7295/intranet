$(document).mouseup(function (e)
{
    var container = $("#searchV3");
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
		$("#siteInput,#peopleInput").hide();
		$("#peopleSearch,#siteSearch").removeClass("active");
    }
});
var replyFormStart = '<div class="replyToComment"><form action="/web/CommentSet">';
var replyFormEnd = '<div class="replyContainer"><div class="arrow top"></div><textarea class="reply_agreeToGuidelines" name="comment" onkeydown="textCounter(this.form.comment,this.form.remLen,500);" onkeyup="textCounter(this.form.comment,this.form.remLen,500);"></textarea></div><input disabled="disabled" class="commentButton disabledInput" value="Submit" type="submit"><span class="noteLrg"><input class="formFieldSml" disabled="disabled" name="remLen" readonly="readonly" value="500" type="text"> Characters Remaining</span></form></div>';
function commentReplies(){
	$('.commentReplies').each(function(){
			$(this).find('.comment:lt(3)').show();
			var commentReplyCount = +($(this).find('.comment').length);
			var commentReplyBtn = +($(this).parents('.comment').find('.commentReplyBtnBottom').length);
			if (commentReplyBtn ==0){
				if (commentReplyCount !=0 && commentReplyCount <3){
					$(this).append('<div class="commentReplyBtnBottom"><a href="#">Reply to comment</a></div>');
				}		
			}
			if (commentReplyCount ===3){
				$(this).parents('.comment').find('.readMore').removeClass('readMore').addClass('commentReplyBtnBottom').find('a').text('Reply to comment');
			}	
	});
	if ($('.comment').length == 0){
	 $('#loadMoreComments').hide(); 
	}	
	$('.commentReplies:empty').hide();
	console.log('commentReplies function ran');
}
// Comment Replies ajax

$( document ).ajaxComplete(function() {
	commentReplies();
});

setTimeout(function(){ 
	commentReplies();
	console.log('show comments - timer');		
}, 3000);

$(function(){

	// MEGA MENU 2000
	
	function showMega() {
		// show menu
		$("#megaMenu").slideDown();
		$("#deptNav").addClass("navActive");
	}
	function hideMega() {
  		// hide menu
		$("#megaMenu").slideUp();
		$("#deptNav").removeClass("navActive");
	}

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {	
	$('a[href$="mp4"]').each(function( index ) {
			$(this).attr('rel', '');
			Shadowbox.clearCache();
			Shadowbox.setup();  
	});
	$("#deptNav").click(function() {
		if ($(this).hasClass("navActive")){
			hideMega();	
		} else {
			showMega();
		}
	});
	 
	} else {
		$("#deptNav").hoverIntent({
		    over: showMega,
		    out: hideMega,
			timeout:1000
		});
	}
	// comment agree to guidelines function
	$(".commentButton").attr('disabled','disabled');	
	$(".agreeToGuidlinesFirst").live('click', function(){
		Shadowbox.open({
		    content: '/web/portlets/content.jsp?SID=Home&path=/links/guidelines-journal.jsp',
		    player: 'iframe',
		    displayNav:false,
		    height: 400,
		    width: 640
		});
	});
	$(document).on('click','.comment .readMore a', function(e){
		var link = $(this).parent();
		e.preventDefault();
		var replies = $(this).parent().parent().find('.commentReplies');
		var repliesCount = +($(this).parent().parent().find('.comment:hidden').length);
		if (repliesCount >= 10){
			$(this).parent().parent().find('.comment:hidden:lt(10)').slideDown();
		} else {
			$(this).parent().parent().find('.comment:hidden').slideDown('', function(){
				$(link).removeClass('readMore').addClass('commentReplyBtnBottom');
			});
			$(this).text('Reply to comment');

		}

	});


	$(document).on('click','.commentReplyBtn a',function(e){
		e.preventDefault();
		var commentid = '<input type="hidden" value="' + $(this).parent().attr('data-commentid') + '" name="owner"/>';
		var objectid = '<input type="hidden" value="' + $('#postCommentLayer [name="objectid"]').val() + '" name="objectid"/>';
		var path = '<input type="hidden" id="outPath" value="' + $('#postCommentLayer [name="path"]').val() + '" name="path"/>';
		var sid = '<input type="hidden" id="outSID" value="' + $('#postCommentLayer [name="SID"]').val() + '" name="SID"/>';
		var hiddenInputs = commentid + objectid + path + sid;
		var replyForm = replyFormStart + hiddenInputs + replyFormEnd;
		$(this).parents('.comment').addClass('currentComment');
		var replyLocation = $(this).closest('.comment').find('.commentReplies');
		$('.replyToComment').remove();
		$(replyForm).insertBefore(replyLocation);
	});

	$(document).on('click','.commentReplyBtnBottom a', function(e){
		e.preventDefault();
		var commentid = '<input type="hidden" value="' + $(this).parents('.comment').find('.commentReplyBtn').attr('data-commentid') + '" name="owner"/>';
		var objectid = '<input type="hidden" value="' + $('#postCommentLayer [name="objectid"]').val() + '" name="objectid"/>';
		var path = '<input type="hidden" id="outPath" value="' + $('#postCommentLayer [name="path"]').val() + '" name="path"/>';
		var sid = '<input type="hidden" id="outSID" value="' + $('#postCommentLayer [name="SID"]').val() + '" name="SID"/>';
		var hiddenInputs = commentid + objectid + path + sid;
		var replyForm = replyFormStart + hiddenInputs + replyFormEnd;
		var replyLocation = $(this).closest('.comment').find('.commentReplies');
		$('.replyToComment').remove();
		$(replyForm).insertAfter(replyLocation);		
		$('.replyToComment .arrow').addClass('center');
	});

	$(document).on('click','.commentApprove', function(e){
		e.preventDefault();
		var adminURL = '/active/CommentUpdate?a=Y&commentid=' + $(this).attr('data-commentid');
		$('#commentApprove').attr('src',adminURL);
		// $(this).closest('.commentAdmin').hide();
	});
	$(document).on('click','.commentExpert', function(e){
		e.preventDefault();
		var adminURL = '/active/CommentUpdate?a=E&commentid=' + $(this).attr('data-commentid');
		$('#commentApprove').attr('src',adminURL);
		// $(this).closest('.commentAdmin').hide();
	});
	$(document).on('click','.commentFlagged', function(e){
		e.preventDefault();
		var adminURL = '/active/CommentUpdate?a=F&commentid=' + $(this).attr('data-commentid');
		$('#commentApprove').attr('src',adminURL);
		// $(this).closest('.commentAdmin').hide();
	});
	$(document).on('click','.commentBoth', function(e){
		e.preventDefault();
		var adminURL = '/active/CommentUpdate?a=X&commentid=' + $(this).attr('data-commentid');
		$('#commentApprove').attr('src',adminURL);
		// $(this).closest('.commentAdmin').hide();
	});
	$(document).on('click','.commentReject', function(e){
		e.preventDefault();
		var adminURL = '/active/CommentUpdate?a=N&commentid=' + $(this).attr('data-commentid');
		$('#commentApprove').attr('src',adminURL);
		// $(this).closest('.commentAdmin').hide();
	});

	// comment agree to guidelines function
	$(document).on('click','.reply_agreeToGuidelines', function(){
		$('.replyToComment').removeClass('commentFieldActive');
		$(this).parent().parent().addClass('replyActive');
		Shadowbox.open({
			    content: '/web/portlets/content.jsp?SID=Home&path=/links/guidelines-reply.jsp',
		    player: 'iframe',
		    displayNav:false,
		    height: 400,
		    width: 640
		});
	});	
    $(document).on('click','#loadMoreComments', function(e){
		e.preventDefault();
		var pathStr = $('#postCommentLayer [name="path"]').val();
		var pathN = pathStr.lastIndexOf('/');
		var pathResult = pathStr.substring(pathN + 1);
		var commentURL = '/web/CommentGet?objectid=' + pathResult + '&startFrom=' + $(this).attr('data-startfrom') + '&showOnly=' + $(this).attr('data-showonly');
		$.ajax({
		                type: 'POST',
		                url: commentURL,
		                dataType: 'html'
		}).done(function(data){
		                $('#loadMoreComments').remove();
						$('.addComments').removeClass('addComments');
		                $('<div class="addComments">' + data + '</div>').insertBefore('#loadMoreCommentsWrap');
						var noMoreComments = +($('.addComments .comment').length);
						if (noMoreComments == 0){
						    $('#loadMoreComments').remove();							
						}
		});
    });
	
	// desktop to mobile
	$('.mobileLink').each(function(){
		if(this.href.indexOf("content.jsp") > -1) {
			this.href = this.href.replace('content.jsp', 'mobile/jsp/mobileArticle.jsp').slice(0, -3) + 'php3';	
		}	
		
	});
	// Search V3
	$("#peopleSearch").click(function(){
		$("#siteSearch").removeClass('active');
		$("#siteInput").hide();
		$(this).toggleClass('active');
		$("#peopleInput").toggle();
		$("#peopleInput input").focus();
	});
	$("#siteSearch").click(function(){
		$("#peopleSearch").removeClass('active');
		$("#peopleInput").hide();
		$(this).toggleClass('active');
		$("#siteInput").toggle();
		$("#siteInput input").focus();
	});
	// Most Recommended - News App Only 
	$(".newsAppOnly").append("<div class='newsAppOnlyBubble'><div class='top'>This story is available<br />only in the news<br />app for iPhones.</div><div class='bottom'>Click to learn more.</div></div>");
	$(".newsAppOnly").click(function(){
		window.location.href = '/web/content.jsp?SID=News&path=Daily/newsApp.jsp'
	});
});
function intranetInit() {

$(document).ready(function() {

	var navSID = getParameterByName("SID");

	var navPath = getParameterByName("path");

	var navURL =  window.location.pathname;

	if (navURL == "/web/home.jsp"){
	    $("#navHome").addClass("navActive");
	    $("body").addClass("navHome");
	}

	if (navSID == "Corporate"){
	    $("#navCorporate,#navCompany").addClass("navActive");
	    $("body").addClass("navCorporate");
	}
	if (navSID == "Company"){
	    $("#navCompany").addClass("navActive");
	    $("body").addClass("navCompany");
	}
	if (navURL == "/web/news.jsp" || navURL == "/web/journal.jsp" || navSID == "News"){
	    $("#navNews").addClass("navActive");
	    $("body").addClass("navNews");
	}

	if (navSID == "EmplSvcs"){
	    $("#navEmplSvcs").addClass("navActive");
	    $("body").addClass("navEmplSvcs");
	}

	if (navSID == "Lounge"){
	    $("#navLounge").addClass("navActive");
	    $("body").addClass("navLounge");
	}
		
	// Find links to files and add the file name to the title field and class to trigger tooltip	
	$('.relatedFavorites li a[href]').each(function(index) {
		if($(this).attr('href').match(/[.](doc|docx|xls|xlsx|pdf|ppt|pptx|pptm|zip)$/)) {
		        $(this).addClass("favoritesTooltip");
			    $(this).attr('title', $(this).text());
		   }
	});
	$('.favoritesTooltip').tooltip({ 
	    track: true, 
	    delay: 0, 
	    showURL: false, 
	    showBody: " - ", 
	    fade: 250 
	});
	// App tooltip
	$("a.apptooltip").hover(function(){
		$(this).next().fadeToggle("fast");
		return false;
	});
	$("a.apptooltip").mousemove(function(e){
	      $('.appdescription').css('top', e.pageY + 5).css('left', e.pageX + 10);
	});
	//Hide (Collapse) the toggle containers on load
	$(".toggle_container").hide(); 

	//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
	$("a.qTrigger").click(function(){
		$(this).toggleClass("active").next().slideToggle("slow");
		return false;
	});	

	// Check if mouse is inside search div. If user clicks outside hide search options (#searchChanger) div
	var mouse_is_inside = false;
	var mouse_is_inside_t = false;
	var searchValue = $("#searchbox").val();
    $('#search').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });
	// Same but for Travel
    $('#travelForm').hover(function(){ 
        mouse_is_inside_t=true; 
    }, function(){ 
        mouse_is_inside_t=false; 
    });
    $("body").mouseup(function(){ 
        if(! mouse_is_inside) $('#searchChanger').slideUp();
		if(! mouse_is_inside_t) $('#searchCodesDiv').fadeOut();
		if(! mouse_is_inside){if (searchValue = ''){$("#searchbox").val("Search: people or content");}}
    });
	// Show Search Options	
	$("#searchbox").click(function() {
		$("#searchChanger").slideDown();
	});
	
	$(".contentBtn").mousedown(function(){
      $(this).attr("src", "/buttons/home/contentBtn_on.png");
    }).mouseleave(function(){
      $(this).attr("src", "/buttons/home/contentBtn_off.png");
 	});
	$(".contentBtn").click(function () {
		var inSID=getParameterByName("SID");
		if(window.location.href.indexOf("news.jsp")>-1) inSID="News";
		if(inSID==="") inSID="Home";
		$("input[name=SID]").val(inSID);
		$("#searchFormV2").attr("action", "/web/application.jsp").attr("onsubmit", "return checkKeyTerms(this.q.value);").attr("method", "get");
		$("#searchboxV2").focus();
		$("#searchboxV2").attr("name", "q");	
	});


	$(".peopleBtn").mousedown(function(){
      $(this).attr("src", "/buttons/home/peopleBtn_on.png");
    }).mouseleave(function(){
      $(this).attr("src", "/buttons/home/peopleBtn_off.png");
 	});
	$(".peopleBtn").click(function () {
		$("#searchboxV2").attr("name", "q");
		$("#searchFormV2").attr("action", "/web/application.jsp?SID=people&ps=directory&q=" + $("#searchboxV2").val()).attr("onsubmit", "return checkKeyTerms(this.q.value);").attr("method", "post");
	});	

	// Change form action for search, etc.
	$("#siteSearch").click(function () {
		$("#searchForm").attr("action", "/web/application.jsp").attr("onsubmit", "return checkKeyTerms(this.q.value);").attr("method", "get");
		$("#searchbox").focus();
		$("#searchbox").attr("name", "q");		
	});
	$("#peopleSearch").click(function () {
		$("#searchForm").attr("action", "/web/application.jsp?SID=people&ps=directory" + $("#searchbox").val()).attr("onsubmit", "return checkKeyTerms(this.q.value);").attr("method", "post");
		$("#searchbox").focus();
		$("#searchbox").attr("name", "q");
	});
	// Update form action on submit IF people is checked
		$("#search").submit(function() {
		if ($('#peopleSearch').is(':checked')){
			$("#searchForm").attr("action", "/web/application.jsp?SID=people&ps=directory&q=" + $("#searchbox").val());
	 	}
	});
	$('#lastOnly').tooltip({ 
	    track: true, 
	    delay: 0, 
	    showURL: false, 
	    showBody: " - ", 
	    fade: 250 
	});

	$("#searchButton").mousedown(function(){
      $(this).attr("src", "/buttons/home/go_on.gif");
    }).mouseleave(function(){
      $(this).attr("src", "/buttons/home/go_off.gif");
 	});
	
	// Stock ticker slideshow
	$('#stock').cycle({
			fx:'fade', 
	        prev: '#prevStock',
	        next: '#nextStock',
			pause: true
	    });
	$('#stock').cycle('pause');
	
    // News Slideshow Play/Pause Toggle Variable
	var toggle = $('#playPauseToggle').click(function() {
		var paused = slideshow.is(':paused');
		slideshow.cycle(paused ? 'resume' : 'pause', true);
	});
	// News Slideshow Setup
    var slideshow = $('#features').cycle({
			fx:'fade', 
	        prev: '#prev',
	        next: '#next',
			pause: true,
			paused: function(cont, opts, byHover) {
				!byHover && toggle.attr("src","/Daily/newsNavPlay.jpg");
			},
			resumed: function(cont, opts, byHover) {
				!byHover && toggle.attr("src","/Daily/newsNavPause.jpg");
			},
	        pager: '#nav',
	        pagerAnchorBuilder: pagerFactory,
			activePagerClass: 'activeSlide'
	    });
	// News Slideshow Pagination
    function pagerFactory(idx, slide) {
        var s = idx >= 15 ? ' style="display:none"' : '';
        return '<li'+s+'><a href=\"#\"></a></li>';
    };

// Around the Globe - Navigation
function setSlide(index) {
	$('.globeSlider').cycle(index);
}

function showCommentBox() {
	window.parent.document.getElementById('postCommentLayer').style.display='block';
	$(".commentTextarea",parent.document).focus();
		
}


jQuery.fn.equalheight = function() {
	jQuery(this).each(function(){
		var currentTallest = 0; //create currentTallest var
		
		//go through every child of the mother div
		jQuery(this).children().each(function(i){
			//keep checking every child's height and get the height of the tallest div											  
			if (jQuery(this).height() > currentTallest) { currentTallest = jQuery(this).height(); }
			
		});
		
		//set currentTallest as pixels
		currentTallest = currentTallest+"px";
		
		//If browser is Microsoft Internet explorer, then use css "height: yypx"
		if (jQuery.browser.msie && jQuery.browser.version == 6.0) { jQuery(this).children().css({'height': currentTallest}); }
		
		//use css "min-height: yypx"
		jQuery(this).children().css({'min-height': currentTallest}); 
	});
	return this;
};

function checkKeyTerms(inTerm) {
  if (inTerm == '') return false;
  if (inTerm == 'Search: people or content') return false;
  }
  else return true;
}

function toggleAll(itemname,state)
{
	tmp = document.getElementsByTagName('dd'); // switch the tag if toggling an element other than dd (definition data)

	for (i=0;i<tmp.length;i++){
 		if (tmp[i].className == itemname) tmp[i].style.display = state;
	}

	on = getElementsByClass('toggleImgOn',document,'*');
	off = getElementsByClass('toggleImgOff',document,'*');
	
	for (i=0;i<on.length;i++)
	{
 		on[i].style.display = (state == 'none') ? 'none' : 'inline';
		off[i].style.display = (state == 'none') ? 'inline' : 'none';
	}
}

function toggle(idname)
{
	document.getElementById(idname).style.display = (document.getElementById(idname).style.display == 'none') ? 'block' : 'none';

	if(document.getElementById("toggleImgOn"+idname) != null){
		document.getElementById("toggleImgOn"+idname).style.display = (document.getElementById(idname).style.display == 'none') ? 'none' : 'inline';
		document.getElementById("toggleImgOff"+idname).style.display = (document.getElementById(idname).style.display == 'none') ? 'inline' : 'none';
	}
}

function getElementsByClass(searchClass,node,tag)
{
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

$(document).ready(function () {
	var NORM_TOGGLE_CLASS_PREFIX     = 'left-nav-';
	var HOVER_TOGGLE_CLASS_PREFIX    = 'left-nav-hover-';
	var ACTV_TOGGLE_CLASS_SUFFIX     = '-active';
	var ACTV_CLASS_PREFIX            = 'left-nav-active-';
	var HOVER_MENU_ITEM_CLASS        = 'left-nav-item-hover';
	var ACTV_TOGGLE_REGEX            = new RegExp(ACTV_TOGGLE_CLASS_SUFFIX + '$');
	var ACTV_MENU_ITEM_REGEX         = new RegExp('^' + ACTV_CLASS_PREFIX);

	var TOGGLE_SPEED                 = 'fast';
	var TOGGLE_CLASSES               = {
	    norm:                        'left-nav-toggle',
	    normactive:                  'left-nav-toggle-active',
        activenorm:                  'left-nav-active-toggle',
	    activenormactive:            'left-nav-active-toggle-active'
	};
	
	/* Init */
	for (var key in TOGGLE_CLASSES) {
		var toggleBtns = $('.' + TOGGLE_CLASSES[key]);

		toggleBtns.click(toggleSubMenuViz);
		toggleBtns.hover(toggleMenuItemHover);
		
		toggleBtns.each(function () {
			$(this).prev().hover(menuItemEnter, menuItemLeave);
		});
	}
	
	function toggleSubMenuViz(e) {
		var submenu = $(this).next();

		//submenu.slideToggle(TOGGLE_SPEED, toggleToggleBtnDirection);
		submenu.slideToggle(TOGGLE_SPEED, toggleToggleBtnDirection);

		return false;
	}
	function toggleToggleBtnDirection() {
		var toggleBtn = $(this).prev();
		var currClass = toggleBtn.attr('class');
		var newClass = "";
		
		var index = currClass.search(ACTV_TOGGLE_REGEX);
		
		if (index >= 0) {
			newClass = currClass.substr(0, index);
		} else {
			newClass = currClass + ACTV_TOGGLE_CLASS_SUFFIX;
		}
		
		toggleBtn.removeClass(currClass).addClass(newClass);		
		toggleBtn.prev().removeClass('link-' + currClass).addClass('link-' + newClass);		
	}
	
	function toggleMenuItemHover(e) {
		var menuItem = $(this).prev();
		
		menuItem.toggleClass(HOVER_MENU_ITEM_CLASS);
	}
	
	function menuItemEnter(e) {
		toggleToggleBtnHover($(this), NORM_TOGGLE_CLASS_PREFIX, HOVER_TOGGLE_CLASS_PREFIX);
	}
	function menuItemLeave(e) {
		toggleToggleBtnHover($(this), HOVER_TOGGLE_CLASS_PREFIX, NORM_TOGGLE_CLASS_PREFIX);
	}
	function toggleToggleBtnHover(menuItem, beforeClass, afterClass) {
		var toggleBtn = menuItem.next();

		var menuItemCurrClass = menuItem.attr('class');
		var toggleBtnCurrClass = toggleBtn.attr('class');
		
		var mIndex = menuItemCurrClass.search(ACTV_MENU_ITEM_REGEX);
		
		if (mIndex < 0) {
			var newClass = toggleBtnCurrClass.replace(beforeClass, afterClass);

			toggleBtn.removeClass(toggleBtnCurrClass).addClass(newClass);
		}
	}
	
});

function leftNavSetMain(inSID,inID) {
		document.cookie = "M_" + inSID + "=" + inID + "; path=/";
	}
function leftNavSetSub(inSID,inID) {
		document.cookie = "S_" + inSID + "=" + inID + "; path=/";
	}

var searchCodesWin = null;
var searchCodeField = null;

// GET QUERY STRING ?SID=, etc
function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Hide rows for table where n is div ID
$('.hideRowID').each(function(){
	$(this).find("tr:gt("+ (($(this).attr('id'))-1) +")").hide();
	$(this).append("<a class='showRowBtnClass' href='#'>Show more</a><div class='dottedLine'></div>");
});

$(".hideRowBtnClass").live('click', function() {
	$(this).parent().find("tr:gt("+ (($(this).parent().attr('id'))-1) +")").hide();
	$(this).addClass("showRowBtnClass").removeClass("hideRowBtnClass").text("Show more");
	return false
});
$(".showRowBtnClass").live('click', function() {
	$(this).parent().find("tr:gt("+ (($(this).parent().attr('id'))-1) +")").fadeIn();
	$(this).addClass("hideRowBtnClass").removeClass("showRowBtnClass").text("Hide");
	return false
});

// Show only the first three rows of table with class "hideRow" and hide the rest + create show/hide button
$('.hideRow').each(function(){
	$(this).find("tr:gt(2)").hide();
	$(this).append("<a class='showRowBtn' href='#'>Show more</a><div class='dottedLine' style='margin-bottom:20px;'></div>");

	
});

$(".showRowBtn").live('click', function() {
	$(this).parent().find("tr:gt(2)").fadeIn();
	$(this).addClass("hideRowBtn").removeClass("showRowBtn").text("Hide");
	return false
});

$(".hideRowBtn").live('click', function() {
	$(this).parent().find("tr:gt(2)").fadeOut();
	$(this).addClass("showRowBtn").removeClass("hideRowBtn").text("Show more");
	return false
});

// Show only the first five rows of table with class "hideRow" and hide the rest + create show/hide button
$('.hideRow5').each(function(){
	$(this).find("tr:gt(4)").hide();
	$(this).append("<a class='showRowBtn5' href='#'>Show more</a><div class='dottedLine' style='margin-bottom:20px;'></div>");

	
});

$(".showRowBtn5").live('click', function() {
	$(this).parent().find("tr:gt(4)").fadeIn();
	$(this).addClass("hideRowBtn5").removeClass("showRowBtn5").text("Hide");
	return false
});

$(".hideRowBtn5").live('click', function() {
	$(this).parent().find("tr:gt(4)").fadeOut();
	$(this).addClass("showRowBtn5").removeClass("hideRowBtn5").text("Show more");
	return false
});


// Same as above but all rows 
$('.hideRowAll').each(function(){
	$(this).find("tr").hide();
	$(this).append("<a class='showRowBtnAll' href='#'>Show more</a><div class='dottedLine' style='margin-bottom:20px;'></div>");

});

$(".showRowBtnAll").live('click', function() {
	$(this).parent().find("tr").fadeIn();
	$(this).addClass("hideRowBtnAll").removeClass("showRowBtnAll").text("Hide");
	return false
});

$(".hideRowBtnAll").live('click', function() {
	$(this).parent().find("tr").fadeOut();
	$(this).addClass("showRowBtnAll").removeClass("hideRowBtnAll").text("Show more");
	return false
});

// Same as above but "Show links" text
$('.hideLinks').each(function(){
	$(this).find("tr").hide();
	$(this).append("<a class='showLinksBtn' href='#'>Show links</a><div class='dottedLine' style='margin-bottom:20px;'></div>");

});
$(".showLinksBtn").live('click', function() {
	$(this).parent().find("tr").fadeIn();
	$(this).addClass("hideLinksBtn").removeClass("showLinksBtn").text("Hide links");
	return false
});

$(".hideLinksBtn").live('click', function() {
	$(this).parent().find("tr").fadeOut();
	$(this).addClass("showLinksBtn").removeClass("hideLinksBtn").text("Show links");
	return false
});

if(window.location.hash) {
  location.href = location.href;
} else {
  // Fragment doesn't exist
}



 //More/Less Button
	
	$(".moreBtn").click(function(){
       $('.moreInfo').slideDown("slow");$(this).fadeOut();return false
    });
    $(".lessBtn").click(function(){
      $( '.moreInfo').slideUp("slow",function(){
          $('.moreBtn').fadeIn("fast");
        });
    });
	$('#moreBtn_site').click(function() {
		if ($(this).hasClass('more')){
			$(".moreInfo").slideToggle();
			$(this).removeClass('more').addClass('less').text('Hide').css('background-image','url(/buttons/close.png)');
		} else {
			$(".moreInfo").slideToggle();
			$(this).removeClass('less').addClass('more').text('Show more').css('background-image','url(/buttons/open.png)');
		}
		return false;
	});

	$(".provingRunsMoreBtn").click(function(){
       $('.provingRuns').slideDown("slow");$(this).fadeOut();return false
    });
    $(".provingRunsLessBtn").click(function(){
      $( '.provingRuns').slideUp("slow",function(){
          $('.provingRunsMoreBtn').fadeIn("fast");
        });
    });
	$(".trainingMoreBtn").click(function(){
       $('.training').slideDown("slow");$(this).fadeOut();return false
    });
    $(".trainingLessBtn").click(function(){
      $( '.training').slideUp("slow",function(){
          $('.trainingMoreBtn').fadeIn("fast");
        });
    });
});
