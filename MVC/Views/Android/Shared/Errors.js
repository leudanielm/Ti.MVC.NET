var UI = require('/MVC/ui');

function Errors(errObject) {
	var errs = [], i = 10;
	for (var p in errObject) {
		
	var vw = UI.Element('view')
			  .attr({
			  	backgroundColor: '#eeeeee',
			  	borderRadius: 3,
			  	width: '300dp',
			  	height: '50dp',
			  	top: i + 'dp',
			  	left: '10dp'
			  }).append(
			  	  UI.Element('label')
			  	    .attr({
			  	    	width: '300dp',
			  	    	height: '30dp',
			  	    	color: '#9C2525',
			  	    	top: '10dp',
			  	    	left: '10dp',
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