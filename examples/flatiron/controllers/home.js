/*
 *  HomeController - a controller called by Ni.router
 *  when a user visits the root URL, /.

 *  Inside the controller's actions 'this' refer to the application
 *  - view(), model() and controllers() are accessors re-defined on the application object
 *  to access Ni models, views and controllers resources
 */

var HomeController = function() {

	/**
	 * Called when accessing the root / resource
	 */
    this.index = function(req, resp, next) {
		this.render(this.view("hello"), this.config.ni.location);
    }

};

/*
 *  Exports the home controller
 */

module.exports = new HomeController();
