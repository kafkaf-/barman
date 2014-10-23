self.port.on("startAnalysis", function() {
    html2canvas(document.body, {
	    onrendered: function(canvas) {
	    	var colorThief = new ColorThief();
			var palette = colorThief.getPalette(canvas);
			self.port.emit("analysisFinished", JSON.stringify(palette));
	    }
    });
});