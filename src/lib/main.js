var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var buttons = require('sdk/ui/button/action');
var engine = require('./engine.js');
var utils = require('./color.js');
var dbapi = require('./db.js');

const {Cu} = require("chrome");
const {TextEncoder, TextDecoder, OS} = Cu.import("resource://gre/modules/osfile.jsm", {});

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
  onClick: preload
});


function preload(state) {
  let decoder = new TextDecoder();        // This decoder can be reused for several reads
  let promise = OS.File.read("/home/kafkaf/dev/cocktail_dumps/esquire/esquire_new.json"); // Read the complete file as an array
  promise = promise.then(
    function onSuccess(array) {
      var str = decoder.decode(array);
      var cocktails = JSON.parse(str);
      for (var index in cocktails) {
          var cocktail = cocktails[index];
          dbapi.insert(cocktail);
      }
      console.log('Done inserting');
      let encoder = new TextEncoder();                                   // This encoder can be reused for several writes
      let array = encoder.encode(JSON.stringify(dbapi.cocktails));                   // Convert the text to an array
      let promise2 = OS.File.writeAtomic("/home/kafkaf/dev/cocktail_dumps/esquire/esquire_new.json", array,               // Write the array atomically to "file.txt", using as temporary
          {tmpPath: "file.txt.tmp"});
      console.log('Done with IVector');

    }
  );

}
function startAnalysis(state) {
    var startSignal = "startAnalysis";
    var doneSignal = "analysisFinished";

  	var worker = tabs.activeTab.attach({
		contentScriptWhen: "end",
	  	contentScriptFile: [data.url("barman.js"), data.url("ext/html2canvas.js"), data.url("ext/color-thief.min.js")],
    });

    worker.port.on(doneSignal, function(palette) {
      var p = new utils.Palette(palette.slice(1))
      var chosenCocktail = engine.getCocktailByPalette(p);
   		panel.port.emit(doneSignal, chosenCocktail)
 	});

    panel.show();
	worker.port.emit(startSignal);
}
