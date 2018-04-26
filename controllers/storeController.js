/**
  * storeController.js
  * Handle Store releated logics.
**/
const Store = require('../models/store');
const logger = require('node-simple-logger-es6');
const moment = require('moment');

//Get Value for the request key
exports.getStore = (req, res, next) => {
  const key = req.params.key;
  const queryTimeStamp = req.query.timestamp;
  if (undefined == queryTimeStamp) {
    const selectKeyQuery = Store.find({key: key})
      .sort({timestamp: 'desc'})
      .limit(1)
      .select('value');
    selectKeyQuery
      .exec()
      .then(result => {
        if (0 == result.length) {
          return res
            .status(400)
            .json({message: 'There is no key for : ' + key});
        }
        res.status(200).json(createResponseObj1(result[0]));
      })
      .catch(error => {
        logger.error('Error message occured while : ' + error);
        next(error);
      });
  } else {
    const selectWithTimeStampQuery = Store.find({key: key})
      .where('timestamp')
      .lte(queryTimeStamp)
      .sort({timestamp: 'desc'})
      .limit(1)
      .select('value');
    selectWithTimeStampQuery.exec().then(result => {
      if (0 == result.length) {
        logger.debug('There is no key for : ' + key);
        return res.status(400).json({message: 'There is no key for : ' + key});
      }
      res.status(200).json(createResponseObj1(result[0]));
    });
  }
  // Filter attribute and convert timestamp to readble time.
  const createResponseObj1 = ({value}) => {
    return {value};
  };
};

//Save Store
exports.saveStrore = (req, res, next) => {
  const reqStoreArray = Object.entries(req.body);
  //Check the size of the array
  if (reqStoreArray.length === 0) {
    const e = new Error('Empty Request!');
    res.status(400);
    return next(e);
  }
  const [inKey, inValue] = reqStoreArray[0];

  const store = new Store({
    key: inKey,
    value: inValue,
  });

  //Create new Store object
  store.save(store, (err, result) => {
    if (err) {
      logger.error('Error occured while saving : ' + err);
      const e = new Error('Invalid Data!');
      res.status(400);
      return next(e);
    }
    res.status(200).json(createResponseObj(result));
  });

  // Filter attribute and convert timestamp to readble time.
  const createResponseObj = ({timestamp, key, value}) => {
    const time = moment(timestamp).format('hh:mm a');
    return {timestamp: time, key, value};
  };
};
