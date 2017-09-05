import { WorkoutProgram } from '../models/WorkoutProgram';
import { Exercise } from '../models/Exercise';
export class ExerciseCollectionRepository {

    private static cachedCollection: WorkoutProgram = new WorkoutProgram();

    public static GetWorkoutProgram(): WorkoutProgram {
        /*TODO: MongoDB getall*/
        return ExerciseCollectionRepository.cachedCollection;
    }

    public static AddExercise(ex: Exercise) {
        ExerciseCollectionRepository.cachedCollection.ExerciseList.push(ex);
    }

}