var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Fiskehans")
  
  //res.render('index', { title: 'Express' });
});

export = router;
