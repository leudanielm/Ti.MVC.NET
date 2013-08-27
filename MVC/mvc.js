var MVC = (function () {
    // Helpers
    var utils = require('/MVC/utils'),
        platform = (function (os) {
            return (/iphone|ipad/i.test(os)) ?
                'iOS' : (/android/i.test(os)) ? 'Android' : 'MobileWeb';
        })(Ti.Platform.osname),
        pathify = function (path) {
            return path.replace(/Views\//i, function (e) {
                return e + platform + '/';
            });
        },
        include = {
            'view': function () {
                var d = require(utils._format('MVC/Views/{0}/{1}/{2}', platform, arguments[0], arguments[1]));
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
            'model': function (a) {
                var b = require(utils._format('/MVC/Models/{0}Model', a));
                return ('function' === typeof b) ? new b() : b;
            },
            'controller': function (a) {
                var b = require('/MVC/Controllers/' + a + 'Controller');
                return ('function' === typeof b) ? new b() : b;
            }
        },
        //Classes
        Controller = function (name) {
            var that = this;
            this.Name = name;
            this.Methods = [];
            this.setAction = function (name, callback) {
                this.Methods.push({
                    'Controller': that.Name,
                    'Name': name,
                    'Method': callback,
                    'ViewData': {},
                    'redirectToAction': function () {
                        if (!arguments.length) {
                            throw 'MVC: RedirectToAction takes at least one argument.';
                        } else if (arguments.length == 1) {
                            return invokeController(that.Name, arguments[0]);
                        } else if (arguments.length > 2) {
                            Array.prototype.unshift.apply(arguments, [that.Name]);
                            return invokeController.apply(null, arguments);
                        }
                    },
                    'View': function () {
                        if (arguments.length == 0) {
                            if (utils._empty(this.ViewData)) {
                                return include.view(this.Controller, this.Name);
                            } else {
                                return include.view(this.Controller, this.Name, this.ViewData);
                            }
                        } else if (arguments.length == 1) {
                            if (utils._empty(this.ViewData)) {
                                switch (utils._type(arguments[0])) {
                                case 'string':
                                    if (Ti.Filesystem.getFile(pathify(arguments[0])).exists()) {
                                        var t = require(pathify(arguments[0].replace('.js', '')));
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
                                        var t = require(pathify(arguments[0].replace('.js', '')));
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
                                    if (Ti.Filesystem.getFile(pathify(arguments[0])).exists()) {
                                        var t = require(pathify(arguments[0].replace('.js', '')));
                                        return ('function' === typeof t) ? new t(arguments[1]) : t;
                                    }
                                } else {
                                    if (Ti.Filesystem.getFile(arguments[0]).exists()) {
                                        var t = require(pathify(arguments[0].replace('.js', '')));
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
                    }
                });
                return this;
            }
            this.create = function () {
                return (function () {
                    var Name = that.Name,
                        Methods = that.Methods,
                        _temp;

                    (function () {
                        _temp = {};
                        for (var i = 0; i < Methods.length; i++) {
                            _temp[Methods[i].Name] = (function (a) {
                                return function () {
                                    return function () {
                                        return a.Method.apply(a, arguments);
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
        Model = function (name) {
            var that = this;
            this.Properties = {};
            this.setProperty = function () {
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
            this.create = function () {
                return (function () {
                    var Model = function () {
                        var _props = that.Properties;
                        this.getProperties = function () {
                            var _ret = {};
                            for (var p in _props) {
                                _ret[p] = _props[p].value;
                            }

                            return (!arguments.length) ? _ret : _ret[arguments[0]];
                        }
                        this.Fill = function (obj) {
                            for (var p in obj) {
                                if (_props.hasOwnProperty(p)) {
                                    _props[p].value = obj[p];
                                }
                            }
                            return this;
                        }
                        this.getErrors = function () {
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
                        }
                        this.isValid = function () {
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

                        return this;
                    };

                    return new Model();

                })();
            }
            return this;
        },

        //Factory functions
        createController = function (name) {
            return new Controller(name);
        },
        createModel = function (name) {
            return new Model(name);
        },

        //Invoker functions
        invokeModel = function (name) {
            return include.model(name);

        },
        invokeController = function () {

            if (arguments.length < 1) {
                throw 'MVC.Invoke requires a minimum of one argument.';
            }

            var ctrlMethod;
            if (arguments.length == 1) {
                ctrlMethod = include.controller(arguments[0]).Methods['Index'];
                if ('undefined' === typeof ctrlMethod) {
                    throw utils._format('MVC.Invoke: {0}Controller does not have an Index method', arguments[0]);
                }
                return ctrlMethod.call(ctrlMethod).apply(ctrlMethod);
            } else {
                ctrlMethod = include.controller(arguments[0]).Methods[arguments[1]];
            }

            if (arguments.length == 2) {
                return ctrlMethod.call(ctrlMethod).apply(ctrlMethod);
            } else if (arguments.length > 2) {
                Array.prototype.splice.apply(arguments, [0, 2]);
                return ctrlMethod.call(ctrlMethod).apply(ctrlMethod, arguments);
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
