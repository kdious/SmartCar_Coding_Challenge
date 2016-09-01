// ========================================================================
// Filename:    SmartCar_Test_CLient.js
// Author:      Kevin Dious (kdious@gmail.com)
// Description: This file is a simple test client that can be used to
//              interact with the SmartCar_API_Server. 
// ========================================================================

//  Node.js libraries
// Get a handle to the HTTP request module
var request = require('request');

// Get a handle to the log object
var log = require('loglevel');

// Set the log level
log.setLevel("debug")

// Request options for the getVehicleInfo request message
var getVehicleInfoRequestOptions = {
    url: 'http://localhost:8081/vehicles/1234'
};

// Request options for the getSecurityStatus request message
var getSecurityStatusRequestOptions = {
    url: 'http://localhost:8081/vehicles/1234/doors'
};

// Request options for the getFuelLevel request message
var getFuelLevelRequestOptions = {
    url: 'http://localhost:8081/vehicles/1234/fuel'
};

// Request options for the getBatteryLevel request message
var getBatteryLevelRequestOptions = {
    url: 'http://localhost:8081/vehicles/1234/battery'
};

// Request options for the startEngine request message
var startEngineRequestOptions = {
    url: 'http://localhost:8081/vehicles/1234/engine',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "START"})
};

// Request options for the stopEngine request message
var stopEngineRequestOptions = {
    url: 'http://localhost:8081/vehicles/1234/engine',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "START"})
};

// Generic Response Callback function
responseReceivedCb = function(error, response, body) {
    log.debug(response.statusCode);
    log.debug(response.statusMessage);
    //log.debug(response);
    log.debug(body);
}

request.get(getVehicleInfoRequestOptions, responseReceivedCb);
request.get(getSecurityStatusRequestOptions, responseReceivedCb);
request.get(getFuelLevelRequestOptions, responseReceivedCb);
request.get(getBatteryLevelRequestOptions, responseReceivedCb);
request.post(startEngineRequestOptions, responseReceivedCb);
request.post(stopEngineRequestOptions, responseReceivedCb);