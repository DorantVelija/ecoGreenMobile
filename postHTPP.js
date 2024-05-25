function markIt() {
    const fname = document.getElementById('full-name').value;
    const lname = document.getElementById('location-name').value;
    const url = `https://backend-eco-green.vercel.app/locations/${Math.round((Math.random() * 1000) + 200)}`;
    const data = {
        fullName: fname,
        locationName: lname,
        lat: userLat,
        lng: userLng
    };

    if (fname.trim() !== "" && lname.trim() !== "") {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById('mark-spot-form').style.display = "none";
                document.getElementById('mark-spot').style.display = 'block';
                document.getElementById('mark-spot').style.visibility = 'visible';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        console.log("Enter your information!!");
    }
}

console.log("LOADED2222");