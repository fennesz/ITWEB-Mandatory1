import { Exercise } from '../models/Exercise';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { WorkoutProgramRepository } from '../dataaccesslayer/workoutprogramrepository';
/* GET homepage */

export class HomeController {

    static index(req, res) {
        let workoutProgram = WorkoutProgramRepository.GetWorkoutProgram();
        res.render('index', { title: 'Workout Program', array: workoutProgram.ExerciseList});
    };
}