/* NODESERVER - CollabVis 
*/
// *****************************************
// --- IMPORTS AND CONFIG -----
// *****************************************
// Packages
require('dotenv').config()
const express = require("express");
const logger = require(`./config/winston`); // load customized logger

// Set up express
const webServerPort = 8080;
const hostedDir = "public";

let app = express();
const webServer = require('http').Server(app);
webServer.listen(webServerPort);
app.use(express.static(hostedDir))
logger.info("webserver is listening on port " + webServerPort);

