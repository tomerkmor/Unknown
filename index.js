function resetCamera(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap);
    }else{

    }
}


resetCamera();
//###################################################

function haversine_distance(mk1, mk2) {
    var R = 6371.0710; // the Radius in k"m
    // 3958.8 -Radius of the Earth in miles
    var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
}



function initMap(position) {
    
    // The location of myLocation
    //lat: 32.0309563, lng: 34.8670006
    //lat: position.coords.latitude, lng: position.coords.longitude
    //alert("lat:" + position.coords.latitude +"\nlng: " + position.coords.longitude)
    var nothing;
    const myLocation = { lat: position.coords.latitude, lng: position.coords.longitude};
    // The map, centered at myLocation
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: myLocation,
    });


// creating the "center" of the map
    // The marker, positioned at myLocation
    const mainMarker = new google.maps.Marker({
        position: myLocation,
        map: map
    });

    var infoWindow = new google.maps.InfoWindow({
        content: "Your location"
    });

    mainMarker.addListener("click", () => {
        infoWindow.open(map,mainMarker);
    });

// -----------------------------------------------


    // create a new marked point on the map.
    function addMarker(props){
        // create a new point
        var maker = new google.maps.Marker({
            position: props.coords,
            map:map,
            icon: props.iconImage,
        });
        
        //the window tab
        var infoWindow = new google.maps.InfoWindow({
            content: props.txt
        });

        // window click function
        maker.addListener("click", () => {
            infoWindow.open(map,maker);
        });

        return maker;
    }

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // get this info from the dataBase
    const hisLocation = {lat: 32.0409563, lng: 34.8970006}
    const hisName = '<h2>Stefan<h2>'

    //frozen's house address
    const herLocation = {lat: 32.0309563, lng: 34.8670006}
    const herName = '<h2>Yulia<h2>'


    //convert his name into html & css
    var div1 = document.createElement("div");
    div1.innerHTML = hisName;

    var div2 = document.createElement("div");
    div2.innerHTML = herName;


    var maker = addMarker({
        coords: hisLocation,
        iconImage: 'http://labs.google.com/ridefinder/images/mm_20_green.png',
        txt: hisName
    })

    var maker2 = addMarker({
        coords: herLocation,
        iconImage: 'http://labs.google.com/ridefinder/images/mm_20_green.png',
        txt: herName
    })

    // draw the lines on the map -- visual effect
    var line = new google.maps.Polyline({path: [hisLocation, herLocation], map: map});
    var line2 = new google.maps.Polyline({path: [myLocation, herLocation], map: map});

    console.log("alert...");
    console.log("inside of the function: " + maker);
    console.log("inside of the function: " + maker2);

    // Calculate and display the distance between markers
    var distance = haversine_distance(mainMarker,maker2);
    alert("alert...2222");
    document.getElementById('msg').innerHTML = "Distance between you and frozen's home is: " + distance.toFixed(3) + " k\"m.";
/*
    iconList = {
        'beach-flag' : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        'small-red-point' : 'http://labs.google.com/ridefinder/images/mm_20_red.png',
        'small-purple-point' : 'http://labs.google.com/ridefinder/images/mm_20_purple.png',
        'small-green-point' : 'http://labs.google.com/ridefinder/images/mm_20_green.png',
        'small-blue-point' : 'http://labs.google.com/ridefinder/images/mm_20_blue.png',
        'small-yellow-point' : 'http://labs.google.com/ridefinder/images/mm_20_yellow.png'

    }
*/
}
