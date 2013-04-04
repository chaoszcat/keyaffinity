/*
 *
 *     This file is part of KeyAffinity.
 *
 *   KeyAffinity is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   KeyAffinity is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   A copy of the GNU General Public License is located in LICENSE.txt
 *   and is available online at <http://www.gnu.org/licenses/gpl.txt>.
 *
 *   KeyAffinity Copyright 2013 Kobi Tate. <http://k0bi.tk/>
 *   <http://keyaffinity.k0bi.tk/>
 *
 */

// Options loading
var optVar_loaded = localStorage["opt_loaded"];

function resetDefaults() {
	localStorage["opt_loaded"] = "true";
	localStorage["opt_subjump"] = "true";
	localStorage["opt_debug"] = "false";
	localStorage["opt_dlredirect"] = "false";
	window.location.href = window.location;
}
if (optVar_loaded == null || optVar_loaded == "reset") {
	resetDefaults();
}

var optVar_subjump = localStorage["opt_subjump"];
var optVar_debug = localStorage["opt_debug"];
var optVar_dlredirect = localStorage["opt_dlredirect"];
var popupFooter = "<a href=\"http://keyaffinity.k0bi.tk\">KeyAffinity</a> &copy; 2012-2013 <a href=\"http://k0bi.tk\">Kobi Tate</a>. Distributed under the terms of GNU GPL v3.";

function setOption(name, val) {
	localStorage["opt_" + name] = val;
}



$(".footer").before("" +
	"<!-- inserted by KeyAffinity -->"+
	"<div id=\"keyaffinity-options\" class=\"keyaffinity-bigpop\">"+
	
	"<div id=\"keyaffinity-optclose\" class=\"keyaffinity-boxclose\">X</div>"+
	
	"<div class=\"keyaffinity-boxtitle\">KeyAffinity Options</div>"+
	
	"<form id=\"optionsform\">"+
	
	/* "<strong>Enable/Disable Features</strong><br />" + */
	
	"<table id=\"toggles\">"+
	
		"<tr>"+
			"<td class=\"right\">Automatically scroll to submissions:</td>"+
			"<td><input type=\"checkbox\" title=\"opt_subjump\" id=\"opt_subjump\" class=\"optioncheck\" /></td>"+
		"</tr><tr>"+
			"<td class=\"right\">Debug Mode:</td>"+
			"<td><input type=\"checkbox\" title=\"opt_debug\" id=\"opt_debug\" class=\"optioncheck\" /></td>"+
		"</tr><tr>"+
			"<td class=\"right\">Auto redirect to download page:</td>"+
			"<td><input type=\"checkbox\" title=\"opt_dlredirect\" id=\"opt_dlredirect\" class=\"optioncheck\" /></td>"+
		"</tr>" +	
		
	"</table>" +
	/*
	
	// Still working on getting custom keys to work properly
	
	"<strong>Custom keyboard shortcuts</strong><br />" +
	
	"<table id=\"customkeys\">"+
	
		"<tr>"+
			"<td class=\"right\">Next submission:</td>"+
			"<td><input type=\"text\" title=\"opt_key_nextsub\" id=\"opt_key_nextsub\" class=\"customkeybox\" value=\"&rarr;\" /></td>"+
		"</tr><tr>"+
			"<td class=\"right\">Previous submission:</td>"+
			"<td><input type=\"text\" title=\"opt_key_prevsub\" id=\"opt_key_prevsub\" class=\"customkeybox\" value=\"&larr;\" /></td>"+
		"</tr><tr>"+
			"<td class=\"right\">Favorite submission:</td>"+
			"<td><input type=\"text\" title=\"opt_key_favesub\" id=\"opt_key_favesub\" class=\"customkeybox\" value=\"F\" /></td>"+
		"</tr><tr>" +
			"<td class=\"right\">Comment box jump:</td>"+
			"<td><input type=\"text\" title=\"opt_key_comjump\" id=\"opt_key_comjump\" class=\"customkeybox\" value=\"C\" /></td>"+
		"</tr><tr>" +
			"<td class=\"right\">Change image size:</td>"+
			"<td><input type=\"text\" title=\"opt_key_sizechange\" id=\"opt_key_sizechange\" class=\"customkeybox\" value=\"/\" /></td>"+
		"</tr><tr>" +	
			"<td class=\"right\">Go to download page:</td>"+
			"<td><input type=\"text\" title=\"opt_key_dlsub\" id=\"opt_key_dlsub\" class=\"customkeybox\" value=\"D\" /></td>"+
		"</tr>" +
		
	"</table>" +
	*/
	"<div id=\"keyaffinity-optsave\">"+
		"<input type=\"submit\" value=\"Save\" id=\"keyaffinity-optsubmit\" class=\"optsavebutton\" />"+
		"<button type=\"button\" id=\"keyaffinity-optreset\" class=\"optsavebutton\">Reset Defaults</button>"+
	"</div>"+

	"</form>"+
	
	"<div class=\"keyaffinity-popfooter\"><strong>More options coming soon!</strong><br />" + popupFooter + "</div>"+
	
	"</div>");
	
	
$("#keyaffinity-optreset").mousedown(function(){
	resetDefaults();
})

if (optVar_subjump == "true") {
	$("input:checkbox#opt_subjump").attr("checked", "checked");
}
else {
	$("input:checkbox#opt_subjump").removeAttr("checked");
}

if (optVar_debug == "true") {
	$("input:checkbox#opt_debug").attr("checked", "checked");
}
else {
	$("input:checkbox#opt_debug").removeAttr("checked");
}

if (optVar_dlredirect == "true") {
	$("input:checkbox#opt_dlredirect").attr("checked", "checked");
}
else {
	$("input:checkbox#opt_dlredirect").removeAttr("checked");
}

$("#optionsform").submit(function(){

	// Set Submission jumping
	if ($("input:checkbox#opt_subjump").is(":checked")) {
		setOption("subjump", "true");
	}
	else {
		setOption("subjump", "false");
	}

	// Set Debugging
	if ($("input:checkbox#opt_debug").is(":checked")) {
		setOption("debug", "true");
	}
	else {
		setOption("debug", "false");
	}
	
	// Set Download redirect
	if ($("input:checkbox#opt_dlredirect").is(":checked")) {
		setOption("dlredirect", "true");
	}
	else {
		setOption("dlredirect", "false");
	}

});

// Link grabbing
var prevLink = "http://www.furaffinity.net" + $('a.prev').attr("href"); 							// Get link to previous submission
var nextLink = "http://www.furaffinity.net" + $('a.next').attr("href"); 							// Get link to next submission
var faveLink = "http://www.furaffinity.net" + $('.alt1 a[href*="fav"]').attr("href");				// Get link to fave submission
var dlLink = $('.alt1 a[href*="facdn.net/art"]').attr("href");		// Get link to download submission
var watchLink = "http://www.furaffinity.net" + $('a[href*="watch"]').attr("href");					// Get link to watch user
var noteLink = "http://www.furaffinity.net" + $('a[href*="newpm"]').attr("href");					// Get link to note user
var subUser = $('maintable a[href*="user"]').attr("href");			// Get link to current submission user
var fullLink;

// Notification variables
var newNotifs = false;
var newSubs = false;
var newTix = false;
var newComms = false;
var newNotes = false;
var titleNotifs = false;
var pageTitle = document.title;

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
$('li.noblock:first').attr("id", "notifs"); // Relies on the notifications div being the first noblock li, may want to change

$('li a[href*="Submission-Agreement"]').closest("li").attr("id", "lastsupport");

// Adding tooltip shortcut help
$("#nuke-watches").attr("title", "(Alt-W)");
$("#nuke-subs").attr("title", "(Alt-S)");
$("#nuke-shouts").attr("title", "(Alt-H)");
$("#nuke-comments").attr("title", "(Alt-C)");
$("#nuke-journals").attr("title", "(Alt-J)");

// Set booleans to enable and disable some functions (possible use for options page)
var control = new Boolean();		// Controls all single-key functions
var pagination = new Boolean();		// Left/right arrow keys, disabled on non-submission pages
var mainJump = new Boolean();		// jumping to main section of page, disabled on non-submission pages
var comJump = new Boolean();		// Comment textbox jumping
var optDebug = new Boolean();		// Debug option
var dlRedirect = new Boolean(); 	// Automatically redirect to download page
control = true;
pagination = true;
comJump = true;

// Other variables
var boxFadeSpeed = 300;

// Options setting
if (optVar_subjump == "true") {
	mainJump = true;
}
else {
	mainJump = false;
}

if (optVar_debug == "true") {
	optDebug = true;
}
else {
	optDebug = false;
}

if (optVar_dlredirect == "true") {
	dlRedirect = true;
}
else {
	dlRedirect = false;
}

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

if (pageType == "journal" || pageType == "browse" || pageType == "search" || pageType == "home" || pageType == "submit" || pageType == "user") {
	pagination = false;
}

if (pageType != "view" && pageType != "full" && pageType != "fav"){
	comJump = false;
	mainJump = false;
}

// Redirect to download page if on submission and option is enabled
if (dlRedirect && pageType == "view") {
	window.location.href = dlLink;
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

var debugParam = getUrlVars()["ka-debug"];
var showOpt = getUrlVars()["ka-options"];
var showHelp = getUrlVars()["ka-help"];

if (debugParam == "true" || optDebug) {
	var debug = true;
}

if (showOpt == "true") {
	toggleOpt(0);
}

if (showHelp == "true") {
	toggleHelp(0);
}


// Insert the popup boxes
if (nextLink == null && pagination) {
	$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-endreach\" class=\"keyaffinity-popup\">Reached end of gallery</div>");
}

if (prevLink == null && pagination) {
	$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-beginreach\"  class=\"keyaffinity-popup\">Reached beginning of gallery</div>");
}

if (pagination) {
	$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-favepop\"  class=\"keyaffinity-popup\">&hearts;</div>");
}

$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-nomsgs\" class=\"keyaffinity-popup\">No new messages</div>");

// Insert Help window divs
$("#lastsupport").after(""+
	"<li><hr /><li>"+
	"<a href=\"#\" id=\"keyaffinity-helpshow\">KeyAffinity Help</a>"+
	"<a href=\"#\" id=\"keyaffinity-optshow\">KeyAffinity Options</a>"+
	"<a href=\"#\" id=\"keyaffinity-aboutshow\">About KeyAffinity</a>"+
"");


	
$(".footer").before("" +
	"<!-- inserted by KeyAffinity -->"+
	"<div id=\"keyaffinity-help\" class=\"keyaffinity-bigpop\">"+
	
	"<div id=\"keyaffinity-helpclose\" class=\"keyaffinity-boxclose\">X</div>"+
	
	"<div class=\"keyaffinity-boxtitle\">KeyAffinity Help</div>"+
	
	"<table>"+
	"<tr>"+
		"<td>"+
		
			"<strong>Anywhere</strong><br />"+
			"M - Go to new messages page<br />B - Go to browse page<br />S - Go to Search page<br />Alt-? - KA Help (also via Support dropdown)"+
			"<br />"+
			
			"<strong>Submission pages</strong><br />"+
			"&rarr; - Next Submission<br />&larr; - Previous Submission<br />F - Favorite Submission<br />C - Jump to Comment box<br />&nbsp;&nbsp;&nbsp;(also works on Journals)<br />/ - Change image size<br />D - Download submission<br />"+
			"<br />"+
			
		"</td>"+
		
		"<td>"+
		
			"<strong>Messages pages</strong><br />"+
			"Alt-S - Nuke Submissions<br />Alt-C - Nuke Submission Comments<br />Alt-W - Nuke Watches<br />Alt-H - Nuke Shouts<br />Alt-J - Nuke Journals<br />"+
			"<br />"+
			
			"<strong>User profiles</strong><br />"+
			"W - Watch user<br />N - Note user<br />"+
			"<br />"+
			
		"</td>"+
	"</tr>"+
	"</table>"+
	
	"<div class=\"keyaffinity-popfooter\">" + popupFooter + "</div>"+
	
	"</div>");

// About window
$(".footer").before("" +
	"<!-- inserted by KeyAffinity -->"+
	"<div id=\"keyaffinity-about\" class=\"keyaffinity-bigpop\">"+
	
	"<div id=\"keyaffinity-aboutclose\" class=\"keyaffinity-boxclose\">X</div>"+
	
	"<div class=\"keyaffinity-boxtitle\">About KeyAffinity</div>"+
	
	"<div id=\"keyaffinity-abouttext\">" +
		
		"KeyAffinity is a project from the strange mind of <a href=\"http://k0bi.tk\">Kobi Tate</a>.<br /><br />" +
		"It started out as a short project to pass the time, but has turned into quite an undertaking and I hope you will find it as useful as I have. If you enjoy this extension, you can support it by simply spreading the word or by <a href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CJVJ8XMMGH37J\">donating via Paypal</a> to support further development and to prove to my parents this isn't a waste of time.<br /><br />"+
		"KeyAffinity uses the following resources:"+
		"<ul>"+
			"<li><a href=\"http://jquery.com\">jQuery</a></li>"+
			"<li><a href=\"http://github.com/tzuryby/hotkeys\">jQuery hotkeys</a></li>"+
			"<li>And numerous snippets from StackOverflow that I've lost track of</li>"+
		"</ul><br /><br />"+
		"I would also like to send a special thank you to the following people for their assistance in this project:"+
		"<ul>"+
			"<li>Mai, who supported my addiction to coding and provided ideas and such as KeyAffinity grew.</li>"+
			"<li>Users who submitted Feedback on the FA Forums and GetSatisfaction, specifically Kakurady Drakenar, who motivated me to work on this again after I had let it be for a while.</li>"+
			"<li>My parents, who put up with me having furry art on my screen around them as I worked on this extension obsessively.</li>"+
		"</ul><br /><br />"+
		
		"<div id=\"keyaffinity-aboutlinks\"><a href=\"http://keyaffinity.k0bi.tk\">Official Website</a> <a href=\"https://chrome.google.com/webstore/detail/keyaffinity/jijefnemlojbcmplfaiklanbbcpeacaa\">Chrome Web Store</a> <a href=\"https://getsatisfaction.com/keyaffinity\">Feedback</a> <a href=\"http://github.com/kobitate94/keyaffinity\">GitHub</a>"+
		
	"</div>"+
	
	"<div class=\"keyaffinity-popfooter\">" + popupFooter + "</div>"+
	
	"</div>");

if (mainJump) {
	$('html, body').animate({
		scrollTop: $('.innertable').offset().top 					// Scroll to main section of page if jumping is enabled
		}, 0);
}

// Options popup


// Notification div watching function
jQuery.fn.contentChange = function(callback){
var elms = jQuery(this);
elms.each(
	function(i){
		var elm = jQuery(this);
		elm.data("lastContents", elm.html());
		window.watchContentChange = window.watchContentChange ? window.watchContentChange : [];
		window.watchContentChange.push({"element": elm, "callback": callback});
	}
)
return elms;
}

setInterval(function(){
if(window.watchContentChange){
	for( i in window.watchContentChange){
		if(window.watchContentChange[i].element.data("lastContents") != window.watchContentChange[i].element.html()){
		  window.watchContentChange[i].callback.apply(window.watchContentChange[i].element);
		  window.watchContentChange[i].element.data("lastContents", window.watchContentChange[i].element.html())
		};
	}
}
}, 500);

function checkNotifs() {
	if ($('#new-notes').text() != ""){
		newNotifs = true;							// Mark new notifications as true
		newNotes = true;							// Mark new notes as true
	}
	else if ($('#new-comments').text() != "") {
		newNotifs = true;							// Mark new notifications as true
		newComms = true;							// Mark new comments as true
	}
	else if ($('#new-subs').text() != "") {
		newNotifs = true;							// Mark new notifications as true
		newSubs = true;								// Mark new submissions as true
	}
	else if ($('#new-tickets').text() != "") {
		newNotifs = true;							// Mark new notifications as true
		newTickets = true;							// Mark new support tickets as true
	}
	else {
		newNotifs = false;							// Mark new notifications as false
	}
}

checkNotifs();										// Check for new notifications each page load

$("#notifs").contentChange(function(){				// When the notifications div changes
	checkNotifs();									// See what new notications there are
});													// This is for FA Status compatibility

// Functions for controls
function prevSub() {
    if (prevLink != null && pagination) { 							// Make sure that there is an older submission
    	window.location.href = prevLink; 								// Redirect to it
    }
    else {
        $('#keyaffinity-beginreach').fadeIn(100).delay(500).fadeOut(100); // Show alert if no older submissions
    }
}

function nextSub() {
    if (nextLink != null) {											// Make sure there is a newer submission
        window.location.href = nextLink;									// Redirect to it
    }
    else {
        $('#keyaffinity-endreach').fadeIn(100).delay(500).fadeOut(100);	// Show alert if no newer submissions
    }
}

function faveSub() {
	$('#keyaffinity-favepop').show();								// Show heart popup for visual indicator
	window.location.href = faveLink;										// Redirect to fave link
}

function comment() {
	$('#JSMessage').focus();										// Jump to comment textarea
}

function sizeChange() {
	$('#submissionImg').trigger('click');							// Simulate image click to change size
}

function download() {
	window.location.href = dlLink;										// Go to download page
}

function nuke(type) {
	$("#nuke-" + type).trigger('click');							// Simulate click on nuke button
}

function goToMsgs() {
	if (newNotes){
		window.location.href = "http://furaffinity.net/msg/pms";
	}
	else if (newSubs) {
		window.location.href = "http://furaffinity.net/msg/submissions";
	}
	else if (newComms) {
		window.location.href = "http://furaffinity.net/msg/others";
	}
	else if (newTix) {
		window.location.href = "http://furaffinity.net/msg/troubletickets";
	}
	else {
		$('#keyaffinity-nomsgs').fadeIn(100).delay(500).fadeOut(100);
	}
}

function goToPage(pageName) {
	if (window.location != "http://www.furaffinity.net/" + pageName) {
		window.location.href = "/" + pageName;
	}
}

function watchUser() {
	if (watchLink != null) {
		window.location.href = watchLink;
	}
}

function noteUser() {
	if (noteLink != null) {
		window.location.href = noteLink;
	}
}

function toggleHelp(fadeSpeed) {
	if ($("#keyaffinity-help").css("display") == "none") {
		$("#keyaffinity-help").fadeIn(fadeSpeed);
	}
	else {
		$("#keyaffinity-help").fadeOut(fadeSpeed);
	}
	
	if ($("#keyaffinity-options").css("display") != "none") {
		$("#keyaffinity-options").fadeOut(fadeSpeed);
	}
	if ($("#keyaffinity-about").css("display") != "none") {
		$("#keyaffinity-about").fadeOut(fadeSpeed);
	}
}

function toggleOpt(fadeSpeed) {
	if ($("#keyaffinity-options").css("display") == "none") {
		$("#keyaffinity-options").fadeIn(fadeSpeed);
	}
	else {
		$("#keyaffinity-options").fadeOut(fadeSpeed);
	}
	if ($("#keyaffinity-help").css("display") != "none") {
		$("#keyaffinity-help").fadeOut(fadeSpeed);
	}
	if ($("#keyaffinity-about").css("display") != "none") {
		$("#keyaffinity-about").fadeOut(fadeSpeed);
	}
}

function toggleAbout(fadeSpeed) {
	if ($("#keyaffinity-about").css("display") == "none") {
		$("#keyaffinity-about").fadeIn(fadeSpeed);
	}
	else {
		$("#keyaffinity-about").fadeOut(fadeSpeed);
	}
	if ($("#keyaffinity-help").css("display") != "none") {
		$("#keyaffinity-help").fadeOut(fadeSpeed);
	}
	if ($("#keyaffinity-options").css("display") != "none") {
		$("#keyaffinity-options").fadeOut(fadeSpeed);
	}
}

$('#JSMessage, .textbox, #message, #keywords').focusin(function() {	// When you enter a textbox
	control = false;												// disable control
}).focusout(function() {											// When you leave the textbox
	control = true;													// reenable control
});

// Key combos for message management
if (pageType == "msg" && control) {
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

// Help window toggling
$(document).bind('keydown', 'alt+/', function(){
	toggleHelp(boxFadeSpeed);
});

$("#keyaffinity-helpshow").mousedown(function(){
	toggleHelp(boxFadeSpeed);
});

$("#keyaffinity-helpclose").mousedown(function(){
	toggleHelp(boxFadeSpeed);
});

// Option window toggling
$("#keyaffinity-optshow").mousedown(function(){
	toggleOpt(boxFadeSpeed);
});

$("#keyaffinity-optclose").mousedown(function(){
	toggleOpt(boxFadeSpeed);
});

// About window toggling
$("#keyaffinity-aboutshow").mousedown(function(){
	toggleAbout(boxFadeSpeed);
});

$("#keyaffinity-aboutclose").mousedown(function(){
	toggleAbout(boxFadeSpeed);
});

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
    else if (event.keyCode == 87 && control) {						// Watch for W key (key 87)
    	watchUser();												// Go to watch url if on user page
    }
    else if (event.keyCode == 78 && control) {						// Watch for N key (key 78)
    	noteUser();													// Go to note url if on user page
    }
});

$(document).bind('keydown', '/', function(){
	sizeChange();
});

if (pageType == "newpm") {
	$('input[name*="subject"]').focus();							// Jump to subject box on notes page
}

// Debug running

if (debug) {
    console.log("KeyAffinity is running");
	console.log("\n\n~~ KeyAffinity Debugging ~~");
	console.log("Previous link: " + prevLink);
	console.log("Next link: " + nextLink);
	console.log("Fave link: " + faveLink);
	console.log("Download link: " + dlLink);
	console.log("Full link: " + fullLink);
	console.log("Watch link: " + watchLink);
	console.log("Control: " + control);
	console.log("Pagination: " + pagination);
	console.log("Main section jump: " + mainJump);
	console.log("Comment jump: " + comJump);
	console.log("Page type: " + pageType);
	console.log("Submission number: " + subNumber);
	console.log("New notifications: " + newNotifs);
	console.log("New submissions: " + newSubs);
	console.log("New support tickets: " + newTix);
	console.log("New comments: " + newComms);
	console.log("New notes: " + newNotes);
	console.log("Options:");
	console.log("\tSubmission auto-scroll: " + optVar_subjump);
	console.log("\tDebug Mode: " + optVar_debug);
	console.log("\tDownload redirect: " + optVar_dlredirect);
	console.log("~~ KeyAffinity Debugging ~~\n\n");
	
}
