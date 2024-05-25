let userLng, userLat;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
            initMap(); // Call initMap after obtaining the user's location
        },
        (error) => {
            console.error("Error getting user location:", error);
            initMap(); // Call initMap even if there's an error
        }
    );
} else {
    console.error("Geolocation is not supported by this browser.");
}

let listOfLocations = [
   /* {
        id: "2",
        lat: 42.0,
        lng: 21.0
    },
    {
        id: "3",
        lat: 43.0,
        lng: 21.2
    },
    {
        id: "4",
        lat: 42,
        lng: 21.21
    },{
        id: "5",
        lat:41.99105975359268,
        lng:20.96118033100552
    },
    {
        id: "6",
        lat:41.99507527816197,
        lng:20.95979890075865
    },
    {
        id: "7",
        lat:41.990452,
        lng:20.959771
    }*/
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: userLat, lng: userLng },
        zoom: 16,
        mapId: '74a81578cd95caa6',
        disableDefaultUI: true,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false

    });

    listOfLocations.forEach(location => {
        addMarker(location.lat, location.lng, `Location ${location.id}`, "./Map_pin.svg", location.fullName);
    });
}

function addMarker(lat, lng, title, url, fullName) {
    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: title,
        icon: {
            url: url,
            scaledSize: new google.maps.Size(40, 40)
        }
    });

    const infoWindowContent = `
        <div style='color: #000000; height: 60vh; width: 70vw;'>
            <h1 style='color: #000000; margin: 0'>${title}</h1>
            <p style="color: #000000">Name: ${fullName}</p>
            <p style="color: #000000">Latitude: ${lat}</p>
            <p style="color: #000000">Longitude: ${lng}</p>
            <button style="color: black; background-color:#ffffff; padding: 20px; text-align: center ">Clean Spot</button>
        </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

function openMark() {
    let o = document.getElementById('mark-spot-form');
    let p = document.getElementById('mark-spot');

    if (o.style.display === 'flex') {
        o.style.display = 'none';
        p.style.visibility = 'visible';
    } else {
        o.style.display = 'flex';
        p.style.visibility = 'hidden';
    }
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                addMarker(userLat, userLng, "Your Location", "./Map_pin.svg");
                map.setCenter({ lat: userLat, lng: userLng });
                initMap(); // Call initMap after obtaining the user's location
            },
            (error) => {
                console.error("Error getting user location:", error);
                initMap(); // Call initMap even if there's an error
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

const apiUrl = 'https://backend-eco-green.vercel.app/';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        listOfLocations = data;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

async function markIt() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            addMarker(userLat, userLng, "title", "a");
            initMap(); // Call initMap after adding the marker
        },
        (error) => {
            console.error("Error getting user location:", error);
            initMap(); // Call initMap even if there's an error
        }
    );
}

getUserLocation();
