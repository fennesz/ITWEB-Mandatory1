import { Exercise } from './Exercise';

export class WorkoutProgram {
    _id: string;
    ExerciseList: Exercise[];

    constructor() {
        this.ExerciseList = [];
    }
}