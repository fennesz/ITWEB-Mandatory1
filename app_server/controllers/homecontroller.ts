import { Exercise } from '../models/Exercise';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { MongoRepository } from '../dataaccesslayer/MongoRepository';
/* GET homepage */

export class HomeController {

    static index(req, res) {
        let workoutProgram = new MongoRepository<WorkoutProgram>().Read("WorkoutPrograms", {})[0];
        res.render('index', { title: 'Workout Program', array: workoutProgram.ExerciseList});
    };
}