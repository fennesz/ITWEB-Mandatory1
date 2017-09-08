import { Exercise } from '../models/Exercise';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { MongoRepository } from '../dataaccesslayer/implementations/MongoRepository';
/* GET homepage */

export class HomeController {

    static index(req, res) {
        MongoRepository.GetInstance<WorkoutProgram>().GetAll().then((result) => {
            res.render('workoutprogramlist', { title: 'Workout Program', array: result});
        });
    };
}