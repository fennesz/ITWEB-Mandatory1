import { WorkoutProgram } from '../models/WorkoutProgram';
import { Exercise } from '../models/Exercise';

export class WorkoutProgramRepository {

    private static cachedCollection: WorkoutProgram = new WorkoutProgram();

    public static GetWorkoutProgram(): WorkoutProgram {
        /*TODO: MongoDB getall*/
        return WorkoutProgramRepository.cachedCollection;
    }

    public static AddExercise(ex: Exercise) {
        WorkoutProgramRepository.cachedCollection.ExerciseList.push(ex);
    }

}