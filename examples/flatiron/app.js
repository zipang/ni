/**
 * Flatiron application configuration and start
 */
var flatiron = require("flatiron"),
	ni       = require("ni"),
	config   = JSON.parse(require("fs").readFileSync("config.json", "UTF-8"));

// add locally known infos to the config object
config.ni.root = __dirname;

var app = new flatiron.App(config);

ni.flatiron = {
	plugin : {
		name: "ni",
		attach: function(options) {
			for (var opt in options) {
				ni.config(opt, options[opt]);
			}
		},
		init: function(done) { // attach ni model, view and controllers accessors to the application object
			var app = this;
			ni.setContext(app);
			app.model = ni.model;
			app.view = ni.view;
			app.controller = ni.controller;
			ni.boot(done);
		},
		detach: function() {
			delete app.model;
			delete app.view;
			delete app.controller;
		}
	}
};

// Configure the plugins used
app.use(ni.flatiron.plugin); // Ni plugin will automatically received the application options declared in the 'ni' namespace..
app.use(flatiron.plugins.http, {before: [ni.router]});

app.start(config.port, config.server);

