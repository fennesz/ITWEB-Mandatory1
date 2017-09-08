export interface IMongoRepository<T> {
    Connect(): Promise<boolean>
    Disconnect(): void
    Create(...data: T[]) : Promise<boolean>
    Read(filter?: any): Promise<T[]>
    Update(filter: any, data: any): Promise<boolean>
    Delete(objectToRemove: T): Promise<boolean>
    GetAll(): Promise<T[]>
}