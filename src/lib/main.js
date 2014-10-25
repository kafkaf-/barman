var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var buttons = require('sdk/ui/button/action');
var engine = require('./engine.js')
var colors = require('./colors.js')

var panel = require("sdk/panel").Panel({
  width: 300,
  height: 300,
  contentURL: data.url("panel/panel.html"),
  contentScriptFile: data.url("panel/panel.js"),
  contentScriptStyle: data.url("panel/panel.css")
});

panel.on("hide", function() {
  panel.port.emit("hide");
})

panel.port.on("hide-request", function() {
  panel.hide();
});

var button = buttons.ActionButton({
  id: "main-btn",
  label: "Barman",
  icon: {
    "16": "./icons/cocktail16.png",
    "32": "./icons/cocktail32.png",
    "64": "./icons/cocktail64.png"
  },
  onClick: startAnalysis
});



function startAnalysis(state) {
    var startSignal = "startAnalysis";
    var doneSignal = "analysisFinished";

  	var worker = tabs.activeTab.attach({
		contentScriptWhen: "end",
	  	contentScriptFile: [data.url("barman.js"), data.url("ext/html2canvas.js"), data.url("ext/color-thief.min.js")],
    });

    worker.port.on(doneSignal, function(colorPalette) {
      var p = new colors.Palette(colorPalette.slice(1))
      var chosenCocktail = engine.getCocktailByPalette(p);
   		panel.port.emit(doneSignal, chosenCocktail)
 	});

    panel.show();
	worker.port.emit(startSignal);
}
