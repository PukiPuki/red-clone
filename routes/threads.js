var express = require('express');
var router = express.Router();
var customStructure = require('./../utils/dataStructure');
var customStore = new customStructure();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(customStore.top20);
});

router.post('/create', function(req, res, next) {
  const threads = customStore.insert(req.body);
  if (threads == false) {
    res.status(500).send('Message should not be longer than 255 characters!');
  } else {
    res.json(threads);
  }
})

router.put('/:id/vote', function(req, res, next) {
  const id = req.params.id;
  const vote = req.body.vote;
  const threads = customStore.update({id, vote});
  if (threads == undefined) {
    res.status(500).error('vote not found');
  } else {
    res.json(threads);
  }
})

module.exports = router;
