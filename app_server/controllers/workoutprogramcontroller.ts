import { Exercise } from '../models/Exercise';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { WorkoutProgramRepository } from '../dataaccesslayer/workoutprogramrepository';
/* GET homepage */

export class WorkoutProgramController {
    public static addExercise(req, res) {
        let ex = <Exercise>req.body;
        WorkoutProgramRepository.AddExercise(ex);
        return res.redirect('/');
    }
}