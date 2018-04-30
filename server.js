/**
  app.js file starting point of the application.
**/
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('node-simple-logger-es6');
const mongoose = require('mongoose');
const config = require('config');
const routes = require('./routes/storeRoutes');
require('newrelic');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/object', routes);
app.use((err, req, res, next) => {
  res.send({error: err.message});
});

mongoose.connect(config.get('vaultDragon.dbConfig.host'));

// Port allocation
// const PORT = config.get('vaultDragon.port') || 3000;
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  logger.debug(`Server is listening on port ${PORT}`);
});

mongoose.connection.on('connected', function() {
  logger.log('Mongoose default connection open to ');
});
module.exports = app;
