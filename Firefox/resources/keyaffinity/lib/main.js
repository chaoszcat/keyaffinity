var data = require("self").data;
var pageMod = require("page-mod");
pageMod.PageMod({
  include: ["*.furaffinity.net"], 
  contentScriptWhen: 'ready',
  contentScriptFile: [data.url("jquery.js"), data.url("hotkeys.js"), data.url("keyaffinity.js")],
  contentStyleFile: data.url("styles.css")
});
