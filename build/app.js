var g_key = 'AIzaSyAw93Nxz_O3Iu3MIXvd0IqJeIx5paRgbB0'; //Google API

var typed = new Typed(".hero__text", {
    strings: ["Where would you like to go?"],
    typeSpeed: 150,
    backSpeed: 190,
    loop: false
})

//Adding map
function initMap(){
    var options = {
        zoom: 8,
        center:{lat: 43.6532, lng: -79.3832}
    }
    var map = new google.maps.Map(document.getElementById('map'), options);
}
//const requestInformation = 
const calculateAndRenderDirections = (origin, destination) => {
    let directionsService = new google.maps.DirectionsService(),
        directionsDisplay = new google.maps.directionsDisplay(),
        request = {
            origin: origin,
            destination: destination,
            travelMode: 'BUS'
        }
        directionsDisplay.setMap(map);
        directionsService.route(request, (result, status)=>{
            if(status == 'OK'){
                directionsDisplay.setDirections(result);
            }
        })
} 