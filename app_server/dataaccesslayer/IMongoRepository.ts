export interface IMongoRepository<T> {
    Url: string;
    CollectionString: string;
    GetInstance<T>(): IMongoRepository<T>
    Connect(url: string, collectionString: string): Promise<boolean>
    Create(...data: T[]) : Promise<boolean>
    Update(filter: any, data: any): Promise<boolean>
    Read(filter: any): Promise<T[]>
    Delete(objectToRemove: T): Promise<boolean>
    GetAll(): Promise<T[]>
    FixFilter(filter: any): any
}