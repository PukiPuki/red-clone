var express = require('express');
var router = express.Router();
var customStructure = require('./../utils/dataStructure');
var customStore = new customStructure();
console.log(customStore.last);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(customStore.top20);
});

router.post('/create', function(req, res, next) {
  var threads = customStore.insert(req.body);
  if (threads == false) {
    res.status(error('Message should not be longer than 255 characters!'));
  } else {
    res.json(threads);
  }
})

router.post('/:id/vote', function(req, res, next) {
  var threads = customStore.update(req.body);
  if (threads == undefined) {
    res.status(error('vote not found'));
  } else {
    res.json(threads);
  }
})

module.exports = router;
