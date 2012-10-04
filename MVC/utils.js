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
			_emptyString: function(string) {
				return /^\s*$/.test(string);
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
			},
			_path: function(string) {
				return Ti.Filesystem.resourcesDirectory.replace(/\//gi, Ti.Filesystem.getSeparator()) + string.replace(/\//gi, Ti.Filesystem.getSeparator());
			} 	
	  };
	   
	   return {
	   	  _type: utils._type,
	   	  _format: utils._format,
	   	  _empty: utils._empty,
	   	  _path: utils._path,
	   	  _emptyString: utils._emptyString,
	   }
})();

module.exports = UTILS;
