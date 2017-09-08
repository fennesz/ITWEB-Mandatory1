import { MongoClient, Db, Collection, Cursor, ObjectID} from 'mongodb';
import { IMongoRepository } from '../IMongoRepository';

export class MongoRepository<T> implements IMongoRepository<T> {
    Url: string;
    CollectionString: string;
    Db: Db;

    constructor(url: string, collectionString: string) {
        if(url == "") {
            throw new Error("url can't be empty");
        }
        this.Url = url;

        if(collectionString == ""){
            throw new Error("Collection can't be empty");
        }
        this.CollectionString = collectionString;
    }

    public Connect(): Promise<boolean> {
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

    public Disconnect() {
        this.Db.close();
        this.Db = null;
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

    public Read(filter?: any): Promise<T[]> {
        filter = filter != undefined ? filter : {};
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