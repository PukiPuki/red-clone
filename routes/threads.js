var express = require('express');
var router = express.Router();
var customStructure = require('./../utils/dataStructure');
var customStore = new customStructure();
console.log(customStore.last);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respaond with a resource');
});

router.post('/', function(req, res, next) {
  var threads = customStore.insert(req.body);
  if (threads == false) {
    res.json(error('Message should not be longer than 255 characters!'));
  } else {
    res.json(threads);
  }
})

module.exports = router;
