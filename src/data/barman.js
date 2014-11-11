function analyze() {
    html2canvas(document.body, {
    height: 300,
    width: 300,
    onrendered: function(canvas) {
      try {
        var colorThief = new ColorThief();
        var palette = JSON.stringify(colorThief.getPalette(canvas, 2));
        self.port.emit("analysisFinished", palette);
      } catch(err) {
          self.port.emit("error", err.message);
      }
    }
  });
}

self.port.on("startAnalysis", function() {
    analyze();
});
