function resetCamera(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap);
    }else{

    }
}


resetCamera();
//###################################################

function initMap(position) {
    
    // The location of myLocation
    //lat: 32.0309563, lng: 34.8670006
    //lat: position.coords.latitude, lng: position.coords.longitude
    //alert("lat:" + position.coords.latitude +"\nlng: " + position.coords.longitude)
    
    const myLocation = { lat: position.coords.latitude, lng: position.coords.longitude};
    // The map, centered at myLocation
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: myLocation,
    });


// creating the "center" of the map
    // The marker, positioned at myLocation
    const marker = new google.maps.Marker({
        position: myLocation,
        map: map
    });

    var infoWindow = new google.maps.InfoWindow({
        content: "יאללה ישיבה אצל פרוזן?"
    });

    marker.addListener("click", () => {
        infoWindow.open(map,marker);
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
    }

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // get this info from the dataBase
    const hisLocation = {lat: 32.0409563, lng: 34.8970006}
    const hisName = '<h2>Stefan<h2>'

    const herLocation = {lat: 32.0459563, lng: 34.8970006}
    const herName = '<h2>Yulia<h2>'



    //convert his name into html & css
    var div1 = document.createElement("div");
    div1.innerHTML = hisName;

    var div2 = document.createElement("div");
    div2.innerHTML = herName;

    
    addMarker({
        coords: hisLocation,
        iconImage: 'http://labs.google.com/ridefinder/images/mm_20_green.png',
        txt: hisName
    })

    addMarker({
        coords: herLocation,
        iconImage: 'http://labs.google.com/ridefinder/images/mm_20_green.png',
        txt: herName
    })

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
