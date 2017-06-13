/**
 * @author: Nishank Bhatnagar
 * Student ID: 1001397098
 *
 */

"use strict";

var express = require('express'); /* Imports Express app */
var app = express(); /* Inities the Express framework */
var server = require('http').Server(app); /* Initiates the HTTP Server */
var io = require('socket.io')(server); /* Initiates Socket communication */
var mainsocket;

var index = require('./routes/index.js'); /* Class Index */

var Class = function(app, socket) {
  this.app = app;
  this.socket = socket;
};

/**
 * Initiates the application
 * and sends the Public file ie. .html, .js, .css etc.
 */
Class.prototype.config = function() {
  this.app.use(express.static(__dirname + '/public'));

  this.app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });
};

/**
 * Handles the Socket Connection and Connection of other processes
 * with Main Socket
 */
Class.prototype.sockConn = function() {
  var indexPage = new index(this.app, this.socket);
  indexPage.connect();
};

/**
 * Executes the application
 * This is the Starting point
 */
Class.prototype.execute = function() {
  server.listen(3000);
  this.config();
  this.sockConn();
};

/**
 * Creates new object of the class and executes the Application
 */
var Setup = new Class(app, io);
Setup.execute();
