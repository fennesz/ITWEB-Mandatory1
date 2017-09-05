import { Exercise } from '../models/Exercise';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { MongoRepository } from '../dataaccesslayer/MongoRepository';
/* GET homepage */

export class HomeController {

    static index(req, res) {
        MongoRepository.GetInstance<WorkoutProgram>().Read("WorkoutPrograms", {}).then((result) => {
            console.log(result);
            res.render('index', { title: 'Workout Program', array: result[0].ExerciseList});
        });
    };
}