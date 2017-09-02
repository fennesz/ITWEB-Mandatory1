var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("Fisk")
  //res.send('respond with a resource');
});

export = router;
