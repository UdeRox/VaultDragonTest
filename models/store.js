/**
  Key value store object model.
**/
const mongoose = require("mongoose");

//schema definition
const storeSchema = mongoose.Schema({
  key: {type: String, required: true},
  value: {type: String, required: true},
  timestamp: {type:Number, default: Date.now},
  // createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Store', storeSchema);
