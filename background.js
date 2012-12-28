console.log("KeyAffinity is running");
var prevLink = $('a.prev').attr("href"); 							// Get link to previous submission
var nextLink = $('a.next').attr("href"); 							// Get link to next submission
var faveLink = $('.alt1 a[href*="fav"]').attr("href");				// Get link to fave submission
var dlLink = $('.alt1 a[href*="facdn.net/art"]').attr("href");		// Get link to download submission
var fullLink;

// Add IDs to elements to simplify jQuery contol
$('h3 input[name=nuke-watches]').attr("id", "nuke-watches");
$('input.button.remove-nuke').attr("id", "nuke-subs");
$('h3 input[name=nuke-shouts]').attr("id", "nuke-shouts");
$('h3 input[name=nuke-submission-comments]').attr("id", "nuke-comments");
$('h3 input[name=nuke-journals]').attr("id", "nuke-journals");
$('a[title^="Submissions"]').attr("id", "new-subs");
$('a[title^="Comments"]').attr("id", "new-comments");
$('a[title^="Notes"]').attr("id", "new-notes");
$('a[title^="Trouble"]').attr("id", "new-tickets");

// Set booleans to enable and disable some functions (possible use for options page)
var control = new Boolean();
var pagination = new Boolean();
var mainJump = new Boolean();
var comJump = new Boolean();
control = true;
pagination = true;
mainJump = true;
comJump = true;

var pathArray = window.location.pathname.split( '/' );				// Get current page, place in array
var pageType = pathArray[1];										// Grab page type (view, journal, full, etc.) from URL
var subNumber = pathArray[2];										// Grab submission number from URL

if (pageType == "view") {
	fullLink = "http://www.furaffinity.net/full/" + subNumber;
}
else if (pageType == "full") {
	fullLink = "http://www.furaffinity.net/view/" + subNumber;
}

if (pageType == "") {
	pageType = "home";
}

if (pageType == "journal" || pageType == "browse" || pageType == "search" || pageType == "home" || pageType == "submit") {
	pagination = false;
}

if (pageType != "view" && pageType != "full" && pageType != "fav"){
	comJump = false;
	mainJump = false;
}

// Debugging stuff
function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	
  	for(var i = 0; i < hashes.length; i++) {
        	hash = hashes[i].split('=');
        	vars.push(hash[0]);
        	vars[hash[0]] = hash[1];
    	}
	return vars;
}

var debug = getUrlVars()["ka-debug"];

if (debug == "true") {
	console.log("\n\n~~ KeyAffinity Debugging ~~");
	console.log("Previous link: " + prevLink);
	console.log("Next link: " + nextLink);
	console.log("Fave link: " + faveLink);
	console.log("Download link: " + dlLink);
	console.log("Full link: " + fullLink);
	console.log("Control: " + control);
	console.log("Pagination: " + pagination);
	console.log("Main section jump: " + mainJump);
	console.log("Comment jump: " + comJump);
	console.log("Page type: " + pageType);
	console.log("Submission number: " + subNumber);
	console.log("~~ KeyAffinity Debugging ~~\n\n");
}

// Insert the popup boxes
if (nextLink == null && pagination) {
	$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-endreach\" style=\"display:none; position:fixed; top:300px; left:50%; margin-left:-300px; width:600px; height:50px; text-align:center;  background-color:rgba(0,0,0,0.5); font-size:40px; z-index:999 padding-top:40px; border-radius:10px; color:white; -webkit-box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3); box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3);\">Reached end of gallery</div>");
}

if (prevLink == null && pagination) {
	$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-beginreach\" style=\"display:none; position:fixed; top:300px; left:50%; margin-left:-300px; width:600px; height:50px; text-align:center;  background-color:rgba(0,0,0,0.5); font-size:40px; z-index:999 padding-top:40px; border-radius:10px; color:white; -webkit-box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3); box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3);\">Reached beginning of gallery</div>");
}

if (pagination) {
	$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-favepop\" style=\"display:none; position:fixed; top:300px; left:50%; margin-left:-25px; width:50px; height:50px; text-align:center;  background-color:rgba(0,0,0,0.5); font-size:40px; z-index:999 padding-top:10px; padding-bottom:10px; border-radius:10px; color:white; -webkit-box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3); box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3);\">&hearts;</div>");
}

$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-nomsgs\" style=\"display:none; position:fixed; top:300px; left:50%; margin-left:-300px; width:600px; height:50px; text-align:center;  background-color:rgba(0,0,0,0.5); font-size:40px; z-index:999 padding-top:40px; border-radius:10px; color:white; -webkit-box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3); box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3);\">No new messages</div>");

if (mainJump) {
	$('html, body').animate({
		scrollTop: $('.innertable').offset().top 					// Scroll to main section of page if jumping is enabled
		}, 0);
}

// Functions for controls
function prevSub() {
    if (prevLink != null && pagination) { 							// Make sure that there is an older submission
    	window.location = prevLink; 								// Redirect to it
    }
    else {
        $('#keyaffinity-beginreach').fadeIn(100).delay(500).fadeOut(100); // Show alert if no older submissions
    }
}

function nextSub() {
    if (nextLink != null) {											// Make sure there is a newer submission
        window.location = nextLink;									// Redirect to it
    }
    else {
        $('#keyaffinity-endreach').fadeIn(100).delay(500).fadeOut(100);	// Show alert if no newer submissions
    }
}

function faveSub() {
	$('#keyaffinity-favepop').show();								// Show heart popup for visual indicator
	window.location = faveLink;										// Redirect to fave link
}

function comment() {
	$('#JSMessage').focus();										// Jump to comment textarea
}

function sizeChange() {
	window.location = fullLink;										// Go to full view @TODO does not work with full on by default
}

function download() {
	window.location = dlLink;										// Go to download page
}

function nuke(type) {
	$("#nuke-" + type).trigger('click');							// Simulate click on nuke button
}

function goToMsgs() {
	if ($('#new-subs').text() != ""){
		window.location = "/msg/submissions";
	}
	else if ($('#new-comments').text() != "") {
		window.location = "/msg/others";
	}
	else if ($('#new-notes').text() != "") {
		window.location = "/msg/pms";
	}
	else if ($('#new-tickets').text() != "") {
		window.location = "/msg/troubletickets";
	}
	else {
		$('#keyaffinity-nomsgs').fadeIn(100).delay(500).fadeOut(100);
	}
}

function goToPage(pageName) {
	if (window.location != "http://www.furaffinity.net/" + pageName) {
		window.location = "/" + pageName;
	}
}

$('#JSMessage, .textbox, #message, #keywords').focusin(function() {	// When you enter a textbox
	control = false;												// disable control
}).focusout(function() {											// When you leave the textbox
	control = true;													// reenable control
});

// Key combos for message management
if (pageType = "msg" && control) {
	$(document).bind('keydown', 'alt+s', function(){
		nuke("subs");
	});
	
	$(document).bind('keydown', 'alt+c', function(){
		nuke("comments");
	});
	
	$(document).bind('keydown', 'alt+w', function(){
		nuke("watches");
	});
	
	$(document).bind('keydown', 'alt+h', function(){
		nuke("shouts");
	});
	
	$(document).bind('keydown', 'alt+j', function(){
		nuke("journals");
	});
}

$(document.documentElement).keyup(function (event) {				// Detect keyboard usage
    if (event.keyCode == 37 && control && pagination) {				// Watch for left arrow (key 37)
        prevSub();													// Go to previous Submission
    }
    else if (event.keyCode == 39 && control && pagination) {		// Watch for right arrow (key 39)
        nextSub(); 													// Go to next Submission
    }
    else if (event.keyCode == 70 && control && pagination) {		// Watch for F key (key 70)
    	faveSub();													// Favorite Submission
    }
    else if (event.keyCode == 67 && control && comJump) {			// Watch for C key (key 67)
    	comment();													// Jump to comment box
    }
    else if (event.keyCode == 191 && control && pagination) {		// Watch for / key (key 191)
    	sizeChange();												// Shrink/enlarge image
    }
    else if (event.keyCode == 68 && control && pagination) {		// Watch for D key (key 68)
    	download();													// Shrink/enlarge image
    }
    else if (event.keyCode == 77 && control) {						// Watch for M key (key 77)
    	goToMsgs();													// Go to new messages
    }
    else if (event.keyCode == 66 && control) {						// Watch for B key (key 66)
    	goToPage("browse");											// Go to browse page
    }
    else if (event.keyCode == 83 && control) {						// Watch for S key (key 83)
    	goToPage("search");											// Go to search page
    }
});

/*	*	*	* Google Analytics *	*	 *	 */

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-37203159-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

_gaq.push(['_trackPageview']);

/* 
 * 
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 */
