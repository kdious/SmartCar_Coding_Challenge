// ========================================================================
// Filename:    README.txt
// Author:      Kevin Dious (kdious@gmail.com)
// Description: README file 
// ========================================================================

The details of the coding challenge are explained in the file:
SmartCar_Backend_Challenge.html

This folder contains the files to run my implementation of the 
SmartCar API spec as a server.  The server will listen for requests on 
localhost port 8081 (http://localhost:8081).  The server is written to
respond HTTP requsts received that are formatte dper the SmartCar API 
specification document (contained in the same folder - 
See Smartcar Backend Challenge.html).

The server was designed to be modular in that there is a spearate library
that is used to interface with the GM server.  This way you can interact with
other remote servers by simply creating/including the library for the new 
server and adding additional handler routines for interfacing with the 
new remote server.

Required Node.js libraries to run everything:
request
loglevel
util
request-json-light
body-parser
express

To launch the server type: node SmartCar_API_Sever.js 

Once the server has been launched, then either the 
SmartCar_Client_Unit_Tests script or the SmartCar_Test_Client.js
script can be launched by running:

SmartCar_Client_Unit_Tests.js
 
or

node SmartCar_Test_Client.js

The default log level is set to "debug" in each file so that the console will display
all printouts.  This can be easily changed ber the loglevel module.

This was tested again Node.js version 4.4.4

