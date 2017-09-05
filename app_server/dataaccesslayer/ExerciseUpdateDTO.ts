import { WorkoutProgram } from '../models/WorkoutProgram';
import { Exercise } from '../models/Exercise';

export interface WorkoutProgramExerciseUpdate{
    Id: string;
    exercises: ExerciseDTO[];
}

export interface ExerciseDTO extends Exercise {
    index: number;
};