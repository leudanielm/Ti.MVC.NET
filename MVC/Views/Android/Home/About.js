var UI = require('/MVC/ui');

function About(AboutModel) {
    var txtName =  UI.Element('textField')
                     .attr({  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                              color: '#336699',
                              top: '60dp',
                              value: this.ViewData['name'],
                              fontFamily: 'Helvetica',
                              fontStyle: {
                                fontSize: '11dp'
                              },
                              left: '10dp',
                              width: '300dp', 
                              height: '40dp'}).get(),
         txtEmail = UI.Element('textField')
                     .attr({  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                              color: '#336699',
                              top: '10dp', 
                              value: this.ViewData['email'],
                              fontFamily: 'Helvetica',
                              fontStyle: {
                                fontSize: '11dp'
                              },                                                              
                              left: '10dp',
                              width: '300dp', 
                              height: '40dp'}).get();
        
    UI.Element('window')
       .attr({'title': 'hello','backgroundColor': '#eeeeee'})
       .on('click', function(){
            this.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
       })
       .append([txtName, txtEmail]).get().open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
}
module.exports = About;