module.exports =
    new MVC.Controller('Home')
    	   .setAction('Index', function() { this.ViewData['title'] = 'ViewData Title'; return this.View(); })
    	   .setAction('About', function(name, email) {
				this.ViewData['name'] = name;
				this.ViewData['email'] = email;
				
				return this.View({foo:'bar'});
    	   	})
    	   .create();