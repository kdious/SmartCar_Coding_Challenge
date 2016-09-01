// ========================================================================
// Filename:    SmartCar_GM_Library.js
// Author:      Kevin Dious (kdious@gmail.com)
// Description: This file is the implementation of the library used to
//              communicate with the GM library.
//
//              Requests from the SmartCar_API_Server for the GM server
//              are serviced this library.  When a request is made, this
//              library will send a properly formatted request to the GM
//              server (if possible).  Once a response is received, the
//              this library will formulate a response object and call
//              the associated callback for the request routine.
//=========================================================================

//  Node.js libraries
var log = require('loglevel');                  // For logging
var request = require('request-json-light');    // Send HTTP requests with a JSON obdy and parse responses with a JSON body
var util = require('util');                     // Print Javascript objects

// Smart Car Libraries
var scResponse = require('./SmartCar_Response.js');

// Interpret SmartCar_API Error Codes
var SMARTCAR_ERROR_CODE = scResponse.SMARTCAR_ERROR_CODE

// Get a request-json-light client handle to the GM server
var client = request.newClient('http://gmapi.azurewebsites.net/');

// Set log level to debug
log.setLevel("debug")

// Helper Routines

// Check if value is an int 
// Note: Currently not used 
function isInt(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}

// APIs to export from this module
module.exports = {
    
    // getVechileInfo: Queries the GM server for the vehicle information of the specified vehicle
    // transId (input parameter):   Transaction ID for this transaction
    // id:                          Vehicle ID 
    // responseCallback :           Callback into the SmartCar_API_Server to be invoked once this 
    //                              transactinon is complete
    getVechileInfo: function (transId, id, responseCallback)  {

        // Build the request data
        var requestData = {
          "id": id, 
          "responseType": "JSON"
        };
        
        log.debug("Sending request to getVehicleInfoService for id: " + id + "\n");
        client.post('getVehicleInfoService/', requestData, function(err, serverResponse, serverResponseInfo) {
            var responseToSend = new scResponse.SmartCarResponse();
            responseToSend.httpResponseInfo = serverResponseInfo;
            
            log.debug("Response Info:\n" + util.inspect(serverResponseInfo) + "\n");
            if(serverResponseInfo.status != 200) {

                responseToSend.errorCode = SMARTCAR_ERROR_CODE.REMOTE_SERVER_ERROR;
                
                // Handle error
                log.error("Error - Status code: " + responseToSend.httpResponseInfo.status + "\n");
                
                // Call the callback to send the response
                responseCallback(transId, responseToSend);
                return;
            }
            
            // Parse the JSON response
            var serverResponseData = serverResponseInfo.data;
     
            var doorCount;
            if(serverResponseData.fourDoorSedan.value == "True") {
                doorCount = 4;
            }
            else if (serverResponseData.twoDoorCoupe.value == "True") {
                doorCount = 2;
            }
            else {
                doorCount = 0;
            }
            
            // Create the SmartCar API response object
            responseToSend.errorCode = SMARTCAR_ERROR_CODE.SUCCESS;
            var responseDataToSend = {
                vin: serverResponseData.vin.value,
                color: serverResponseData.color.value,
                doorCount: doorCount,
                driveTrain: serverResponseData.driveTrain.value
            };
            responseToSend.data = responseDataToSend;
            
            log.debug("Response to send:\n" + util.inspect(responseToSend) + "\n");
        
            // Call the callback to send the response
            responseCallback(transId, responseToSend);
        });
    },

    // getSecurityStatus: Queries the GM server for door lock state of the specified vehicle
    // transId (input parameter):   Transaction ID for this transaction
    // id:                          Vehicle ID 
    // responseCallback :           Callback into the SmartCar_API_Server to be invoked once this 
    //                              transactinon is complete
    getSecurityStatus: function (transId, id, responseCallback)  {

        // Build the request data
        var requestData = {
          "id": id, 
          "responseType": "JSON"
        };
        
        // Send request to GM server
        log.debug("Sending request to getSecurityStatusService for id: " + id + "\n");
        client.post('getSecurityStatusService/', requestData, function(err, serverResponse, serverResponseInfo) {
            var responseToSend = new scResponse.SmartCarResponse();
            responseToSend.httpResponseInfo = serverResponseInfo;
            
            // Handle response from the GM server
            log.debug("Response Info:\n" + util.inspect(serverResponseInfo) + "\n");
            if(serverResponseInfo.status != 200) {
                // Handle error
                log.error("Status code: " + responseToSend.httpResponseInfo.status + "\n");
                
                responseToSend.errorCode = SMARTCAR_ERROR_CODE.REMOTE_SERVER_ERROR;
                
                // Call the callback to send the response
                responseCallback(transId, responseToSend);
                return;
            }
            
            // Parse the JSON response
            var serverResponseData = serverResponseInfo.data;

            // Create the SmartCar API response object
            responseToSend.errorCode = SMARTCAR_ERROR_CODE.SUCCESS;
            var responseDataToSend = {}
            
            var doorLockStatusArray = serverResponseData.doors.values;
            for(i = 0; i < doorLockStatusArray.length; i++) {
                responseDataToSend[doorLockStatusArray[i].location.value] = doorLockStatusArray[i].locked.value;
            }
            
            responseToSend.data = responseDataToSend;
            
            log.debug("Response to send:\n" + util.inspect(responseToSend) + "\n");
     
            // Call the callback to send the response
            responseCallback(transId, responseToSend);
        });
    }, 

    // getEnergyInfo: Queries the GM server for the fuel level of the specified vehicle
    // transId (input parameter):   Transaction ID for this transaction
    // id:                          Vehicle ID 
    // requestType:                 The type of request to send (fuel or battery)
    // responseCallback :           Callback into the SmartCar_API_Server to be invoked once this 
    //                              transactinon is complete
    getEnergyInfo: function (transId, id, requestType, responseCallback)  {
        
        if(requestType != "fuelRange" && requestType != "batteryRange") {
            // Handle error
            log.error("Invalid input: requestType = " + requestType + "\n"); 
            return;        
        }

        // Build the request data
        var requestData = {
          "id": id, 
          "responseType": "JSON"
        };

        // Send request to GM server
        log.debug("Sending request to getEnergyService for id: " + id + "\n");
        client.post('getEnergyService/', requestData, function(err, serverResponse, serverResponseInfo) {
            // Handle response from the GM server
            var responseToSend = new scResponse.SmartCarResponse();
            responseToSend.httpResponseInfo = serverResponseInfo;
            
            log.debug("Response Info:\n" + util.inspect(serverResponseInfo) + "\n");
            if(serverResponseInfo.status != 200) {
                // Handle error
                log.error("Status code: " + responseToSend.httpResponseInfo.status + "\n");
                
                responseToSend.errorCode = SMARTCAR_ERROR_CODE.REMOTE_SERVER_ERROR;
                
                // Call the callback to send the response
                responseCallback(transId, responseToSend);
                return;
            }
            
            // Parse the JSON response
            var serverResponseData = serverResponseInfo.data;
            
            // Create the SmartCar API response object
            responseToSend.errorCode = SMARTCAR_ERROR_CODE.SUCCESS;
            var responseDataToSend = {}
            
            if(requestType == "fuelRange") {
                responseDataToSend["percent"] = serverResponseData.tankLevel.value;
            }
            else {
                responseDataToSend["percent"] = serverResponseData.batteryLevel.value;
            }
            
            responseToSend.data = responseDataToSend;
            
            log.debug("Response to send:\n" + util.inspect(responseToSend) + "\n");

            // Call the callback to send the response
            responseCallback(transId, responseToSend);
        });
    },

    // startStopEngine: Makes a request to start/stop the engine of the specified vehicle
    // transId (input parameter):   Transaction ID for this transaction
    // id:                          Vehicle ID 
    // requestType:                 The type of request to send (fuel or battery)
    // responseCallback :           Callback into the SmartCar_API_Server to be invoked once this 
    //                              transactinon is complete
    startStopEngine: function (transId, id, command, responseCallback)  {
        
        // Check for invalid input
        if(command == "START") {
            cmdToSend = "START_VEHICLE";
        }
        else if (command == "STOP") {
            cmdToSend = "STOP_VEHICLE";
        }
        else {
            // Handle error
            log.error("Invalid input: command = " + command + "\n");
            
            // Handle response from the GM server
            var responseToSend = new scResponse.SmartCarResponse();
            responseToSend.errorCode = SMARTCAR_ERROR_CODE.INVALID_INPUT;
            responseToSend.data = "Invalid input: command = " + command;
            
            // Call the callback to send the response
            responseCallback(transId, responseToSend);
            return;
        }

        // Build the request data
        var requestData = {
          "id": id, 
          "responseType": "JSON",
          "command": cmdToSend
        };

        // Send request to GM server
        log.debug("Sending request to actionEngineService for id: " + id + "\n");
        client.post('actionEngineService/', requestData, function(err, serverResponse, serverResponseInfo) {
            // Handle response from the GM server
            var responseToSend = new scResponse.SmartCarResponse();
            responseToSend.httpResponseInfo = serverResponseInfo;
            
            log.debug("Response Info:\n" + util.inspect(serverResponseInfo) + "\n");
            if(serverResponseInfo.status != 200) {
                // Handle error
                log.error("Status code: " + responseToSend.httpResponseInfo.status + "\n");
                
                responseToSend.errorCode = SMARTCAR_ERROR_CODE.REMOTE_SERVER_ERROR;
                
                // Call the callback to send the response
                responseCallback(transId, responseToSend);
                return;
            }
            
            // Parse the JSON response
            var serverResponseData = serverResponseInfo.actionResult;
            
            var actionResult = serverResponseData.status;
            
            // Create the SmartCar API response object
            responseToSend.errorCode = SMARTCAR_ERROR_CODE.SUCCESS;
            var responseDataToSend = {}
            
            if(actionResult == "EXECUTED") {
                responseDataToSend["status"] = "success"
            }
            else {
                responseDataToSend["status"] = "error"
            }
            
            responseToSend.data = responseDataToSend;
            
            log.debug("Response to send:\n" + util.inspect(responseToSend) + "\n");

            // Call the callback to send the response
            responseCallback(transId, responseToSend);
        });
    }
}