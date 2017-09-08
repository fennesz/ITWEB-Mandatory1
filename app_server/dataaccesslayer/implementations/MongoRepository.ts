import { MongoClient, Db, Collection, Cursor, ObjectID} from 'mongodb';

export class MongoRepository<T> {
    Url: string;
    CollectionString: string;
    Db: Db;

    private static instance: any;
    public static GetInstance<T>(): MongoRepository<T> {
        if(MongoRepository.instance == undefined) {
            MongoRepository.instance = new MongoRepository<T>();
        }
        return MongoRepository.instance as MongoRepository<T>;
    }

    private constructor(){

    }

    public Connect(url: string, collectionString: string): Promise<boolean> {
        if(url == "") {
            throw new Error("url can't be empty");
        }
        this.Url = url;

        if(collectionString == ""){
            throw new Error("Collection can't be empty");
        }
        this.CollectionString = collectionString;

        if(this.Db != null) {
            this.Db.close();
        }

        return MongoClient.connect(this.Url).then(db => {
            this.Db = db;
            return true;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }

    public Create(...data: T[]) : Promise<boolean> {
        if(data.length < 1) {
            return Promise.resolve(true);
        }
        let collection: Collection<T> = this.Db.collection(this.CollectionString);        
        return collection.insertMany(data).then((res) => res.result.ok == 1);
    }

    public Update(filter: any, data: any): Promise<boolean> {
        let collection: Collection<T> = this.Db.collection(this.CollectionString);
        this.FixFilter(filter);        
        return collection.updateOne(filter, data).then(res => res.result.ok == 1);
    }

    public Read(filter: any): Promise<T[]> {
        let collection: Collection<T> = this.Db.collection(this.CollectionString);
        this.FixFilter(filter);               
        return (collection.find(filter) as Cursor<T>).toArray();
    }

    public Delete(objectToRemove: T): Promise<boolean> {
        let collection: Collection<T> = this.Db.collection(this.CollectionString);        
        return collection.findOneAndDelete(objectToRemove).then((res) => res != null);
    }

    public GetAll(): Promise<T[]> {
        return this.Read({});
    }

    private FixFilter(filter: any): any{
        if(filter["_id"]) {
            filter["_id"] = new ObjectID(filter["_id"]);
        }
        return filter;
    }
}