/**
 * @author: Nishank Bhatnagar
 * Student ID: 1001397098
 *
 */


var socket = io(); /* Main Socket communication with server variable */
/* These are the HTML for weather icons */
var sunny = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
var rainy = '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';
var cloudy = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
var thunderstorm = '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>';
var sunnyCloud = '<div class="icon sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>';

/**
 * This function displays the Weather information accordingly
 * @param  JSON weatherInfo - contains all the information about the weather retrived from
 * National Weather Service
 */
function displayWeather(weatherInfo) {
  console.log(weatherInfo.dwml.data);
  var parameter = weatherInfo.dwml.data.parameters;
  console.log(parameter);

  /**
   * Get the Current Weather and shows it to client
   */
  var currWeather = parameter.temperature[0].value[0];
  $("#curW").html(currWeather + "	&deg; F");

  /**
   * Weather Condition Type
   */
  var wCond = parameter.weather["weather-conditions"];
  var ind = 0;

  while (wCond[ind] === "") {
    ind++;
  }

  var primaryCondition = "";
  var secondaryCondition = "";
  var wConditionType = "No Description";

  if (ind < wCond.length) {
    primaryCondition = wCond[ind].value[0];
    secondaryCondition = wCond[ind].value[1];

    wConditionType = primaryCondition._coverage +
      " " + primaryCondition._intensity +
      " " + primaryCondition["_weather-type"] +
      " with " + secondaryCondition._coverage +
      " " + secondaryCondition._intensity +
      " " + secondaryCondition["_weather-type"];
  }

  if (secondaryCondition["_weather-type"] == "rain showers") {
    $("#weatherIcon").html(rainy);
  } else if (primaryCondition["_weather-type"] == "thunderstorm") {
    $("#weatherIcon").html(thunderstorm);
  } else if (parseFloat(currWeather) > 90) {
    $("#weatherIcon").html(sunny);
  } else {
    $("#weatherIcon").html(cloudy);
  }

  $("#weather_type").text(wConditionType);

  /**
   * precipitation
   */
  var pvalLiquid = parameter.precipitation[0];
  var pval = parseFloat(pvalLiquid.value[0].__text);
  $("#curP").text(pval + " inches");
  $("#presIcon").html(rainy);

  /**
   * Probability of precipitation
   */
  var pval1 = parseInt(parameter["probability-of-precipitation"].value[0]);
  var pval2 = parseInt(parameter["probability-of-precipitation"].value[1]);
  var probOfPre = (pval1 + pval2) / 2;
  $("#curPOP").text(probOfPre + "%");
  $("#popIcon").html(rainy);

  /**
   * Humididty
   */
  var humidity = parameter.humidity;
  var dailyMax = humidity[1].value[0];
  $("#curH").text(dailyMax + "%");
  $("#humidityIcon").html(sunnyCloud);
  /**
   * Wind Direction
   */
  var winDir = parameter.direction;
  $("#windDir").text(winDir.value[0].__text + " degrees");
  $("#windDirIcon").html(cloudy);

  /**
   * Wind Speed
   */
  var winSpeed = parameter["wind-speed"];
  $("#curWS").text(winSpeed[0].value[0].__text + " knots");
  $("#wind_speed_type").text("Wind Speed is " + winSpeed[0]._type);
  $("#windSpeedIcon").html(cloudy);
}


/**
 * On initial connection with Socket
 */
socket.on('connect', function() {
  console.log('Connected to socket.io server ');
});

/**
 * Get th Weather Service information from the server and convert it to JSON format
 * @param  XML data - contains the information in XML format
 */
socket.on('weatherinfo', function(data) {
  var x2js = new X2JS();
  console.log(data);
  var jn = x2js.xml_str2json(data.$value);
  displayWeather(jn);
});

$("#latlong").click(function(event) {
  event.preventDefault();

  var lat = parseFloat($("input[name='latitute']").val());
  var long = parseFloat($("input[name='longitude']").val());
  var locPoint = {
    latitute: lat,
    longitude: long
  };

  socket.emit("location", locPoint);

});
