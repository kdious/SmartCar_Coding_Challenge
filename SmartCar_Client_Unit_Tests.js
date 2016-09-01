// ========================================================================
// Filename:    SmartCar_Client_Unit_Tests.js
// Author:      Kevin Dious (kdious@gmail.com)
// Description: This file implements units tests to test the SmartCar_API_Server.
//
//              Error case and Success case requests are generated and sent to
//              the SmartCar_API_Server.  If the server does not send the 
//              expected response then the test case will fail.
//
//              Note: The only test cases to test the response data from the
//              SmartCar_API_Server are the GetVehicleInfo test cases.  This
//              is because for all other APIs, the response from the server
//              varies based on how the GM server is currently set up.
//=========================================================================

// Note.js libraries

// Get a handle to the HTTP request module
var request = require('request');

// Get a handle to the log object
var log = require('loglevel');

// USe for printing Javascript objects
var util = require('util');

// Set the log level
log.setLevel("debug");


// FAILURE CASES

// Case #1: GetVehicleInfo - Incorrect ID
getVehicleInfoInvalidIdReceivedCb = function(error, response, body) {
    log.debug("Test Case: GetVehicleInfo - Incorrect ID");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 404) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 404; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getVehicleInfo request message wih invalid ID
var getVehicleInfoRequestOptions_ERROR_InvalidId = {
    url: 'http://localhost:8081/vehicles/abcd'
};

// Send request
request.get(getVehicleInfoRequestOptions_ERROR_InvalidId, getVehicleInfoInvalidIdReceivedCb);

// Case #2: GetSecurityInfo - Incorrect ID
getSecutiyStatusInvalidIdReceivedCb = function(error, response, body) {
    log.debug("Test Case: GetSecurityInfo - Incorrect ID");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 404) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 404; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getVehicleInfo request message wih invalid ID
var getSecurityStatusRequestOptions_ERROR_InvalidId = {
    url: 'http://localhost:8081/vehicles/abcd/doors'
};

// Send request
request.get(getSecurityStatusRequestOptions_ERROR_InvalidId, getSecutiyStatusInvalidIdReceivedCb);


// Case #3: GetFuelInfo - Incorrect ID
getFuelLevelInvalidIdReceivedCb = function(error, response, body) {
    log.debug("Test Case: GetFuelInfo - Incorrect ID");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 404) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 404; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getVehicleInfo request message wih invalid ID
var getFuelLevelRequestOptions_ERROR_InvalidId = {
    url: 'http://localhost:8081/vehicles/abcd/fuel'
};

// Send request
request.get(getFuelLevelRequestOptions_ERROR_InvalidId, getFuelLevelInvalidIdReceivedCb);

// Case #4: GetBatteryInfo - Incorrect ID
getBatteryLevelInvalidIdReceivedCb = function(error, response, body) {
    log.debug("Test Case: GetBatteryInfo - Incorrect ID");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 404) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 404; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getVehicleInfo request message wih invalid ID
var getBatteryLevelRequestOptions_ERROR_InvalidId = {
    url: 'http://localhost:8081/vehicles/abcd/battery'
};

// Send request
request.get(getBatteryLevelRequestOptions_ERROR_InvalidId, getBatteryLevelInvalidIdReceivedCb);

// Case #5: StartStopEngine - Incorrect ID

// Request options for the startEngine request message
var startEngineRequestOptions_ERROR_InvalidId = {
    url: 'http://localhost:8081/vehicles/abcd/engine',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "START"})
};

startEngineInvalidIdReceivedCb = function(error, response, body) {
    log.debug("Test Case: StartStopEngine - Incorrect ID");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 404) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 404; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Send request
request.post(startEngineRequestOptions_ERROR_InvalidId, startEngineInvalidIdReceivedCb);

// Case #6: StartStopEngine - Incorrect Command

startEngineInvalidCommandReceivedCb = function(error, response, body) {
    log.debug("Test Case: StartStopEngine - Incorrect Command");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 400) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 400; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the startEngine request message
var startEngineRequestOptions_ERROR_Invalid_Command = {
    url: 'http://localhost:8081/vehicles/1234/engine',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "UNKNOWN"})
};

// Send request
request.post(startEngineRequestOptions_ERROR_Invalid_Command, startEngineInvalidCommandReceivedCb);


// SUCCESS CASES

// Case #1: GetVehicleInfo - ID: 1234

// Expected Response Object
var expectedResponseObject_Id_1234 = JSON.stringify({
    "vin": "123123412412",
    "color": "Metallic Silver",
    "doorCount": 4,
    "driveTrain": "v8"
});

// Callback to check response
getVehicleInfoReceivedCb_Id_1234 = function(error, response, body) {
    log.debug("Test Case: GetVehicleInfo - ID: 1234");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else if(body != expectedResponseObject_Id_1234){
        log.debug("Test case FAILED");
        log.debug("Received response object:\n" + util.inspect(body) + "\n");
        log.debug("Expected response object:\n" + util.inspect(expectedResponseObject_Id_1234) + "\n");
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getVehicleInfo request message
var getVehicleInfoRequestOptions_Id_1234 = {
    url: 'http://localhost:8081/vehicles/1234'
};

// Send request
request.get(getVehicleInfoRequestOptions_Id_1234, getVehicleInfoReceivedCb_Id_1234);

// Case #2: GetSecurityStatus - ID: 1234

// Callback to check response
getSecurityStatusReceivedCb_Id_1234 = function(error, response, body) {
    log.debug("Test Case: GetSecurityStatus - ID: 1234");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getSecurityStatus request message
var getSecurityStatusRequestOptions_Id_1234 = {
    url: 'http://localhost:8081/vehicles/1234/doors'
};

// Send request
request.get(getSecurityStatusRequestOptions_Id_1234, getSecurityStatusReceivedCb_Id_1234);

// Case #3: GetFuelLevel - ID: 1234

// Callback to check response
getFuelLevelReceivedCb_Id_1234 = function(error, response, body) {
    log.debug("Test Case: GetFuelLevel - ID: 1234");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getFuelLevel request message
var getFuelLevelRequestOptions_Id_1234 = {
    url: 'http://localhost:8081/vehicles/1234/fuel'
};

// Send request
request.get(getFuelLevelRequestOptions_Id_1234, getFuelLevelReceivedCb_Id_1234);

// Case #4: GetBatteryLevel - ID: 1234

// Callback to check response
getBatteryLevelReceivedCb_Id_1234 = function(error, response, body) {
    log.debug("Test Case: GetBatteryLevel - ID: 1234");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getBatteryLevel request message
var getBatteryLevelRequestOptions_Id_1234 = {
    url: 'http://localhost:8081/vehicles/1234/battery'
};

// Send request
request.get(getBatteryLevelRequestOptions_Id_1234, getBatteryLevelReceivedCb_Id_1234);

// Case #5: StartEngine - ID: 1234

// Callback to check response
startEngineReceivedCb_Id_1234 = function(error, response, body) {
    log.debug("Test Case: StartEngine - ID: 1234");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the startEngine request message
var startEngineRequestOptions_Id_1234 = {
    url: 'http://localhost:8081/vehicles/1234/engine',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "START"})
};

// Send request
request.post(startEngineRequestOptions_Id_1234, startEngineReceivedCb_Id_1234);

// Case #6: StopEngine - ID: 1234

// Callback to check response
stopEngineReceivedCb_Id_1234 = function(error, response, body) {
    log.debug("Test Case: StopEngine - ID: 1234");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the stopEngine request message
var stopEngineRequestOptions_Id_1234 = {
    url: 'http://localhost:8081/vehicles/1234/engine',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "STOP"})
};

// Send request
request.post(stopEngineRequestOptions_Id_1234, stopEngineReceivedCb_Id_1234);


// Case #7: GetVehicleInfo - ID: 1235

// Expected Response Object
var expectedResponseObject_Id_1235 = JSON.stringify({
    "vin": "1235AZ91XP",
    "color": "Forest Green",
    "doorCount": 2,
    "driveTrain": "electric"
});

// Callback to check response
getVehicleInfoReceivedCb_Id_1235 = function(error, response, body) {
    log.debug("Test Case: GetVehicleInfo - ID: 1235");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else if(body != expectedResponseObject_Id_1235){
        log.debug("Test case FAILED");
        log.debug("Received response object:\n" + util.inspect(body) + "\n");
        log.debug("Expected response object:\n" + util.inspect(expectedResponseObject_Id_1235) + "\n");
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getVehicleInfo request message
var getVehicleInfoRequestOptions_Id_1235 = {
    url: 'http://localhost:8081/vehicles/1235'
};

// Send request
request.get(getVehicleInfoRequestOptions_Id_1235, getVehicleInfoReceivedCb_Id_1235);

// Case #8: GetSecurityStatus - ID: 1235

// Callback to check response
getSecurityStatusReceivedCb_Id_1235 = function(error, response, body) {
    log.debug("Test Case: GetSecurityStatus - ID: 1235");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getSecurityStatus request message
var getSecurityStatusRequestOptions_Id_1235 = {
    url: 'http://localhost:8081/vehicles/1235/doors'
};

// Send request
request.get(getSecurityStatusRequestOptions_Id_1235, getSecurityStatusReceivedCb_Id_1235);

// Case #9: GetFuelLevel - ID: 1235

// Callback to check response
getFuelLevelReceivedCb_Id_1235 = function(error, response, body) {
    log.debug("Test Case: GetFuelLevel - ID: 1235");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getFuelLevel request message
var getFuelLevelRequestOptions_Id_1235 = {
    url: 'http://localhost:8081/vehicles/1235/fuel'
};

request.get(getFuelLevelRequestOptions_Id_1235, getFuelLevelReceivedCb_Id_1235);

// Case #10: GetBatteryLevel - ID: 1235

// Callback to check response
getBatteryLevelReceivedCb_Id_1235 = function(error, response, body) {
    log.debug("Test Case: GetBatteryLevel - ID: 1235");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the getBatteryLevel request message
var getBatteryLevelRequestOptions_Id_1235 = {
    url: 'http://localhost:8081/vehicles/1235/battery'
};

// Send request
request.get(getBatteryLevelRequestOptions_Id_1235, getBatteryLevelReceivedCb_Id_1235);

// Case #11: StartEngine - ID: 1235

// Callback to check response
startEngineReceivedCb_Id_1235 = function(error, response, body) {
    log.debug("Test Case: StartEngine - ID: 1235");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the startEngine request message
var startEngineRequestOptions_Id_1235 = {
    url: 'http://localhost:8081/vehicles/1235/engine',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "START"})
};

// Send request
request.post(startEngineRequestOptions_Id_1235, startEngineReceivedCb_Id_1235);

// Case #12: StopEngine - ID: 1235

// Callback to check response
stopEngineReceivedCb_Id_1235 = function(error, response, body) {
    log.debug("Test Case: StopEngine - ID: 1235");
    if(error) {
        log.debug("Test case FAILED - Error sending request to SmartCar_API_Server");
    }
    else if(response.statusCode != 200) {
        log.debug("Test case FAILED - Incorrect HTTP status code returned");
        log.debug("Expected HTTP status code: 200; Received HTTP status code: " + response.statusCode);
    }
    else {
        log.debug("HTTP Status Code: " + response.statusCode);
        log.debug("HTTP Status Code: " + response.statusMessage);
        log.debug("Response message body:\n" + body + "\n");
        log.debug("Test case PASSED");
    }
    log.debug()
}

// Request options for the stopEngine request message
var stopEngineRequestOptions_Id_1235 = {
    url: 'http://localhost:8081/vehicles/1235/engine',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "STOP"})
};

// Send request
request.post(stopEngineRequestOptions_Id_1235, stopEngineReceivedCb_Id_1235);
