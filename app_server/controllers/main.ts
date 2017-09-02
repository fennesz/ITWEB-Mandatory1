import { Exercise } from '../models/Exercise';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { ExerciseCollectionRepository } from '../dataaccesslayer/ExerciseCollectionRepository';
/* GET homepage */

export class HomeController {

    static index(req, res) {
        let repository: ExerciseCollectionRepository = new ExerciseCollectionRepository();
        let workoutProgram = repository.GetWorkoutProgram();

        res.render('index', { title: 'Workout Program', array: workoutProgram.ExerciseList});
    };// ok

    static addExercise(req, res) {
        let ex = <Exercise>req.body;
        console.log(ex);
        return res.redirect('/');
    }
}