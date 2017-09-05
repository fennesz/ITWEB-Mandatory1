import { Exercise } from '../models/Exercise';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { MongoRepository } from '../dataaccesslayer/MongoRepository';
import { WorkoutProgramExerciseUpdate, ExerciseDTO } from '../dataaccesslayer/ExerciseUpdateDTO';
/* GET homepage */

export class WorkoutProgramController {
    public static addExercise(req, res) {
        let WorkoutProgram = <WorkoutProgramExerciseUpdate>req.body;
        let Done = Promise.resolve();
        if(WorkoutProgram.exercise.index == undefined) {
            Done.then(() => this.CreateExercise(WorkoutProgram.Id, WorkoutProgram.exercise as Exercise));
        }
        else {
            Done.then(() => this.UpdateExercise(WorkoutProgram.Id, WorkoutProgram.exercise));
        }
        
        Done.then(() => res.redirect('/'));
    }

    public static UpdateExercise(id: string, ex: ExerciseDTO) {
        let db = MongoRepository.GetInstance<WorkoutProgram>();
        return db.Connect("mongodb://localhost:4242").then((res) =>{
            let change = {};
            change["ExerciseList." + ex.index] = ex as Exercise;
            return db.Update("WorkoutPrograms", {_id: id}, {$set: change});
        });
    }

    public static CreateExercise(id: string, ex: Exercise) {
        let db = MongoRepository.GetInstance<WorkoutProgram>();
        return db.Update("WorkoutPrograms", {_id: id}, {$push: {ExerciseList: ex}});
    }
}