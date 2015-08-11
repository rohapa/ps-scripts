// Copyright Christy VanderWall - not to be redistributed
app.displayDialogs = DialogModes.NO;

var OriginalRulerUnits = app.preferences.rulerUnits
		app.preferences.rulerUnits = Units.PIXELS

var CreateLayerGroup = true
var dlgwin = new Window('dialog', 'Scatter Things', );

		//Options Panel

		dlgwin.OptionsPnl = dlgwin.add('panel',undefined);
		dlgwin.OptionsPnl.preferredSize.height = 135

		dlgwin.OptionsPnl.orientation = 'column';
		dlgwin.OptionsPnl.alignChildren = 'center';

		dlgwin.Options = dlgwin.OptionsPnl.add("group");
		dlgwin.Options.orientation = 'row';

		dlgwin.OptionsLabels = dlgwin.Options.add("group");
		dlgwin.OptionsLabels.orientation = 'column';

		dlgwin.OptNumber = dlgwin.OptionsLabels.add('statictext',undefined,'Number of Copies:');
		dlgwin.OptSize = dlgwin.OptionsLabels.add('statictext',undefined,'Size Variation:');
		dlgwin.OptAngle = dlgwin.OptionsLabels.add('statictext',undefined, 'Angle Variation:');
		

		dlgwin.OptNumber.alignment = 'right'
		dlgwin.OptSize.alignment = 'right'
		dlgwin.OptAngle.alignment = 'right'
				
		dlgwin.OptNumber.preferredSize.height = 20
		dlgwin.OptSize.preferredSize.height = 20
		dlgwin.OptAngle.preferredSize.height = 20

		dlgwin.OptEdits = dlgwin.Options.add("group");
		dlgwin.OptEdits.orientation = 'column';

		dlgwin.OptNumberEdit= dlgwin.OptEdits.add('edittext',undefined,'10');
		dlgwin.OptSizeEdit = dlgwin.OptEdits.add('edittext',undefined,'50');
		dlgwin.OptAngleEdit= dlgwin.OptEdits.add('edittext',undefined,'90');
					
		dlgwin.OptNumberEdit.alignment = 'center'
		dlgwin.OptSizeEdit .alignment = 'center'
		dlgwin.OptAngleEdit.alignment = 'center'
		
		dlgwin.OptNumberEdit.preferredSize.width = 55
		dlgwin.OptSizeEdit.preferredSize.width = 55
		dlgwin.OptAngleEdit.preferredSize.width = 55

		dlgwin.OptCmnt= dlgwin.Options.add("group");
		dlgwin.OptCmnt.orientation = 'column';
		dlgwin.OptCmnt.alignment = 'fill';

		dlgwin.OptNumberCmnt = dlgwin.OptCmnt.add('statictext',undefined, 'Between 0 and 100');
		dlgwin.OptSizeCmnt = dlgwin.OptCmnt.add('statictext',undefined, '% - Between 0 and 100');
		dlgwin.OptAngleCmnt = dlgwin.OptCmnt.add('statictext',undefined, 'Degress - between 0 and 360');
		
		dlgwin.OptNumberCmnt.alignment = 'left'
		dlgwin.OptSizeCmnt.alignment = 'left'
		dlgwin.OptAngleCmnt.alignment = 'left'

		dlgwin.OptNumberCmnt.preferredSize.height = 20
		dlgwin.OptSizeCmnt.preferredSize.height = 20
		dlgwin.OptAngleCmnt.preferredSize.height = 20

	
		dlgwin.btns = dlgwin.add('group');
		dlgwin.btns.orientation = 'row';
		dlgwin.btns.alignChildren = 'left';
		dlgwin.btns.bOK = dlgwin.btns.add('button',undefined,'OK');
		dlgwin.btns.bCancel = dlgwin.btns.add('button',undefined,'Cancel');

		dlgwin.btns.bOK.preferredSize.height = 30
		dlgwin.btns.bOK.preferredSize.width = 115

		dlgwin.btns.bCancel.preferredSize.height = 30
		dlgwin.btns.bCancel.preferredSize.width = 115
		
		dlgwin.center()
	

	dlgwin.btns.bOK.onClick = function() {

		var numCopies = dlgwin.OptNumberEdit.text
		var sizeChg = dlgwin.OptSizeEdit.text
		var rotChg = dlgwin.OptAngleEdit.text
				
		var Proceed = true
		var ErrorStr = "Please fix the following values:" + "\r" 
		
		if(numCopies < 0){
			ErrorStr = ErrorStr + "Number of Copies" + "\r" 
			Proceed = false	
		}
		if(numCopies >100){
			ErrorStr = ErrorStr + "Number of Copies" + "\r" 
			Proceed = false	
		}
		
		if(sizeChg < 0){
			ErrorStr =ErrorStr + "Size Variation" + "\r" 
			Proceed = false
		}		
		if( sizeChg >100){
			ErrorStr =ErrorStr + "Size Variation" + "\r" 
			Proceed = false
		}
		
		if(rotChg < 0){
			ErrorStr =ErrorStr + "Angle Variation" + "\r" 
			Proceed = false
		}
		if(rotChg >360){
			ErrorStr =ErrorStr + "Angle Variation" + "\r" 
			Proceed = false
		}
		
		
		if (Proceed == true){
			ScatterThings()
			dlgwin.close()
		}
		else{
			alert(ErrorStr)
		}
	
		//dlgwin.close()
		
		function ScatterThings(){
		
			var CurWidth =activeDocument.width.value
			var CurHeight = activeDocument.height.value
			
			var CurrentDoc= app.documents[app.activeDocument.name];
			CurrentDoc.activeLayer = CurrentDoc.layers[CurrentDoc.layers.length-1];
			
			var selectedLayers = new Array;
						
			for( var i = 0; i < CurrentDoc.artLayers.length; i++) {
			   selectedLayers.push(CurrentDoc.artLayers[i]);
			}
				
			for(var j = 1; j <= numCopies; j++){
		
				for(var i = selectedLayers.length-1; i >=0; i--){
					
					var copyLayer = selectedLayers[i].duplicate()
					copyLayer.name = "Item " +(i+1) + " Copy " + (j)
					
					var randomSize = Math.round(Math.random()*sizeChg*2) + (100 - sizeChg)
					copyLayer.resize(randomSize, randomSize)
					
					var randomRot = Math.round(Math.random()*rotChg*2)+(360 - rotChg)
					copyLayer.rotate(randomRot)
					
					var randomX = Math.random()
					var randomY = Math.random()

					var currentBounds = copyLayer.bounds;
					
					var newX = CurWidth * randomX
					var newY = CurHeight * randomY

					var offsetX = new UnitValue( newX-currentBounds[0].as('px'), 'px');
					var offsetY = new UnitValue( newY-currentBounds[1].as('px'), 'px');
						
					copyLayer.translate ( offsetX, offsetY );
				
					copyLayer.move(activeDocument, ElementPlacement.PLACEATBEGINNING);
					
				}
			}
			
			if (numCopies > 0){
				copyLayer.name = "CVW_ScatterThings"
			}
		
			if (numCopies == 0){
				for(var i = selectedLayers.length-1; i >=0; i--){
					
					var randomSize = Math.round(Math.random()*sizeChg*2) + (100 - sizeChg)
					selectedLayers[i].resize(randomSize, randomSize)
					
					var randomRot = Math.round(Math.random()*rotChg*2)+(360 - rotChg)
					selectedLayers[i].rotate(randomRot)
				}
				
				selectedLayers[0].name = "CVW_ScatterThings_" + selectedLayers[0].name
			}
			
			else{		
					
					for(var i = selectedLayers.length-1; i >=0; i--){
						selectedLayers[i].move(activeDocument, ElementPlacement.PLACEATEND);
						selectedLayers[i].visible = false;
					}
			}
			
					
		}
			app.bringToFront();	
	
	}

	dlgwin.btns.bCancel.onClick = function() { 
			
			dlgwin.close()
	}
		
	dlgwin.show()	
	
	app.preferences.rulerUnits = OriginalRulerUnits
	

function groupSelectedLayers(){
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putClass( stringIDToTypeID( "layerSection" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
        var ref2 = new ActionReference();
        ref2.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    desc.putReference( charIDToTypeID( "From" ), ref2 );
executeAction(charIDToTypeID( "Mk  " ), desc, DialogModes.NO );
}
