/*
document.addEventListener("DOMContentLoaded", function(event) { 
  alert ('New File hello');
  /*
  var col1 = ["Full time student checking (Age 22 and under) ", "Customers over age 65", "Below  $500.00" ];
  var col2 = ["None", "None", "$8.00"];
  var TheInnerHTML ="";
  for (var j = 0; j < col1.length; j++) {
    TheInnerHTML += "<tr><td>"+col1[j]+"</td><td>"+col2[j]+"</td></tr>";
  }
 document.getElementById("TheBody").innerHTML = TheInnerHTML;});

});
*/
alert ('New file alert');
function hi(){
  alert ('New File Function : hi');
  return false;
}
/*
function GetGeolocation() {

    navigator.geolocation.getCurrentPosition(GetCoords, GetError);
    
    }
    
    function GetCoords(position){
    
      alert(position.coords.latitude);
    
      alert(position.coords.longitude);
    
      alert(position.coords.accuracy);
    
     var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          map.setZoom(11);
          marker = new google.maps.Marker({
              position: latlng,
              map: map
          });
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }
  */ 