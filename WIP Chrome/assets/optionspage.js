$(document).ready(function(){

/* ---------- Version grabbing ---------- */

function getVersion() { 
    var version = 'NaN'; 
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', chrome.extension.getURL('manifest.json'), false); 
    xhr.send(null); 
    var manifest = JSON.parse(xhr.responseText); 
    return manifest.version; 
  } 
var version = getVersion();
$("#bar #version").html("v" + version);

/* ---------- Option setting functions ---------- */

function setOption(name, val) {
	localStorage["opt_" + name] = val;
}

function resetDefaults() {
	localStorage["opt_loaded"] = "reset";
	alert("Options have been reset. Reloading page.");
	window.location = window.location;
}

$("#reset").mousedown(function(){
	resetDefaults();
});

/* ---------- For debugging ---------- */

$("#opt_subjump2").html(optVar_subjump);
$("#opt_status2").html(optVar_status);
$("#opt_debug2").html(optVar_debug);

/* ---------- Initial checkbox settings ---------- */

if (optVar_subjump == "true") {
	$("input:checkbox#opt_subjump").attr("checked", "checked");
}
else {
	$("input:checkbox#opt_subjump").removeAttr("checked");
}

if (optVar_status == "true") {
	$("input:checkbox#opt_status").attr("checked", "checked");
}
else {
	$("input:checkbox#opt_status").removeAttr("checked");
}

if (optVar_debug == "true") {
	$("input:checkbox#opt_debug").attr("checked", "checked");
}
else {
	$("input:checkbox#opt_debug").removeAttr("checked");
}

$("#optionsform").submit(function(){

	// Set Submission jumping
	if ($("input:checkbox#opt_subjump").is(":checked")) {
		setOption("subjump", "true");
	}
	else {
		setOption("subjump", "false");
	}
	
	// Set FAStatus
	if ($("input:checkbox#opt_status").is(":checked")) {
		setOption("status", "true");
	}
	else {
		setOption("status", "false");
	}
	
	// Set Debugging
	if ($("input:checkbox#opt_debug").is(":checked")) {
		setOption("debug", "true");
	}
	else {
		setOption("debug", "false");
	}
	
});


});