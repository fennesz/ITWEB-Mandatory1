import { Exercise } from '../models/Exercise';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { MongoRepository } from '../dataaccesslayer/implementations/MongoRepository';
import { GetWorkoutProgramRepo } from '../../Factories'
/* GET homepage */

export class HomeController {

    static index(req, res) {
        var repo = GetWorkoutProgramRepo();
        repo.Connect()
        .then(() => repo.GetAll())
        .then((result) => {
            res.render('workoutprogramlist', { title: 'Workout Program', array: result});
        })
        .then(() => repo.Disconnect());
    };
}