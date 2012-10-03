var UTILS = (function(){
	  var utils = {
			_empty: function(obj) {
				switch (utils._type(obj)) {
					case "array":
						return !obj.length;
					break;
					case "object":
						return !Object.keys(obj).length;
					break;
				}
			},
			_format: function(string) {
			    if (arguments.length > 1) {
			    for (var i = 0; i < arguments.length; i++) {
			           string = string.replace(new RegExp('\\{' + i + '\\}'), arguments[i+1]);
			      }
			          return string;
			     } else { return string; }
			},
			_type: function() {
				var _translate = function(o) {
					return String.prototype.toLowerCase.apply(Object.prototype.toString.call(o).match(/\w*(?=])/));
				}
				if (arguments.length > 1) {
					var r = [];
					for (var i = 0; i < arguments.length; i++) {
						r[i] = _translate(arguments[i]);
					}	
					return r.join(':');
				} else { 
					return _translate(arguments[0]);
				}
			} 	
	  };
	   
	   return {
	   	  _type: utils._type,
	   	  _format: utils._format,
	   	  _empty: utils._empty
	   }
})();

module.exports = UTILS;
