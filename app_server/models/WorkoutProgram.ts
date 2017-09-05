import { Exercise } from './Exercise';

export class WorkoutProgram {
    _id: string;
    Name: string;
    ExerciseList: Exercise[];

    constructor() {
        this.ExerciseList = [];
    }
}