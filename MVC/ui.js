var UI = (function(){
   var utils = require('/MVC/utils'),
	   Factory = {
	   	    Elements: function(element) {
	   	    	return Ti.UI['create' + element.replace(/^./, function(e){return e.toUpperCase()})]();
	   	    },
			Create: function(type) {
				this.Element = Factory.Elements(type);
				this.EventListeners = {};
				this.attr = function() {
					if (arguments.length == 2) {
						this.Element[arguments[0]] = arguments[1];
					} else if (arguments.length == 1) {
						var argObject = arguments[0];
						for (var p in argObject) {
							this.Element[p] = argObject[p];
						}
					}
					return this;
				}
				this.on = function(ev, callback) {
					this.EventListeners[ev] = callback;
					this.Element.addEventListener(ev, (function(a){
						return function() {
							callback.apply(a);
						}
					})(this.Element));
					return this;
				},
				this.off = function(ev) {
					this.Element.removeEventListener(ev, this.EventListeners[ev]);
					return this;
				}
				this.get = function() {
					return this.Element;
				}
				this.append = function(element) {
					var that = this;
				    switch (utils._type(element)) {
				    	case 'array':
				    		element.forEach(function(item) {
				    			that.Element.add(item);
				    		});				    	
				    		break;
				    	case 'object':
				    		this.Element.add(element);
				    	break;
				    }
					return this;
				}
				return this;
			}
	},
	Element = function(type) {
		return new Factory.Create(type);
	};
	
	return {
		Element: Element
	}

})();

module.exports = UI;