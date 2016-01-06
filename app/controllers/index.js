function doClick(e) {
    alert($.label.text);
}

function startMonitor(e){
	Titanium.Geolocation.purpose="In order for this application to work, you must authorize the use of localization service.";
	Titanium.Geolocation.getCurrentPosition(function(e){
		if(e.error){}
		else{
			var TiBeacons = require('org.beuckman.tibeacons');
			//TiBeacons.enableAutoRanging();
			
			TiBeacons.startMonitoringForRegion({
			    uuid : "C48C6716-193F-477B-B73A-C550CE582A22",
			    identifier : "com.bkon.detect"
			});
			
			
			TiBeacons.addEventListener("enteredRegion", function(e){
				alert(e);
			});
			
			
			TiBeacons.addEventListener("exitedRegion", function(e){
				alert(e);
			});
			
			TiBeacons.addEventListener("beaconRanges", function(event) {
			   alert(event.beacons);
			});
			
			TiBeacons.addEventListener("beaconProximity", function(e){
			   alert("beacon "+e.major+"/"+e.minor+" is now "+e.proximity);
			});
		}
	});

}

function enterRegion(e) {
	alert(e);
}
function exitRegion(e) {
	alert(e);
}
function updateRanges(e) {
	Ti.API.info(e);
}
function handleProximity(e) {
	Ti.API.info(e);
	
	console.log("proximity: " + e.proximity);
}

$.index.open();
