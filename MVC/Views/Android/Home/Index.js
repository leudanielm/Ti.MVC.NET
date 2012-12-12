var MVC = require('/MVC/mvc'),
	UI = require('/MVC/ui');

function Index() {
    var txtName =  UI.Element('textField')
                     .attr({  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                              color: '#336699',
                              top: '60dp', 
                              left: '10dp',
                              width: '300dp',                             
                              height: '40dp'}).get();
    var txtEmail = UI.Element('textField')
                     .attr({  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                              color: '#336699',
                              top: '10dp', 
                              left: '10dp',
                              width: '300dp',                          
                              height: '40dp'}).get();
    var btnSubmit = UI.Element('button')
                      .attr({ borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                              color: '#336699',
                              top: '110dp', 
                              left: '10dp',
                              width: '300dp',                     
                              title: 'Submit', 
                              height: '40dp'                        
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
      .get().open();
      
}
module.exports = Index;