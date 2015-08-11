﻿#target illustratorvar doc = app.activeDocument;var numberOfLayers = doc.layers.length;var tempFiles = [];for(var l=numberOfLayers-1;l>=0;l--){    for(var layerIndex=numberOfLayers-1;layerIndex>=0;layerIndex--){        doc.layers[layerIndex].visible = layerIndex == l;    }    var tempFile = new File(Folder.temp+'/layer'+l+'.ai');    doc.saveAs(tempFile);    placeInPhotoshop(tempFile);    tempFiles.push(tempFile);}for(var f=0;f<tempFiles.length;f++){    tempFiles[f].remove();}function placeInPhotoshop(file){    var bt = new BridgeTalk;    bt.target = "photoshop";    var myScript = ("var ftn = " + psRemote.toSource() + "; ftn('"+decodeURI(file)+"');");    bt.body = myScript;     bt.onResult = function( inBT ) {myReturnValue(inBT.body); }    bt.send(120);            // function to process the return string    function myReturnValue(str){        //process the results. here just assign strings        res = str;    };    function psRemote(file) {        var desc = new ActionDescriptor();            var desc1 = new ActionDescriptor();            desc1.putEnumerated( charIDToTypeID('fsel'), stringIDToTypeID('pdfSelection'), stringIDToTypeID('page') );            desc1.putInteger( charIDToTypeID('PgNm'), 1 );            desc1.putEnumerated( charIDToTypeID('Crop'), stringIDToTypeID('cropTo'), stringIDToTypeID( 'mediaBox' ) );        desc.putObject( charIDToTypeID('As  '), charIDToTypeID('PDFG'), desc1 );        desc.putPath( charIDToTypeID('null'), new File( file ) );        desc.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );        desc.putUnitDouble( charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), 100.000000 );        desc.putUnitDouble( charIDToTypeID('Hght'), charIDToTypeID('#Prc'), 100.000000 );        desc.putBoolean( charIDToTypeID('Lnkd'), true );        desc.putBoolean( charIDToTypeID('AntA'), true );        executeAction( charIDToTypeID('Plc '), desc, DialogModes.NO );    };};