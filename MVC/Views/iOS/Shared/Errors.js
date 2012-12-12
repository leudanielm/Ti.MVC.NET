function Errors(errObject) {
	var errs = [], i = 10;
	for (var p in errObject) {
		
	var vw = UI.Element('view')
			  .attr({
			  	backgroundColor: '#eeeeee',
			  	borderRadius: 3,
			  	width: 300,
			  	height: 50,
			  	top: i,
			  	left: 10
			  }).append(
			  	  UI.Element('label')
			  	    .attr({
			  	    	width: 300,
			  	    	height: 30,
			  	    	color: '#9C2525',
			  	    	top: 10,
			  	    	left: 10,
			  	    	text: p + ': ' + errObject[p]
			  	    }).get()
			   ).get();
		 errs.push(vw);
		 i+=60;
	}
	UI.Element('window')
	  .on('click', function() {
	  	 this.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	  })
	  .attr({
	  	backgroundColor: '#9C2525',
	  }).append(errs).get().open({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
}
module.exports = Errors;