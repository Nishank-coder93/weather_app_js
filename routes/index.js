/**
 * @author: Nishank Bhatnagar
 * Student ID: 1001397098
 *
 */

var express = require('express'); /* This includes the Express framework */

var soap = require('strong-soap').soap; /* This includes the SOAP service to make SOAP request */
var WSDL = soap.WSDL; /* Make the SOAP request to WSDL link */
var url = "http://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl"; /* URL to maek the request to */

/**
 * Class socketConnection configures the initial values
 * @param  Express app   - Contains the main App of Express
 * @param  Socket socket - Main Socket to create the connection and parse data through to client
 */
var socketConnection = function(app, socket) {
  this.app = app;
  this.socket = socket;
};

/**
 * This function makes the SOAP request according to users
 * latitude and longitude input
 * And sends the Data retrieved to the Client side
 * @param  Socket sockConn
 * @param  Float lat
 * @param  Float long
 */
var renderXML = function(sockConn, lat, long) {
  var requestArgs = {
    latitude: lat,
    longitude: long,
    product: "time-series",
  };
  var opt = {};
  soap.createClient(url, opt, function(err, client) {
    var method = client['NDFDgen'];

    method(requestArgs, function(err, result, envolope, soapHeader) {

      //console.log("This is the Result : \n", result.dwmlOut.$value);
      sockConn.emit("weatherinfo", result.dwmlOut);
    });
  });
};

/**
 * Initial connection
 */
socketConnection.prototype.connect = function() {
  this.socket.on('connection', function(sock) {
    console.log("Connected !! ");
    sock.on("location", function(data) {
      renderXML(sock, data.latitute, data.longitude);
    });
  });
};

module.exports = socketConnection;
