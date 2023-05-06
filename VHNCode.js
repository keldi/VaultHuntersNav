var c_sGridPrefix = "RoomGrid";
var c_sGridFrame = "divMapGrid";



function funBuildGrid(viRMin, viRMax, viCMin, viCMax) {
	var iCurCMin = ;
	var iCurCMax = ;
	var iCurRMin = ;
	var iCurRMax = ;
}

function GridData() {
  this.iCMin = 0;
  this.iCMax = 0;
  this.iRMin = 0;
  this.iRMax = 0;
  this.aoRows = [];

  //Initialize grid data.
  this.initialize = function (viRMin, viRMax, viCMin, viCMax) {
  	this.iCMin = viCMin;
	this.iCMax = viCMax;
	this.iRMin = viRMin;
  	this.iRMax = viRMax;
  	var oFrame = gel(c_sGridFrame);
  	/* If re-initializing, nuke - not doing this yet. */
  	var oCurR, oCurC, sCurR, sCurC, oPar;
  	oCurR = this.makeRow(0);
  	oFrame.appendChild(oCurR);
  	oCurC = this.makeCol(0, 0);
  	oCurR.appendChild(oCurC);


  	/*var oCurR, oCurC, sCurR, sCurC, oPar;
  	for (var iRow = viRMin, iRow <= viRMax, iRow++) {
		sCurR = c_sGridPrefix + "_" + this.fCR(iRow);
		oCurR = gel(sCurR);
		if (!oCurR) {
			oPar = gel(this.fCR(iRow-1));
			oCurR =
		}
		for (var iCol = viCMin, iRow <= viCMax, iRow++) {
	}*/
  };

  //Adjust current grid based on new size.
  this.setGrid = function (viRMin, viRMax, viCMin, viCMax) {
	//todo
  };

  this.convCoord = function (viR, viC) {
	  /* This exists in case I need to nest bootstrap bullshit. */
	  return [this.fCR(viR), this.fCC(viC)];
  };

  this.fCR = function (viR) {
	  return ("R" + String(viR));
  };

  this.fCC = function (viC) {
  	  return ("C" + String(viC));
  };

  this.makeRow = function (viR) {
	  var oTmp = document.createElement("div");
	  oTmp.className = "row";
	  oTmp.id = c_sGridPrefix + "_" + this.fCR(viR);
	  return oTmp;
  };

  this.makeCol = function (viR, viC) {
	  var oTmp = document.createElement("div");
	  oTmp.className = "col";
	  oTmp.id = c_sGridPrefix + "_" + this.fCR(viR) + "_" + this.fCC(viC);
	  oTmp.appendChild(document.createTextNode(this.fCR(viR) + "_" + this.fCC(viC)));
	  return oTmp;
  };
}

function gel(vsEl) {
	return document.getElementById(vsEl);
}