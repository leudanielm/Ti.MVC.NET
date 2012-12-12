function About(AboutModel) {
	var txtName =  UI.Element('textField')
		    	     .attr({  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
 						      color: '#336699',
  					 	      top: 60,
  					 	      value: this.ViewData['name'],
  					 	      fontFamily: 'Helvetica',
  					 	      fontStyle: {
  					 	      	fontSize: 11
  					 	      },
  					 	      left: 10,
  					 	      width: 300, 
  					 	      height: 40}).get(),
  		 txtEmail = UI.Element('textField')
 		    	     .attr({  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
 						      color: '#336699',
  					 	      top: 10, 
  					 	      value: this.ViewData['email'],
  					 	      fontFamily: 'Helvetica',
  					 	      fontStyle: {
  					 	      	fontSize: 11
  					 	      },  					 	        					 	      
  					 	      left: 10,
  					 	      width: 300, 
  					 	      height: 40}).get();
  		
	UI.Element('window')
	   .attr({'title': 'hello','backgroundColor': '#eeeeee'})
	   .on('click', function(){
	   		this.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	   })
	   .append([txtName, txtEmail]).get().open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
}
module.exports = About;