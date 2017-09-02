var express = require('express');
var router = express.Router();
import {HomeController} from '../controllers/main';

/* GET homepage. */
router.get('/', HomeController.index);
router.get('/index', HomeController.index);
 
export = router;
