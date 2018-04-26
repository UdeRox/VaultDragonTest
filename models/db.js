// /**
//   * db.js
//   * Handle DB connection status.
// **/
// const mongoose = require("mongoose");
// const dbURI = 'mongodb://localhost/cal';
//
// mongoose.connect(dbURI); // Connect with the MongoDB
//
// //Successfully connected to the DB.
// mongoose.connection.on("connnected", () => {
//   console.log('Mongoose defualt connection is opened!!');
// });
//
// //If the DB connection throws an error
// mongoose.connection.on("error", (err) => {
//   console.log('Mongoose error '+ err)
// });
//
// //When the DB connetion is disconnected.
// mongoose.connection.on("disconnected", () => {
//   console.log('Mongoose default connection is disconnected!')
// })
