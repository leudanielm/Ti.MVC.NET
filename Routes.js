var Routes = function() {
	this.routes = [];
}
Routes.prototype = {
	MapRoute: function(routeName, routePath, routeParams) {
		this.routes.push({
			'name': routeName,
			'url': routePath,
			'params': routeParams
		});
		return this;
	}
}
module.exports = Routes;