// Move Selected Layers - Adobe Photoshop Script
// Description: move the selected layers by the defined amount (in pixels)
// Requirements: Adobe Photoshop CS3, or higher
// Version: 0.1.0, 7/Feb/2014
// Author: Trevor Morris (trevor@morris-photographics.com)
// Website: http://morris-photographics.com/
// ============================================================================
// Installation:
// 1. Place script in:
//    PC(32):  C:\Program Files (x86)\Adobe\Adobe Photoshop CS#\Presets\Scripts\
//    PC(64):  C:\Program Files\Adobe\Adobe Photoshop CS# (64 Bit)\Presets\Scripts\
//    Mac:     <hard drive>/Applications/Adobe Photoshop CS#/Presets/Scripts/
// 2. Restart Photoshop
// 3. Choose File > Scripts > Move Selected Layers
// ============================================================================

// enable double-clicking from Mac Finder or Windows Explorer
#target photoshop

// bring application forward for double-click events
app.bringToFront();

///////////////////////////////////////////////////////////////////////////////
// main - show move dialog; move layers
///////////////////////////////////////////////////////////////////////////////
function main() {
	layoutDialog().show();
}

///////////////////////////////////////////////////////////////////////////////
// layoutDialog - get placeholder dimensions, position, and name
///////////////////////////////////////////////////////////////////////////////
function layoutDialog() {

	// declare local variables
	var x = 0, y = 0;
	var dx = 0, dy = 0;
	var previewChanges = true;

	// dialog properties
	var dlg = new Window('dialog', 'Move Layers');
	dlg.orientation = 'column';
	dlg.alignChildren = 'fill';

	// position panel
	dlg.pos = dlg.add('panel');
	dlg.pos.orientation = 'column';
	dlg.pos.alignChildren = 'left';
	dlg.pos.margins = 15;

		// x group
		dlg.pos.x = dlg.pos.add('group');
		dlg.pos.x.orientation = 'row';

			// x label
			dlg.pos.x.xLabel = dlg.pos.x.add('statictext');
			dlg.pos.x.xLabel.text = '&X:';

			// x field
			dlg.pos.x.xPos = dlg.pos.x.add('edittext');
			dlg.pos.x.xPos.characters = 7;
			dlg.pos.x.xPos.text = '0';
			dlg.pos.x.xPos.active = true;
			dlg.pos.x.xPos.onChange = function() {

				// check value
				x = checkValue(this.text);
				this.text = x;

				// preview changes
				if (previewChanges) {
					moveLayers([x - dx, y - dy]);
					dx = x;
					app.refresh();
				}
			};

			// units
			dlg.pos.x.units = dlg.pos.x.add('statictext');
			dlg.pos.x.units.text = 'px';

		// y group
		dlg.pos.y = dlg.pos.add('group');
		dlg.pos.y.orientation = 'row';
		dlg.pos.y.margins.bottom = 10;

			// y label
			dlg.pos.y.yLabel = dlg.pos.y.add('statictext');
			dlg.pos.y.yLabel.text = '&Y:';

			// y field
			dlg.pos.y.yPos = dlg.pos.y.add('edittext');
			dlg.pos.y.yPos.characters = 7;
			dlg.pos.y.yPos.text = '0';
			dlg.pos.y.yPos.onChange = function() {

				// check value
				y = checkValue(this.text);
				this.text = y;

				// preview changes
				if (previewChanges) {
					moveLayers([x - dx, y - dy]);
					dy = y;
					app.refresh();
				}
			};

			// units
			dlg.pos.y.units = dlg.pos.y.add('statictext');
			dlg.pos.y.units.text = 'px';

	// preview checkbox
	dlg.pos.preview = dlg.pos.add('checkbox');
	dlg.pos.preview.text = '&Preview changes';
	dlg.pos.preview.helpTip = 'Preview changes in real-time';
	dlg.pos.preview.value = previewChanges;
	dlg.pos.preview.onClick = function() {

		// toggle preview changes
		previewChanges = !previewChanges;

		// preview changes
		if (previewChanges) {
			moveLayers([x - dx, y - dy]);
			dx = x;
			dy = y;
			app.refresh();
		}
	};

	// buttons
	dlg.btns = dlg.add('group');
	dlg.btns.orientation = 'row';

		// cancel button
		dlg.btns.cancel = dlg.btns.add('button');
		dlg.btns.cancel.text = 'Cancel';
		dlg.btns.cancel.onClick = function() {
			if (dx || dy) {
				moveLayers([-dx, -dy]);
			}
			dlg.close(2);
		};

		// ok button
		dlg.btns.ok = dlg.btns.add('button');
		dlg.btns.ok.text = 'OK';
		dlg.btns.ok.onClick = function() {
			if (x - dx || y - dy) {
				moveLayers([x - dx, y - dy]);
			}
			dlg.close(1);
		};

	// alignment and layout
	var labelWidth = dlg.pos.x.xLabel.preferredSize.width;
	dlg.pos.y.yLabel.preferredSize.width = labelWidth;

	// dialog properties
	dlg.defaultElement = dlg.btns.ok;
	dlg.cancelElement = dlg.btns.cancel;

	// check for valid integer value
	function checkValue(value) {
		var value = parseInt(value, 10);
		return value ? value : 0;
	}

	return dlg;
}

///////////////////////////////////////////////////////////////////////////////
// moveLayers - move selected layers
///////////////////////////////////////////////////////////////////////////////
function moveLayers(coords) {
	var desc1 = new ActionDescriptor();
	var ref1 = new ActionReference();
	ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
	desc1.putReference(cTID('null'), ref1);
	var desc2 = new ActionDescriptor();
	desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), coords[0]);
	desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), coords[1]);
	desc1.putObject(cTID('T   '), cTID('Ofst'), desc2);
	executeAction(cTID('move'), desc1, DialogModes.NO);
}

function cTID(s) {return app.charIDToTypeID(s);}
function sTID(s) {return app.stringIDToTypeID(s);}


///////////////////////////////////////////////////////////////////////////////
// isCorrectVersion - check for Adobe Photoshop CS3 (v10) or higher
///////////////////////////////////////////////////////////////////////////////
function isCorrectVersion() {
	if (parseInt(version, 10) >= 10) {
		return true;
	}
	else {
		alert('This script requires Adobe Photoshop CS3 or higher.', 'Wrong Version', false);
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////
// isOpenDocs - ensure at least one document is open
///////////////////////////////////////////////////////////////////////////////
function isOpenDocs() {
	if (documents.length) {
		return true;
	}
	else {
		alert('There are no documents open.', 'No Documents Open', false);
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////
// showError - display error message if something goes wrong
///////////////////////////////////////////////////////////////////////////////
function showError(err) {
	if (confirm('An unknown error has occurred.\n' +
		'Would you like to see more information?', true, 'Unknown Error')) {
			alert(err + ': on line ' + err.line, 'Script Error', true);
	}
}


// test initial conditions prior to running main function
if (isCorrectVersion() && isOpenDocs()) {
	// remember unit settings; switch to inches
	var originalRulerUnits = preferences.rulerUnits;
	preferences.rulerUnits = Units.PIXELS;

	try {
		// suspend history
		activeDocument.suspendHistory('Move', 'main()');
	}
	catch(e) {
		// don't report error on user cancel
		if (e.number != 8007) {
			showError(e);
		}
	}

	// restore original unit setting
	preferences.rulerUnits = originalRulerUnits;
}
