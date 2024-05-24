



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.99105975359268, lng: 20.96118033100552},
        zoom: 16,
        mapId: '789a94bf5dcebe8b',
        disableDefaultUI: true,
    });


    // "./Map_pin.svg",
    // lat:41.99105975359268, lng:20.96118033100552
    // 41.99507527816197, 20.95979890075865
    // 41.990452, 20.959771







   // addMarker(41.99105975359268,20.96118033100552, "Test", "./Map_pin.svg")
   // addMarker(41.99507527816197,20.95979890075865, "Test2", "./Map_pin.svg")
   // addMarker(41.990452,20.959771, "Title", "./Map_pin.svg")
}

function addMarker(lat,lng,title,url) {
    new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map,
        title: title,
        icon: {
            url: url,
            scaledSize: new google.maps.Size(40, 40)
        }
    })
}


function openMark(){
    let o = document.getElementById('mark-spot-form')
    let p = document.getElementById('mark-spot')

    if(o.style.display === 'flex'){
        o.style.display = 'none'
        p.style.visibility = 'visible'
    }
    else{
        o.style.display = 'flex'
        p.style.visibility = 'hidden'
    }

}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords.latitude, position.coords.longitude)
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                console.log(userLat, userLng)
                addMarker(userLat, userLng, "Your Location", "./Map_pin.svg");
                map.setCenter({lat: userLat, lng: userLng});
            },
            (error) => {
                console.error("Error getting user location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}
getUserLocation()
initMap()