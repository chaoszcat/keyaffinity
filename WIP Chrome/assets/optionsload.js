$(document).ready(function(){
/*
if (localStorage["opt_loaded"] == null || localStorage["opt_loaded"] == "reset") {
	localStorage["opt_loaded"] = "true";
	localStorage["opt_subjump"] = "true";
	localStorage["opt_debug"] = "false";
	localStorage["opt_status"] = "false"
}

window.optVar_subjump = localStorage["opt_subjump"];
window.optVar_debug = localStorage["opt_debug"];
window.optVar_status = localStorage["opt_status"];
*/

var txtFile = new XMLHttpRequest();
var allText;
var csvFile = chrome.extension.getURL("assets/savedoptions.csv");
console.log(csvFile);

txtFile.open("GET", csvFile, true);
txtFile.onreadystatechange = function() {
	if (txtFile.readyState === 4) {
		if (txtFile.status === 200) {
			allText = txtFile.responseText; 
		}
	}
}

console.log(allText);
var optionsArray = $.csv.toArray(allText);

window.parent.postMessage("hello", "*");



});