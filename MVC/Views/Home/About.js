function About(AboutModel) {
		txtName =  UI.Element('TextField')
		    	     .attr({  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
 						      color: '#336699',
  					 	      top: 60,
  					 	      value: this.ViewData['name'],
  					 	      left: 10,
  					 	      width: 300, 
  					 	      height: 40}).get(),
  		txtEmail = UI.Element('TextField')
 		    	     .attr({  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
 						      color: '#336699',
  					 	      top: 10, 
  					 	      value: this.ViewData['email'],  					 	      
  					 	      left: 10,
  					 	      width: 300, 
  					 	      height: 40}).get(),
	    bkgImg = UI.Element('ImageView')
			    .attr({'width': 320,
				 	  'height': 480,
				 	  'duration': 1000,
				 	  'preventDefaultImage': true})
			    .get();
	UI.Element('Window')
	   .attr({'title': 'hello','backgroundColor': '#ccc'})
	   .on('click', function(){
	   		this.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	   })
	   .append([bkgImg, txtName, txtEmail]).get().open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
}
module.exports = About;