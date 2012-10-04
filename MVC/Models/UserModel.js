module.exports = 
	MVC.Model('User')
	   .setProperty('Name', '', true, false, 'The field \'Name\' is required.')
	   .setProperty('Email', '', true, false, 'The field \'Email\' is required.')
	   .create();