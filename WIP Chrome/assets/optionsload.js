$(document).ready(function(){
	
if (localStorage["opt_loaded"] == null || localStorage["opt_loaded"] == "reset") {
	localStorage["opt_loaded"] = "true";
	localStorage["opt_subjump"] = "true";
	localStorage["opt_debug"] = "false";
	localStorage["opt_status"] = "false"
}
window.optVar_subjump = localStorage["opt_subjump"];
window.optVar_debug = localStorage["opt_debug"];
window.optVar_status = localStorage["opt_status"];


});