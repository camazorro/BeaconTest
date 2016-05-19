var TiBeacons = require('org.beuckman.tibeacons');

function enterRegion(e) {
	addData(e);
}
function exitRegion(e) {
	addData(e);
}
function updateRanges(e) {
	addData(e);
}
function handleProximity(e) {
	addData(e);
}

function addListeners() {

	TiBeacons.addEventListener("enteredRegion", enterRegion);
	TiBeacons.addEventListener("exitedRegion", exitRegion);

	TiBeacons.addEventListener("beaconRanges", updateRanges);
	TiBeacons.addEventListener("beaconProximity", handleProximity);
	
}

function removeListeners() {
	
	TiBeacons.removeEventListener("enteredRegion", enterRegion);
	TiBeacons.removeEventListener("exitedRegion", exitRegion);

	TiBeacons.removeEventListener("beaconRanges", updateRanges);
	TiBeacons.removeEventListener("beaconProximity", handleProximity);
}

function pauseApp() {
	TiBeacons.stopMonitoringAllRegions();
	TiBeacons.stopRangingForAllBeacons();

	removeListeners();
};

function appResumed(e) {
	addListeners();
}





function stopMonitor(e) {
	TiBeacons.stopMonitoringAllRegions();
}

function startMonitor(e){
	Titanium.Geolocation.purpose="In order for this application to work, you must authorize the use of localization service.";
	Titanium.Geolocation.getCurrentPosition(function(e){
		if(e.error){
			
		}
		else{
			TiBeacons.startMonitoringForRegion({
			    uuid : "C48C6716-193F-477B-B73A-C550CE582A22",
			    identifier : "com.bkon.detect"
			});
		}
	});

}

var preprocessForListView = function(rawData) {
	return {
		template: 'default',//(rawData.type != 'exitedRegion' || rawData.type != 'enteredRegion') ? 'default' :rawData.type,
		time : {text: 'Date.now()'},
		event: {text: ''},
		uuid: {text: ''}
	};
};

function addData(e){
	if(e){
		alert(e);
		//var dataToAdd = preprocessForListView(e);
		//Ti.API.info(dataToAdd);
		//$.listView.sections[0].appendItems(dataToAdd);
	}
}



Ti.App.addEventListener("pause", pauseApp);
Ti.App.addEventListener("resumed", appResumed);
addListeners();
$.index.open();
