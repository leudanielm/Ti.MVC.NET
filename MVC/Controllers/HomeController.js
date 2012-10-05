module.exports =
	MVC.Controller('Home')
	   .setAction('Index', function() { this.ViewData['title'] = 'ViewData Title'; return this.View(); })
	   .setAction('About', function(name, email) {
		  	 var model = MVC.InvokeModel('User')
		  	 				.Fill({'Name': name, 'Email': email });
		  	 if (model.isValid()) {
		  	 	this.ViewData['name'] = model.getProperties('Name');
				this.ViewData['email'] = model.getProperties('Email');
				return this.View();
		  	 } else {
		  	 	return this.View('MVC/Views/Shared/Errors.js', model.getErrors());
		  	 }	   	
	   	})
	   .create();