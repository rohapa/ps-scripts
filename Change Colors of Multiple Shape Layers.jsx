
var newColor = prompt("color(r,g,b - e.g. 255,255,255 or Hex - e.g. FFFFFF)", "255,255,255");

var r = 0, g = 0, b = 0;
if (newColor.indexOf(",") > 0) {
	var list = newColor.split(",");
	r = parseFloat(list[0]);
	g = parseFloat(list[1]);
	b = parseFloat(list[2]);
} else {
	r = parseInt(newColor.substr(0, 2), 16);
	g = parseInt(newColor.substr(2, 2), 16);
	b = parseInt(newColor.substr(4, 2), 16);
}


var layers = getSelectedLayers();
for (var i = 0; i < layers.length; i ++){
	app.activeDocument.activeLayer = layers[i];
	changeColor(r,g,b);
}


//get the list of multiple selected layers
//http://www.nekomataya.info/nekojyarashi/wiki.cgi?photoshop%CA%A3%BF%F4%A5%BB%A5%EC%A5%AF%A5%C8

function getSelectedLayers(){ 
	var idGrp = stringIDToTypeID( "groupLayersEvent" );
	var descGrp = new ActionDescriptor();
	var refGrp = new ActionReference();
	refGrp.putEnumerated(charIDToTypeID( "Lyr " ),charIDToTypeID( "Ordn" ),charIDToTypeID( "Trgt" ));
	descGrp.putReference(charIDToTypeID( "null" ), refGrp );
	executeAction( idGrp, descGrp, DialogModes.ALL );
	var resultLayers=new Array();
	for (var ix=0;ix<app.activeDocument.activeLayer.layers.length;ix++){resultLayers.push(app.activeDocument.activeLayer.layers[ix])}
	var id8 = charIDToTypeID( "slct" );
    var desc5 = new ActionDescriptor();
    var id9 = charIDToTypeID( "null" );
    var ref2 = new ActionReference();
    var id10 = charIDToTypeID( "HstS" );
    var id11 = charIDToTypeID( "Ordn" );
    var id12 = charIDToTypeID( "Prvs" );  
    ref2.putEnumerated( id10, id11, id12 );
	desc5.putReference( id9, ref2 );
	executeAction( id8, desc5, DialogModes.NO );
	return resultLayers;
}

function changeColor(r,g,b) {


var idsetd = charIDToTypeID( "setd" );
    var desc7 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref5 = new ActionReference();
        var idcontentLayer = stringIDToTypeID( "contentLayer" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref5.putEnumerated( idcontentLayer, idOrdn, idTrgt );
    desc7.putReference( idnull, ref5 );
    var idT = charIDToTypeID( "T   " );
        var desc8 = new ActionDescriptor();
        var idClr = charIDToTypeID( "Clr " );
            var desc9 = new ActionDescriptor();
            var idRd = charIDToTypeID( "Rd  " );
            desc9.putDouble( idRd, r );
            var idGrn = charIDToTypeID( "Grn " );
            desc9.putDouble( idGrn, g );
            var idBl = charIDToTypeID( "Bl  " );
            desc9.putDouble( idBl, b );
        var idRGBC = charIDToTypeID( "RGBC" );
        desc8.putObject( idClr, idRGBC, desc9 );
    var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
    desc7.putObject( idT, idsolidColorLayer, desc8 );
executeAction( idsetd, desc7, DialogModes.NO );

}