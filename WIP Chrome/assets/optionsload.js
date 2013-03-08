function saveOption(name, value) {
	chrome.storage.sync.set({name: value}, function() {
    	console.log(name + " set to " + value);
    });
}

function getOption() {
	console.log("In getOption");
	chrome.storage.sync.get("loaded", function(items) {
		console.log("In sync.get");
		console.log(items.loaded);
		return items.loaded;
	});
}


$(document).ready(function(){

//saveOption("loaded", "reset");
//alert(getOption());

/*
if (getOption("opt_loaded") == null || getOption("opt_loaded") == "reset") {
	localStorage["opt_loaded"] = "true";
	localStorage["opt_subjump"] = "true";
	localStorage["opt_debug"] = "false";
	localStorage["opt_status"] = "false"
}
window.optVar_subjump = localStorage["opt_subjump"];
window.optVar_debug = localStorage["opt_debug"];
window.optVar_status = localStorage["opt_status"];
*/

});