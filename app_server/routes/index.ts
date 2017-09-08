var express = require('express');
var router = express.Router();
import {HomeController} from '../controllers/homecontroller';
import {WorkoutProgramController} from '../controllers/workoutprogramcontroller';


/* GET homepage. */
router.get('/', HomeController.index);
router.get('/program/:Id', WorkoutProgramController.Index);
router.post('/program/:Id/exercise/create', WorkoutProgramController.PostExcercise)
router.post('/program/create', WorkoutProgramController.PostWorkoutProgram)
router.get('/program/:Id/delete', WorkoutProgramController.DeleteWorkoutProgram)
//router.post('/programs/create', WorkoutProgramController.PostWorkoutprogram);
 
export = router;
