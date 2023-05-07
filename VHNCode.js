var c_sGridPrefix = "RoomGrid";
var c_sGridFrame = "divMapGrid";

var oGridData;

function funStartIt() {
	gel("divOutput").innerHTML = ("startit");
	oGridData = new GridData();
	oGridData.initialize(-5, 5, -5, 5);
	oGridData.addCell(0, 6);
	oGridData.addCell(-2, -6);
	oGridData.addCell(0, -10);
	oGridData.addCell(0, -9);
	oGridData.addCell(1, -9);
	oGridData.addCell(1, -8);
	oGridData.addCell(1, -7);
	oGridData.addCell(1, -6);
}


function funAddCell() {
	gel("divOutput").innerHTML = ("funAddCell");
	oGridData.addCell(parseInt(gel("txtAddRow").value), parseInt(gel("txtAddCol").value));
}

function GridData() {
	this.iCMin = 0;
	this.iCMax = 0;
	this.iRMin = 0;
	this.iRMax = 0;
	this.iCTot = 0;
	this.iRTot = 0;
	this.iZero = 25;
	this.aoRows = [];
	this.c_sMapPrefix = "mapGrid";
	this.c_asMapClasses = ["mapGrid", "flex-nowrap"];
	this.c_asContainerClasses = ["mapGridContainer"];
	this.c_asRowClasses = ["mapGridRow"];
	this.c_asColClasses = ["mapGridCol"];
	this.c_asNodeClasses = ["mapGridNode"];
	this.bootstrap = false;

	//Initialize grid data.
	this.initialize = function (viRMin, viRMax, viCMin, viCMax) {
		gel("divOutput").innerHTML = ("initialize");
		if (gel("txtGroup").value == "true") {this.bootstrap = true;}
		if (gel("txtGroup").value == "false") {this.bootstrap = false;}
		this.iCMin = viCMin;
		this.iCMax = viCMax;
		this.iRMin = viRMin;
		this.iRMax = viRMax;
		this.iCTot = viCMax - viCMin;
		this.iRTot = viRMax - viRMin;
		/* If re-initializing, nuke - not doing this yet. */
		this.resetBase();
		var oFrame = gel(c_sGridFrame);


		var oCurR, oCurC, sCurR, sCurC, oPar;
		//oCurR = this.makeRow(0);
		//oFrame.appendChild(oCurR);
		//oCurC = this.makeCol(0, 0);
		//oFrame.appendChild(oCurC);
		
		this.setGrid(viRMin, viRMax, viCMin, viCMax);
	};

	//Adjust current grid based on new size.
	this.setGrid = function (viRMin, viRMax, viCMin, viCMax) {
		var oCurR, oCurC, sCurR, sCurC, oPar, oTemp;
		var oFrame = gel(c_sGridFrame);
		for (var iRow = viRMin; iRow <= viRMax; iRow++) {
			console.log("Row build: " + iRow);
			/*sCurR = this.gNR(iRow);
			oCurR = gel(sCurR);
			if (!oCurR) {
				oCurR = this.makeRow(iRow);
				oTemp = gel(this.gNR(iRow + 1));
				if (oTemp) { oTemp.parentNode.insertBefore(oCurR, oTemp); }
				else {
					oTemp = gel(this.gNR(iRow - 1));
					if (oTemp) { oTemp.parentNode.insertBefore(oCurR, oTemp.nextSibling); }
				}
			}*/
			//Row setup finished.
			for (var iCol = viCMin; iCol <= viCMax; iCol++) {
				console.log("Col build: " + iRow + ", " + iCol);
				sCurC = this.gNC(iRow, iCol);
				oCurC = gel(sCurC);
				if (!oCurC) {
					oCurC = this.makeCol(iRow, iCol);
					oFrame.appendChild(oCurC);
				}
			}
		}
	};

	this.convCoord = function (viR, viC) {
		/* This exists in case I need to nest bootstrap bullshit. */
		return [this.fCR(viR), this.fCC(viC)];
	};

	this.gNR = function (viR) {
		return this.gGP() + "_" + this.fCR(viR);
	};

	this.gNC = function (viR, viC) {
		return this.gNR(viR) + "_" + this.fCC(viC);
	};

	this.gNN = function (viR, viC) {
		return this.gNC(viR, viC) + "_Node";
	};

	this.gGP = function () {
		return c_sGridPrefix;
	};

	this.fCR = function (viR) {
		return ("R" + String(viR));
	};

	this.fCC = function (viC) {
		return ("C" + String(viC));
	};

	this.makeRow = function (viR) {
		/*var oTmp = document.createElement("div");
		if (this.bootstrap == true) {oTmp.classList.add("row");}
		oTmp.classList.add(...this.c_asRowClasses);
		oTmp.classList.add(...this.c_asMapClasses);
		oTmp.id = this.gNR(viR);
		return oTmp;*/
	};

	this.addCell = function (viR, viC) {
		gel("divOutput").innerHTML = ("addCell");
		var oTmp = this.makeCol(viR, viC);
		if (oTmp) {
			var oFrame = gel(c_sGridFrame);
			oFrame.appendChild(oTmp);
		}
	}

	this.makeCol = function (viR, viC) {
		if (gel(this.gNC(viR, viC))) {
			console.log("this.makeCol: already exists for [" + viR + "," + viC + "]");
			return false;
		}
		console.log("makeCol:a " + viR + ", " + viC);
		var oTmp = document.createElement("div");
		if (this.bootstrap == true) {oTmp.classList.add("col");}
		oTmp.classList.add(...this.c_asColClasses);
		oTmp.classList.add(...this.c_asMapClasses);
		console.log("makeCol:b " + viR + ", " + viC);
		oTmp.style.gridColumn = viC + this.iZero;
		oTmp.style.gridRow = viR + this.iZero;
		//oTmp.style.gridArea = viR + " " + viC + " auto auto";
		oTmp.id = this.gNC(viR, viC);
		console.log("makeCol:c " + viR + ", " + viC + " [" + oTmp + "] classList[" + oTmp.classList + "]");
		oTmp.appendChild(this.makeNode(viR, viC));
		console.log("makeCol:d " + viR + ", " + viC + " [" + oTmp + "] classList[" + oTmp.classList + "]");
		return oTmp;
	};

	this.makeNode = function (viR, viC) {
		var oTmp = document.createElement("div");
		oTmp.classList.add(String(this.c_sMapPrefix) + "Node");
		oTmp.classList.add(...this.c_asNodeClasses);
		oTmp.classList.add(...this.c_asMapClasses);
		oTmp.style.border = "1px solid black";
		oTmp.gridRowNum = parseInt(viR);
		oTmp.gridColNum = parseInt(viC);
		//oTmp.style.height = "50px";
		//oTmp.style.width = "50px";
		oTmp.id = this.gNN(viR, viC);
		oTmp.onclick = this.passthroughClick.bind(this);//Bind lets me use object functions
		oTmp.appendChild(document.createTextNode("" + viR + "," + viC));
		return oTmp;
	};

	this.resetBase = function () {
		var oTmp = document.createElement("div");
		if (this.bootstrap == true) {oTmp.classList.add("container");}
		oTmp.classList.add(...this.c_asContainerClasses);
		oTmp.classList.add(...this.c_asMapClasses);
		oTmp.classList.add("text-center");
		
		oTmp.id = "divMapGrid";
		var oBase = gel("divMapBase");
		while (oBase.firstChild) { oBase.removeChild(oBase.firstChild); }
		oBase.appendChild(oTmp);
		return oTmp;
	};

	this.passthroughClick = function (event) {
		//oGridData.printLog("passthroughClick[" + event + "]");
		oGridData.nodeClick(event);
	}

	this.nodeClick = function (event) {
		//this.printLog("nodeClick e.cT[" + event.currentTarget + "]  e.cT.id[" + event.currentTarget.id + "]");
		this.printLog("nodeClick e.gRN[" + event.currentTarget.gridRowNum + "]  e.cT.gCN[" + event.currentTarget.gridColNum + "]");
	};

	this.printLog = function (vsLog) {
		var oD = gel("txtDebug");
		oD.value = oD.value + "\n" + vsLog;
	};
}

function gel(vsEl) {
	return document.getElementById(vsEl);
}