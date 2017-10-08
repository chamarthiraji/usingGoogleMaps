var displayCoords,myAddress;

//used with the google apis
var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var marker;

//called when page is loaded
function init(){
	displayCoords = document.getElementById("msg");
	myAddress = document.getElementById("address");
	geocoder = new google.maps.Geocoder();
	//to show something even before a user clicked on the button

	var latlng = new google.maps.LatLng(34.0144, -6.83);

	var mapOptions = {
		zoom: 8,
		center: latlng,
		mapTypeId: 'roadmap'
	}
	map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
}

//called when button is clicked
		function getLocation(){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(showPosition);
			}
			else{
				displayCoords.innerHTML="Geolocation API not supported by your browser";
			}
			
		}


//called when position is available

function showPosition(position){
	console.log("position :",position);
	displayCoords.innerHTML = "Latitude : "+
		position.coords.latitude +
		"<br />Longitude: " +
		position.coords.longitude;

		//display the map
		showOnGoogleMap(new google.maps.LatLng(position.coords.latitude,
			 position.coords.longitude));


}

function showOnGoogleMap(latlng) {
	geocoder.geocode({
		'latLng':latlng
	},reverseGeocoderSuccess);


	function reverseGeocoderSuccess(results, status)
	{
		if(status == google.maps.GeocoderStatus.OK){

				console.log("results",results);
				if (results[1]){
					map.setZoom(11);
					marker = new google.maps.Marker({
						position: latlng,
						map: map
					});
				
					infowindow.setContent(results[1].
						formatted_address);
					infowindow.open(map,marker);
					//Display address as text in the page
					myAddress.innerHTML = "Adress: "+results[0].formatted_address;

				}//end of if
				else {
					alert("no results found");
				}
			}	
		else {
			alert("geocoder failed due to: "+status);
		}

	}//end of reverseGeocoderSuccess
}//end of showOnGoogleMap
