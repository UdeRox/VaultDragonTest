/**
  app.js file starting point of the application.
**/
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/storeRoutes");
const logger = require('node-simple-logger-es6');
const mongoose = require("mongoose");
const config = require('config');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/object', routes);

mongoose.connect(config.get('vaultDragon.dbConfig.host'));

// Port allocation
const PORT = config.get('vaultDragon.port') || 3000;
mongoose.connect(PORT);

app.listen(PORT, () => {
  logger.debug(`Server is listening on port ${PORT}` );
});

mongoose.connection.on('connected', function () {
  logger.log('Mongoose default connection open to ');
});
module.exports = app;
