var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var buttons = require('sdk/ui/button/action');

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icons/icon-16.png",
    "32": "./icons/icon-32.png",
    "64": "./icons/icon-64.png"
  },
  onClick: startAnalysis
});

function startAnalysis(state) {
  	var worker = tabs.activeTab.attach({
		contentScriptWhen: "end",
	  	contentScriptFile: [data.url("barman.js"), data.url("ext/html2canvas.js"), data.url("ext/color-thief.min.js")],
    });	
	worker.port.emit("startAnalysis");
	worker.port.on("analysisFinished", function(colorPalette) {
 		console.log(JSON.parse(colorPalette))
 	});
}