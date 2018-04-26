/**
  * storeRoutes.js
  * Handle Store routes.
**/
const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController")

router.get('/:key', storeController.getStore); //Get route for the key
router.post('/', storeController.saveStrore); //Save Store

module.exports = router;
