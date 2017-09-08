import { IMongoRepository } from './app_server/dataaccesslayer/IMongoRepository';
import { MongoRepository } from './app_server/dataaccesslayer/implementations/MongoRepository';
import { CurrentConfig } from './ConfigLoader';
import { WorkoutProgram } from './app_server/models/WorkoutProgram';


export function GetWorkoutProgramRepo(): IMongoRepository<WorkoutProgram> {
    let conf = CurrentConfig();
    return new MongoRepository<WorkoutProgram>(conf.dataBaseConnectionString, conf.workoutProgramsCollection);
}