
var CACHE_KEY = "barman-palette";

function getCachedPalette() {
  return sessionStorage.getItem(CACHE_KEY);
}

function cachePalette(palette) {
  sessionStorage.setItem(CACHE_KEY, palette);
}

function analyze() {
    html2canvas(document.body, {
    height: 300,
    width: 300,
    //useCORS: true,
    onrendered: function(canvas) {
      var colorThief = new ColorThief();
      var palette = JSON.stringify(colorThief.getPalette(canvas, 2));
      cachePalette(palette);
      self.port.emit("analysisFinished", palette);
    }
  });
}

self.port.on("startAnalysis", function() {
    var cachedPalette = getCachedPalette();
    if (cachedPalette)
    {
        self.port.emit("analysisFinished", cachedPalette);
    }
    else
    {
        analyze();
    }
});
