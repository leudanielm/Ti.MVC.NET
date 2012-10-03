var MVC = (function() {
   var utils = require('/MVC/utils'),
	    Controller = function(name) {
	    	var that = this;
			this.Name = name;
			this.Methods = [];
			this.setAction = function(name, callback) {
				this.Methods.push(
					{ 'Controller': that.Name, 
					  'Name': 		name, 
					  'Method': 	callback,
					  'ViewData':  	{},
					  'View': 		function() { 
					  				  if (arguments.length == 0) {
					  				  	  if (utils._empty(this.ViewData)) {
											include.view(this.Controller, this.Name);
										  } else {
										  	include.view(this.Controller, this.Name, this.ViewData);
										  }
					  					} else if (arguments.length == 1) {
					  						if (utils._empty(this.ViewData)) {
						  						switch (utils._type(arguments[0])) {
						  							case 'string':
						  								if (Ti.Filesystem.getFile(arguments[0]).exists()) {
						  									var t = require(arguments[0].replace('.js', ''));
						  									return ('function' === typeof t) ? new t() : t;
						  								}
						  							break;
						  							case 'object':
						  								return include.view(this.Controller, this.Name, {}, arguments[0]);
						  							break;
						  							case 'array':
						  								return include.view(this.Controller, this.Name, {}, arguments[0]);
						  							break;
						  						}
						  					} else {
						  						switch (utils._type(arguments[0])) {
						  							case 'string':
						  								if (Ti.Filesystem.getFile(arguments[0]).exists()) {
						  									var t = require(arguments[0].replace('.js', ''));
						  									if ('function' === typeof t) {
						  										t.prototype.ViewData = this.ViewData;
						  										return new t();
						  									} else {
						  										t.ViewData = this.ViewData;
						  										return t;
						  									}
						  								}
						  							break;
						  							case 'object':
						  								return include.view(this.Controller, this.Name, this.ViewData, arguments[0]);
						  							break;
						  							case 'array':
						  								return include.view(this.Controller, this.Name, this.ViewData, arguments[0]);
						  							break;
						  						}						  						
						  					}
					  					} else if (arguments.length == 2) {
					  						if (utils._type(arguments[0], arguments[1]) == ('string:object' || 'string:array')) {
					  						  if (utils._empty(this.ViewData)) {
					  							if (Ti.Filesystem.getFile(arguments[0]).exists()) {
					  								var t = require(arguments[0].replace('.js', ''));
					  								return ('function' === typeof t) ? new t(arguments[1]) : t;
					  							}
				  							  } else {
					  							if (Ti.Filesystem.getFile(arguments[0]).exists()) {
					  								var t = require(arguments[0].replace('.js', ''));
					  								if ('function' === typeof t) {
					  									t.prototype.ViewData = this.ViewData;
					  									return new t(arguments[1]);
					  								} else {
					  									t.ViewData = this.ViewData;
					  									return t;
					  								}
					  							  }
				  							   }
					  						}
					  					}
					  				}});
				return this;
			}
			this.create = function() {
				return (function(){
					var Name = that.Name,
					    Methods = that.Methods,
						_temp;
						
							(function() {
							   _temp = {};
							   for (var i = 0; i < Methods.length; i++) {
							   	  _temp[Methods[i].Name] = (function(a) { 
							   	  	  							return function() { 
						   	  										return function() {
						   	  											for (var i = 0; i < arguments.length; i++) {
						   	  												Ti.API.info(arguments[i]);
						   	  											}
						   	  											a.Method.apply(a, arguments);
						   	  										}
							   	  								} 
							   	  							})(Methods[i]);
							   }
							})();
	
						return {
							Methods: _temp
						}
				})();
			}
	    },
	    include = {
	    	'view': function() {
	    		var d = require(utils._format('MVC/Views/{0}/{1}', arguments[0], arguments[1]));
	    		switch (arguments.length) {
	    			case 2:
    					return new d();
    				break;
    				case 3:
    					d.prototype.ViewData = arguments[2];
    					return new d();
    				break;
    				case 4:
    					d.prototype.ViewData = arguments[2];
    					return new d(arguments[3]);
    				break;
	    		}
	    	},
	    	'model': function(a, params) { var b = require('/MVC/Models/' + a + 'Model'); return new b(params); },
	    	'controller': function(a) { var b = require('/MVC/Controllers/' + a + 'Controller');  return ('function' === typeof b) ? new b() : b; }
	    },
	   Invoke = function() {
	   	
	   	  if (arguments.length < 2) { throw 'MVC.Invoke requires a minimum of two arguments.'; }  
	   	  
	   	  var ctrlMethod = include.controller(arguments[0]).Methods[arguments[1]];

	   	  if (arguments.length == 2) {
	   		   return ctrlMethod.call(ctrlMethod).apply(ctrlMethod);
	   		} else if (arguments.length > 2) {
	   			var args = [];
	   			for (var i = 2; i < arguments.length; i++) {
	   				args.push(arguments[i]);
	   			}
	   			return ctrlMethod.call(ctrlMethod).apply(ctrlMethod, args);
	   		}
	   };
	
	return {
		Invoke: Invoke,
		Controller: Controller
	}

})();

module.exports = MVC;