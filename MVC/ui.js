var UI = (function(){
   var utils = require('/MVC/utils'),
	   Factory = {
			Elements: {
				'window': function() { return Ti.UI.createWindow(); },
				'image': function() { return Ti.UI.createImageView(); },
				'label': function() { return Ti.UI.createLabel(); },
				'input': function() { return Ti.UI.createTextField(); },
				'textarea': function() { return Ti.UI.createTextArea(); },
				'button': function() { return Ti.UI.createButton(); }
			},
			Create: function(type) {
				this.Element = Factory.Elements[type]();
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
					this.Element.addEventListener(ev, (function(a){
						return function() {
							callback.apply(a);
						}
					})(this.Element));
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