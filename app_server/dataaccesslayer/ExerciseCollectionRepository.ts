import { WorkoutProgram } from '../models/WorkoutProgram';
import { Exercise } from '../models/Exercise';
export class ExerciseCollectionRepository {

    private cachedCollection: WorkoutProgram;

    public GetWorkoutProgram(): WorkoutProgram {
        /*TODO: MongoDB getall*/
        return this.generateMockData();
        
    }

    public AddExercise(ex: Exercise) {
        this.cachedCollection
    }

    private generateMockData(): WorkoutProgram {
        let ex1: Exercise = {
            ExerciseName: "Pilates", 
            Description: "No clue", 
            RepsOrTime: "30 minutes", 
            Sets: 11
        };
        let ex2: Exercise = {
            ExerciseName: "Bowling", 
            Description: "Hit pins", 
            RepsOrTime: "1 hour", 
            Sets: 5
        };
        let ex3: Exercise = {
            ExerciseName: "Running", 
            Description: "Erch.....", 
            RepsOrTime: "5 days", 
            Sets: 1
        };

        let exerciseCollection: Exercise[] = [ex1, ex2, ex3];
        this.cachedCollection = {ExerciseList: exerciseCollection};
        return this.cachedCollection;
    }


}