function Index() {
	var txtName =  UI.Element('textField')
		    	     .attr({  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
 						      color: '#336699',
  					 	      top: 60, 
  					 	      left: 10,
  					 	      width: 300, 
  					 	      height: 40}).get();
  	var txtEmail = UI.Element('textField')
 		    	     .attr({  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
 						      color: '#336699',
  					 	      top: 10, 
  					 	      left: 10,
  					 	      width: 300, 
  					 	      height: 40}).get();
  	var btnSubmit = UI.Element('button')
  	 				  .attr({ borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
 						      color: '#336699',
  					 	      top: 110, 
  					 	      left: 10,
  					 	      width: 300,
  					 	      title: 'Submit', 
  					 	      height: 40  	 				  	
  	 				  }).on('click', function() {
							MVC.InvokeController('Home', 'About', txtName.value, txtEmail.value);
  	 				  })
  	 				  .get();				 	      
	
	
	UI.Element('window')
	  .attr({
	  	title: 'hello',
	  	backgroundColor: '#eeeeee'
	  })
	  .append([txtName, txtEmail, btnSubmit])
	  .get().open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	  
}
module.exports = Index;