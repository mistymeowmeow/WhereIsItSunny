function GetWeatherData(urlWeatherData) {

    document.getElementById("weatherData").innerHTML = "test example 3 <br/><br/>";

    xmlHttp = new XMLHttpRequest();

    if (xmlHttp != null) {
        xmlHttp.open("GET", urlWeatherData, false);
        xmlHttp.send(null);
        weatherData = xmlHttp.responseText;
    }

    var jsonWeatherData = JSON.parse(weatherData);
    //document.getElementById("weatherData").innerHTML += weatherData + "<br/>";

    //Possibly put data in a dictionary or array, then you can find the highest number e.g. if the highest entry is 30 then there will be thunder
    //ignore the first day as it doesn't always have all 8 entries
    var totalWeatherValue = 0;
    var i, j;
    for (i = 1; i < 5; i++) {
        for (j = 0; j < 8; j++) {
            document.getElementById("weatherData").innerHTML += jsonWeatherData.SiteRep.DV.Location.Period[i].Rep[j].W + "<br/> ";
            
            document.getElementById("weatherData").innerHTML += " " ;
            
            totalWeatherValue += parseFloat(jsonWeatherData.SiteRep.DV.Location.Period[i].Rep[j].W); 
        }
    }
    
    document.getElementById("weatherData").innerHTML += "Total Weather Value: " + totalWeatherValue.toString() ;
    
    var averageWeatherValue = (totalWeatherValue/(32));
    
    document.getElementById("weatherData").innerHTML += "<br/>" + " Average Weather Value: " + averageWeatherValue.toString() ;

}
