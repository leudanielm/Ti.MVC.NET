var MVC = (function() {
    // Helpers
    var utils = require('/MVC/utils'),
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
	    	'model': function(a) { var b = require(utils._format('/MVC/Models/{0}Model', a)); return ('function' === typeof b) ? new b() : b; },
	    	'controller': function(a) { var b = require('/MVC/Controllers/' + a + 'Controller');  return ('function' === typeof b) ? new b() : b; }
	    },   
      	//Classes
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
					  'View':     function() { 
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
	    Model = function(name) {
	    	var that = this;
	    	this.Properties = {};
	    	this.setProperty = function() {
	    		if (arguments.length < 2) {
	    			throw 'MVC.Model takes at least two arguments.';
	    		}
	    		this.Properties[arguments[0]] = {
	    			value: arguments[1],
	    			isRequired: arguments[2] || false,
	    			regex: arguments[3] || false,
	    			errorMessage: arguments[4] || false
	    		}
	    		return this;    		
	    	};
	    	this.create = function() {
	    	   return (function() {
	    	   		var _props = that.Properties,
	    	   		    _properties = function() {
	    	   		    	var _ret = {};
	    	   		    	for (var p in _props) {
	    	   		    		_ret[p] = _props[p].value;
	    	   		    	}
	    	   		    	
	    	   		    	return _ret;
	    	   		    },
	    	   			_fill = function(obj) {
	    	   				for (var p in obj) {
	    	   					_props[p].value = obj[p];
	    	   				}
	    	   			},
	    	   			_errors = function() {
	    	   				var _err = {};
	    	   				for (var p in _props) {
	    	   					if (_props[p].isRequired && utils._emptyString(_props[p].value)) {
	    	   						_err[p] = _props[p].errorMessage;
	    	   					}
	    	   					if (_props[p].regex && !_props[p].regex.test(_props[p].value)) {
	    	   						_err[p] = _props[p].errorMessage;
	    	   					}
	    	   				}
	    	   				return _err;
	    	   			},
	    	   			_validate = function() {
	    	   				var _bool = true;
	    	   				for (var p in _props) {
	    	   					if (_props[p].isRequired && utils._emptyString(_props[p].value)) {
	    	   						_bool = false;
	    	   					}
	    	   					if (_props[p].regex && !_props[p].regex.test(_props[p].value)) {
	    	   						_bool = false;
	    	   					}
	    	   				}
	    	   				return _bool;	    	   				
	    	   			}
					
					return {
						getProperties: _properties,
						Fill: _fill,
						isValid: _validate,
						getErrors: _errors
					}
	    	   })();
	    	}
	    	return this;
	    },
	    
	    //Factory functions
	    createController = function(name) {
	    	return new Controller(name);
	    },
	    createModel = function(name) {
	    	return new Model(name);
	    },
	    
	    //Invoker functions
   	    invokeModel = function(name) {
   			 return include.model(name); 

	    },
	    invokeController = function() {
	   	
	   	  if (arguments.length < 1) { throw 'MVC.Invoke requires a minimum of one argument.'; }
	   	  
	   	  var ctrlMethod;
	   	  if (arguments.length == 1) {
	   	  	 ctrlMethod = include.controller(arguments[0]).Methods['Index'];
	   	  	 if ('undefined' === typeof ctrlMethod) { throw utils._format('MVC.Invoke: {0}Controller does not have an Index method', arguments[0]); }
	   	  	 return ctrlMethod.call(ctrlMethod).apply(ctrlMethod);
	   	  } else {
			 ctrlMethod = include.controller(arguments[0]).Methods[arguments[1]];	   	  	
	   	  }

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
		InvokeController: invokeController,
		InvokeModel: invokeModel,
		Controller: createController,
		Model: createModel,
	}

})();

module.exports = MVC;