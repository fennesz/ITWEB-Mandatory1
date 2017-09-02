var express = require('express');
var router = express.Router();
import {HomeController} from '../controllers/main';

/* GET homepage. */
router.get('/', HomeController.index);
router.post('/exercise/create', HomeController.addExercise)
 
export = router;
