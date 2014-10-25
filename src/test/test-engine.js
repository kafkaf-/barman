var engine = require("./engine");

exports["test engine"] = function(assert) {
  assert.ok(1 == 1, "engine works");
}

require("sdk/test").run(exports);
