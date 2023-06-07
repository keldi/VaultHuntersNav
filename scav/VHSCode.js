
var g_aItemData;
var g_sMode = "Setup";
var g_iIndCount = 3;
var g_iIndGoal = 4;
var g_iIndRow = 5;

function gel(vsEl) {
	return document.getElementById(vsEl);
}

function funBindButtons() {
	oTmp.onclick = this.passthroughClick.bind(this);
}

function funCountClickPassthrough(event) {
	funCountClick(event);
};

function funCountClick (event) {
	var sTargetId = "";
	var oCurTarg = event.currentTarget;
	var sTargIdent = oCurTarg.scavIdent;
	var sTargBtn = oCurTarg.scavBtn;
	var iMod = (sTargBtn=="plus"?1:-1);
	var iIndex = oCurTarg.scavRow.scavIndex;
	
	//alert("funCountClick[" + sTargIdent + "][" + sTargBtn + "][" + oCurTarg.scavRow + "][" + oCurTarg.scavRow.scavIndex + "]");
	if (g_sMode == "Active") {
		g_aItemData[iIndex][g_iIndCount] += iMod;
		funUpdateRow(g_aItemData[iIndex][g_iIndRow]);
	}
	else {
		g_aItemData[iIndex][g_iIndGoal] += iMod;
		funUpdateCountDisplay(oCurTarg.scavRow);
	}
}

function funModeButton(event) {
	//var eTarget = event.currentTarget.firstElementChild;
	var eTarget = event.currentTarget;
	if (eTarget.id == "lblModeSetup") {funSetMode("Setup");}
	if (eTarget.id == "lblModeActive") {funSetMode("Active");}
	if (eTarget.id == "lblModeReset") {funSetMode("Reset");}
}

function funSetMode(vsMode) {
	//divPrepZone, divActiveZone, divCompletedZone
	//alert(event);
	g_sMode = vsMode;
	if (vsMode == "Reset") {
		for (var iCtr = 0; iCtr < g_aItemData.length; iCtr++) {
			g_aItemData[iCtr][g_iIndCount] = 0;
			g_aItemData[iCtr][g_iIndGoal] = 0;
			funUpdateCountDisplay(g_aItemData[iCtr][g_iIndRow]);
		}
		funStageAllRows("Prep");
		setTimeout("funResetToSetup()", 10);
		gel("lblModeSetup").click();
	}
	else if (vsMode == "Active") {
		for (var iCtr = 0; iCtr < g_aItemData.length; iCtr++) {
			funUpdateRow(g_aItemData[iCtr][g_iIndRow]);
		}
	}
	else if (vsMode == "Setup") {
		funStageAllRows("Prep");
	}
}

function funResetToSetup() {
	gel("btnModeSetup").checked = true;
}

function funUpdateRow(veRow) {
	if (g_aItemData[veRow.scavIndex][g_iIndGoal] == 0)
	{funStageRow("Hidden", veRow);}
	else if (g_aItemData[veRow.scavIndex][g_iIndCount] < g_aItemData[veRow.scavIndex][g_iIndGoal]) 
	{funStageRow("Active", veRow);}
	else if (g_aItemData[veRow.scavIndex][g_iIndCount] >= g_aItemData[veRow.scavIndex][g_iIndGoal]) 
	{funStageRow("Completed", veRow);}
	funUpdateCountDisplay(veRow);
	return;
}

function funStageAllRows(vsZone) {
	for (var iCtr = 0; iCtr < g_aItemData.length; iCtr++) {
		funStageRow(vsZone, g_aItemData[iCtr][g_iIndRow]);
	}
}

function funStageRow(vsZone, veRow) {
	var sEZone = "div" + vsZone + "Zone";
	if (veRow.parentNode.id == sEZone) {return;}
	veRow.parentNode.removeChild(veRow);
	gel(sEZone).appendChild(veRow);
}

function funUpdateCountDisplay(veRow) {
	var eMod = gel("txtCount_" + veRow.scavIdent);
	eMod.value = g_aItemData[veRow.scavIndex][g_iIndCount] + " / " + g_aItemData[veRow.scavIndex][g_iIndGoal];
}

function funInitializeRows() {
	g_aItemData = [];

	//Yeah it's ugly, but it's fast and easy and lets me adjust down the road if they change things up.
	g_aItemData.push(["W", "R1", "Ripped Page", 0, 0]);
	g_aItemData.push(["W", "R2", "Zombie Hide", 0, 0]);
	g_aItemData.push(["W", "R3", "Pottery Shard", 0, 0]);
	g_aItemData.push(["W", "R4", "Spider Webbing Spool", 0, 0]);

	g_aItemData.push(["L", "R1", "Drowned Hide", 0, 0]);
	g_aItemData.push(["L", "R2", "Skeleton Bone Shard", 0, 0]);
	g_aItemData.push(["L", "R3", "Zombie Brain", 0, 0]);
	g_aItemData.push(["L", "R4", "Creeper Eye", 0, 0]);

	g_aItemData.push(["O", "R1", "Empty Jar", 0, 0]);
	g_aItemData.push(["O", "R2", "Sack", 0, 0]);
	g_aItemData.push(["O", "R3", "Saddle Bag", 0, 0]);
	g_aItemData.push(["O", "R4", "Wizard Wand", 0, 0]);

	g_aItemData.push(["G", "R1", "Red Scroll", 0, 0]);
	g_aItemData.push(["G", "R2", "Spider Soul Charm", 0, 0]);
	g_aItemData.push(["G", "R3", "Goblet", 0, 0]);
	g_aItemData.push(["G", "R4", "Earrings", 0, 0]);

	g_aItemData.push(["C", "R1", "Zombie Blood Vial", 0, 0]);
	g_aItemData.push(["C", "R2", "Cracked Script", 0, 0]);
	g_aItemData.push(["C", "R3", "Green Bangle", 0, 0]);
	g_aItemData.push(["C", "R4", "Cracked Pearl", 0, 0]);

	g_aItemData.push(["M", "R1", "Black Mob Essence", 0, 0]);
	g_aItemData.push(["M", "R2", "Green Mob Essence", 0, 0]);
	g_aItemData.push(["M", "R3", "Purple Mob Essence", 0, 0]);

	var eNewRow;
	var eSource = gel("divRow_X_RX");
	var ePrepZone = gel("divPrepZone");
	for (var iCtr = 0; iCtr < g_aItemData.length; iCtr++) {
		eNewRow = funMakeRow(eSource, g_aItemData[iCtr][0], g_aItemData[iCtr][1], g_aItemData[iCtr][2], iCtr);
		ePrepZone.appendChild(eNewRow);
		g_aItemData[iCtr].push(eNewRow); //Add the element reference to the array.
	}


}

function funMakeRow(veSource, vsChest, vsItem, vsDesc, viPos) {
	var eTemplate = veSource.cloneNode(true);
	eTemplate.scavIdent = vsChest + "_" + vsItem;
	eTemplate.id = "divRow_" + eTemplate.scavIdent;
	//alert(eTemplate.id + "\n" + eTemplate.scavIdent);
	funStructureRow(eTemplate, vsDesc);
	eTemplate.style.gridRow = viPos;
	eTemplate.scavIndex = viPos;
	return eTemplate;
}

function funStructureRow(veRow, vsDesc) {
	var sRowIdent = veRow.scavIdent;
	var sRowChest = sRowIdent.split("_")[0];
	var sRowItem = sRowIdent.split("_")[1];
	var eDesc = veRow.firstElementChild;
	var eCollect = eDesc.nextElementSibling;

	//alert("fSR:\n" + sRowIdent + "\n" + sRowChest + "\n" + sRowItem + "\n" + eDesc + "\n" + eDesc.firstElementChild);

	//Desc stuff first.  Yes, I know the below is lazy as hell.
	eDesc.firstElementChild.src = "icon/Scav_" + sRowChest + "_R0.png";
	eDesc.firstElementChild.nextElementSibling.src = "icon/Scav_" + sRowChest + "_" + sRowItem + ".png";
	eDesc.firstElementChild.nextElementSibling.nextElementSibling.src = "icon/Scav_Color_" + sRowItem + ".png";
	eDesc.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = vsDesc;

	//Associate the onclick bindings!
	var oCur;
	oCur = eCollect.firstElementChild;
	oCur.id = "btnMinus_" + sRowChest + "_" + sRowItem;
	oCur.scavBtn = "minus";
	oCur.scavIdent = sRowIdent;
	oCur.scavRow = veRow;
	oCur.onclick = funCountClickPassthrough.bind(oCur);
	oCur = oCur.nextElementSibling;
	oCur.id = "txtCount_" + sRowChest + "_" + sRowItem;
	oCur = oCur.nextElementSibling;
	oCur.id = "btnPlus_" + sRowChest + "_" + sRowItem;
	oCur.scavBtn = "plus";
	oCur.scavIdent = sRowIdent;
	oCur.scavRow = veRow;
	oCur.onclick = funCountClickPassthrough.bind(oCur);
}
