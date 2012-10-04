module.exports =
	MVC.Controller('Home')
	   .setAction('Index', function() { this.ViewData['title'] = 'ViewData Title'; return this.View(); })
	   .setAction('About', function(name, email) {
		  	 var model = MVC.InvokeModel('User');
		  	 model.Fill({'Name': name, 'Email': email });
		  	 if (model.IsValid()) {
		  	 	this.ViewData['name'] = name;
				this.ViewData['email'] = email;
				return this.View();
		  	 } else {
		  	 	return this.View('MVC/Views/Shared/Errors.js', model.Errors());
		  	 }	   	
			
	   	})
	   .create();