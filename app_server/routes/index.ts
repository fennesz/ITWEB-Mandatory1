var express = require('express');
var router = express.Router();
import {HomeController} from '../controllers/homecontroller';
import {WorkoutProgramController} from '../controllers/workoutprogramcontroller';


/* GET homepage. */
router.get('/', HomeController.index);
router.post('/exercise/create', WorkoutProgramController.addExercise)
router.post('/workoutprograms/create', WorkoutProgramController.PostWorkoutprogram);
 
export = router;
