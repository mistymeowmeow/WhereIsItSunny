let map, infoWindow;

function getJSON(url) {
    var radius = parseFloat(document.getElementById("radiusSize").value);
    
    var resp;
    var xmlHttp;

    resp = '';
    xmlHttp = new XMLHttpRequest();

    if (xmlHttp != null) {
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        resp = xmlHttp.responseText;
    }

    var json_resp = JSON.parse(resp);
    var locations = json_resp.Locations;

    let locationCount = 0;
    for (const x in json_resp["Locations"]["Location"]) {
        locationCount++;
    }

    const myLatLng = {
        lat: 51.4816,
        lng: -3.1791
    };

    //Centre marker (e.g. Cardiff)
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 10,
    });

    var a = new google.maps.LatLng(51.4816, -3.1791);

    var containingLocations = new Array();

    //Creating a circle around your location
    const defaultCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: myLatLng,
        radius: radius,
    });

    //Sun icon for markers
    const image = "./sunny.png";
    var icon = {
        url: "./sunny.png", // url
        scaledSize: new google.maps.Size(25, 25), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    //loop through and create markers for each location 
    for (i = 0; i < locationCount; i++) {

        // set up float types for lat and long
        var floatLat = parseFloat(json_resp.Locations.Location[i].latitude);
        var floatLng = parseFloat(json_resp.Locations.Location[i].longitude);

        //set up a centre point constant
        const myLatLngTest = {
            lat: floatLat,
            lng: floatLng
        };

        // a is the centre b is the location
        var b = new google.maps.LatLng(floatLat, floatLng);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(a, b);

        if (distance < radius) {

            var weatherArray = GetWeatherData('http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' + json_resp.Locations.Location[i].id + '?res=3hourly&key=00c02539-1bdc-4e8d-9480-c2f1e8f3e721');

            if (weatherArray[0]) {

                containingLocations.push([weatherArray[0], weatherArray[1], json_resp.Locations.Location[i].id, myLatLngTest]);

                // create a marker for every point
                new google.maps.Marker({
                    position: myLatLngTest,
                    map,
                    title: "Hello World!",
                    icon: icon,
                });
            }
        }
    }

    // print list of ids within the range
    document.getElementById("locations").innerHTML += "<br/><br/>" + containingLocations;

    var averageDataArray = new Array();

    for (i = 0; i < containingLocations.length; i++) {
        var weatherArray = GetWeatherData('http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' + containingLocations[i] + '?res=3hourly&key=00c02539-1bdc-4e8d-9480-c2f1e8f3e721');
        if (weatherArray[0]) {
            averageDataArray.push(weatherArray[1]);
        }
    }

    document.getElementById("weatherData").innerHTML += "<br/><br/>" + averageDataArray;
}

function GetWeatherData(urlWeatherData) {

    xmlHttp = new XMLHttpRequest();

    if (xmlHttp != null) {
        xmlHttp.open("GET", urlWeatherData, false);
        xmlHttp.send(null);
        weatherData = xmlHttp.responseText;
    }

    var jsonWeatherData = JSON.parse(weatherData);
    
    var locationWeatherDataArray = new Array();
    var totalWeatherValue = 0;
    var i, j;
    for (i = 1; i < 5; i++) {
        for (j = 0; j < 8; j++) {
            const weatherData = parseFloat(jsonWeatherData.SiteRep.DV.Location.Period[i].Rep[j].W);
            locationWeatherDataArray.push(weatherData);
        }
    }

    // 9 is the first "wet" weather code
    function checkCode(code) {
        return code < 20;
    }

    document.getElementById("weatherData").innerHTML += locationWeatherDataArray.every(checkCode);

    var isSunny = locationWeatherDataArray.every(checkCode);
    var averageWeatherValue = 0;
    if (isSunny) {
        var total = 0;
        for (var i in locationWeatherDataArray) {
            total += locationWeatherDataArray[i];
        }
        averageWeatherValue = total / locationWeatherDataArray.length;

        document.getElementById("weatherData").innerHTML += averageWeatherValue + "<br/>";
    }

    return [isSunny, averageWeatherValue];
}
