import { Exercise } from '../models/Exercise';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { MongoRepository } from '../dataaccesslayer/MongoRepository';
/* GET homepage */

export class HomeController {

    static index(req, res) {
        MongoRepository.GetInstance<WorkoutProgram>().GetAll("WorkoutPrograms").then((result) => {
            res.render('workoutprogramlist', { title: 'Workout Program', array: result});
        });
    };
}