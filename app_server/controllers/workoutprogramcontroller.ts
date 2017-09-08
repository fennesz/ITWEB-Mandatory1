import { Exercise } from '../models/Exercise';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { MongoRepository } from '../dataaccesslayer/implementations/MongoRepository';
import { ExerciseDTO } from '../models/ExerciseUpdateDTO';
/* GET homepage */

export class WorkoutProgramController {
    public static Index(req, res) {
        let db = MongoRepository.GetInstance<WorkoutProgram>();
        db.Read({ _id: req.params['Id'] }).then((result) => {
            if (result.length != 1) {
                throw new Error("404 Not found");
            }
            res.render('workoutprogramview', { title: 'Workout Program', ExcerciseList: result[0].ExerciseList, WorkoutProgramName: result[0].Name, WorkoutProgramId: result[0]._id });
            return result[0];
        });
    }

    public static PostExcercise(req, res) {
        console.log(req.body);
        let Id = req.params['Id'];
        let exercise = <ExerciseDTO>req.body;
        let Done = Promise.resolve();
        if (exercise.index == undefined) {
            Done.then(() => WorkoutProgramController.CreateExercise(Id, exercise as Exercise));
        }
        else {
            Done.then(() => WorkoutProgramController.UpdateExercise(Id, exercise));
        }

        Done.then(() => res.redirect('/program/' + Id));
    }

    public static UpdateExercise(id: string, ex: ExerciseDTO) {
        let db = MongoRepository.GetInstance<WorkoutProgram>();
        let change = {};
        change["ExerciseList." + ex.index] = ex as Exercise;
        return db.Update({ _id: id }, { $set: change });
    }

    public static CreateExercise(id: string, ex: Exercise) {
        let db = MongoRepository.GetInstance<WorkoutProgram>();
        return db.Update({ _id: id }, { $push: { ExerciseList: ex } });
    }
}