import { WorkoutProgram } from '../models/WorkoutProgram';
import { Exercise } from '../models/Exercise';

export interface ExerciseDTO extends Exercise {
    index: number;
};