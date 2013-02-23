var changesMade = false;

$(document).ready(function(){

function getVersion() { 
    var version = 'NaN'; 
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', chrome.extension.getURL('manifest.json'), false); 
    xhr.send(null); 
    var manifest = JSON.parse(xhr.responseText); 
    return manifest.version; 
  } 

var version = getVersion();

document.title = "KeyAffinity v." + version + " Options";
$("#bar #version").html("v" + version);

function resetDefaults() {
	localStorage["opt_loaded"] = "reset";
	alert("Options have been reset. Reloading page.");
	window.location = window.location;
}

$("select, input, a.button, button").uniform();

$("#opt_subjump2").html(optVar_subjump);
$("#opt_status2").html(optVar_status);
$("#opt_debug2").html(optVar_debug);

if (optVar_subjump == "true") {
	$("input#opt_subjump").attr('checked', true);
}
else {
	$("input#opt_subjump").attr('checked', false);
}

if (optVar_status == "true") {
	$("input#opt_status").attr('checked', true);
}
else {
	$("input#opt_status").attr('checked', false);
}

$("#reset").mousedown(function(){
	resetDefaults();
});


});