import { Exercise } from '../models/Exercise';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { ExerciseCollectionRepository } from '../dataaccesslayer/ExerciseCollectionRepository';
/* GET homepage */

export class HomeController {

    static index(req, res) {
        let workoutProgram = ExerciseCollectionRepository.GetWorkoutProgram();
        res.render('index', { title: 'Workout Program', array: workoutProgram.ExerciseList});
    };

    static addExercise(req, res) {
        let ex = <Exercise>req.body;
        ExerciseCollectionRepository.AddExercise(ex);
        return res.redirect('/');
    }
}