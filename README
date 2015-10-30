#Ti.MVC.NET is lightweight a MVC framework developed for Appcelerator Titanium which follows the ASP.NET MVC 2 pattern.

### How does it work?
It follows closely with the standard ASP.NET pattern. You have a view, a controller and a model.

####Below is a basic example of a simple hello world app
####Have a look at the resources under the MVC folder. That should be sufficient to get you up running with the framework.

#####The Controller:
```javascript
var MVC = require('mvc');
module.exports =
  MVC.Controller('Home')
     .setAction('Index', function() { this.ViewData.header = 'Welcome!'; return this.View(); })
     .create();
```

#####The View:
```javascript
var MVC = require('mvc'),
    UI = require('UI');
    
function Index() {
  var txtHello = UI.Element('textField')
                   .attr('value', this.ViewData.header)
                   .get();
  UI.Element('window')
    .append(txtHello)
    .open();
}
```
