// ========================================================================
// Filename:    SmartCar_API_server.js
// Author:      Kevin Dious (kdious@gmail.com)
// Description: This file is the implementation of the SmartCar API server.
//              The server will listen for and answer requests that are
//              formatted per the SmartCar API Spec. 
// ========================================================================

//  Node.js libraries
var bodyParser = require('body-parser');    // Parse JSON in POST request body
var express = require('express');           // Set up express app web server       

var log = require('loglevel');              // Used for logging
var util = require('util');                 // Used primarily for printing Javascript objects

// Smart Car Libraries
var libGM = require('./libs/SmartCar_GM_Library');   // Library used to interface with the GM server
var scResponse = require('./libs/SmartCar_Response'); // Handle and interpret SmartCar responses and error codes

// Interpret SmartCar_API Error Codes
var SMARTCAR_ERROR_CODE = scResponse.SMARTCAR_ERROR_CODE


// Global Variables

// Transaction Table

// The transaction table is used to maintain information about an incoming
// request to the SmartCar API server.  When a request is received, the
// request and response objects are stored in the transaction table via a
// transaction ID that is generated for each incomign request.  When the
// GM server response callback is called by the GM library, the corresponding
// transaction ID for that transaction is use dto retrieve the response objects
// from teh transaction table.  This response object is used to respond to the
// initial HTTP request message that was sent to the SmartCar API server.

// Note: There could be encapsulated into some sort of Singelton object
//       in a more modular design.
var g_TransactionTable = {};

var MAX_TRANS_ID = 32767;   // Used to limit the size of the transaction ID
                            // Note: This value should be chosen based on the 
                            // number of potential connections

var g_TransId = 0;          // Variable that holds the next transaction ID to be used

// HELPER ROUTINES

// getNextTransId: Returns the next transaction ID as a string
function getNextTransId() {
    var nextTransId = g_TransId++ % MAX_TRANS_ID;
    return nextTransId.toString()
}

// getNextTransId: Creates and adds a new entry in the transaction ID table
// clientHttpRequest (input parameter): The HTTP request object  for the 
//                                      associated HTTP request from the client
// clientHttpRequest (input parameter): The HTTP response object  for the 
//                                      associated HTTP request from the client
// return:                              The transaction ID string for this transaction
function createNewTransaction(clientHttpRequest, clientHttpResponse) {
    var transactionReqRespInfo = {requestInfo: clientHttpRequest, responseInfo: clientHttpResponse};
    var transIdString = getNextTransId();
    log.debug("transIdString: " + transIdString + "\n");
    g_TransactionTable[transIdString] = transactionReqRespInfo;
    log.debug("g_TransactionTable[transId]: " + util.inspect(g_TransactionTable[transIdString]) + "\n");
    return transIdString;
}

// sendResponseCB: Callback that is called by the GM library to initiate 
//                   seding a response to the client
// transIdString (input parameter): The transaction ID string for this transaction
// responseData (input parameter):  The data returned by the GM library                            
var sendResponseCB = function (transIdString, responseData) {
    log.debug("Response data received: " + util.inspect(responseData) + "\n");
    response = g_TransactionTable[transIdString].responseInfo;
   
    var httpStatusToSend;
    var responseDataToSend;
    
    // Error handling
    // Here we can handle errors that were sent by the GM server
    // and/or the SmartCar GM library and translate them to more 
    // specific/helpful errors that can be sen tto the SmartCar 
    // API server client.
    switch (responseData.errorCode)
    {
        case SMARTCAR_ERROR_CODE.SUCCESS: 
            httpStatusToSend = 200;
            responseDataToSend = responseData.data;
            break;
        case SMARTCAR_ERROR_CODE.INVALID_INPUT: 
            httpStatusToSend = 400;
            if(responseData.data == responseData) {
                responseDataToSend = responseData.data;
            }
            else {
                responseDataToSend = "Invalid input provided by client";
            }
            break;
        case SMARTCAR_ERROR_CODE.REMOTE_SERVER_ERROR: 
            httpStatusToSend = responseData.httpResponseInfo.status;
            responseDataToSend = responseData.httpResponseInfo.reason;
            break;
        case SMARTCAR_ERROR_CODE.UNKNOWN_COMMAND: 
            httpStatusToSend = 500 ;
            responseDataToSend = "Server does not recognize command";
            break;
        default: 
            httpStatusToSend = 500 ;
            responseDataToSend = "Internal Server Error";
    }
   
    log.debug("Response data to send: " + util.inspect(responseDataToSend) + "\n");
    response.status(httpStatusToSend).send(responseDataToSend);
    delete g_TransactionTable[transIdString];  
}

// Express HTTP Server

// Create a express instance
var server = express();

// Set the server to parse JSON in the body
server.use(bodyParser.json());

// Set the log level
log.setLevel("debug")

// HTTP server routines

// These are the functions that handle the incomign requests
// to the SmartCar API server from the client.

// Each function will: 
// A. create a new transaction for the incoming request
// B. Parse the input (if necessary)
// C. Call the corresponding GM library routine
//    (making sure to pass in the transaction ID 
//     and other input parameters) 
server.get('/vehicles/:id', function (req, res) {
    var transactionReqRespInfo = {requestInfo: req, responseInfo: res};
    var transIdString = createNewTransaction(req, res);
    libGM.getVechileInfo(transIdString, req.params.id, sendResponseCB); 
});

server.get('/vehicles/:id/doors', function (req, res) {
    var transIdString = createNewTransaction(req, res);
    libGM.getSecurityStatus(transIdString, req.params.id, sendResponseCB);
})

server.get('/vehicles/:id/fuel', function (req, res) {
    var transIdString = createNewTransaction(req, res);
    libGM.getEnergyInfo(transIdString, req.params.id, "fuelRange", sendResponseCB);
})

server.get('/vehicles/:id/battery', function (req, res) {
    var transIdString = createNewTransaction(req, res);
    libGM.getEnergyInfo(transIdString, req.params.id, "batteryRange", sendResponseCB);
})

server.post('/vehicles/:id/engine', function (req, res) {
    log.debug("Command: " + req.body + "\n");
    var transIdString = createNewTransaction(req, res);
    libGM.startStopEngine(transIdString, req.params.id, req.body.action, sendResponseCB);
})

// Start the SmartCar API web server
//
// For now server is hard coded to run on and listen for 
// HTTP requests on the local machine on port 8081
var server = server.listen(8081, 'localhost', function () {

  var host = server.address().address
  var port = server.address().port

  console.log("SmartCar API server server listening at http://%s:%s", host, port)

})
