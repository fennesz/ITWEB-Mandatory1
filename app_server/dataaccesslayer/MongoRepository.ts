import { MongoClient, Db, Collection, Cursor} from 'mongodb';

export class MongoRepository<T> {
    Url: string;
    Db: Db;

    public Connect(url: string): Promise<boolean> {
        if(url == "") {
            throw new Error("url can't be empty");
        }
        this.Url = url;

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

    public Create(collectionString: string, ...data: T[]) : Promise<boolean> {
        if(data.length < 1) {
            return Promise.resolve(true);
        }
        let collection: Collection<T> = this.Db.collection(collectionString);        
        return collection.insertMany(data).then((res) => res.result.ok == 1);
    }

    public Update(collectionString: string, filter: any, data: any): Promise<boolean> {
        let collection: Collection<T> = this.Db.collection(collectionString);        
        return collection.updateOne(filter, data).then(res => res.result.ok == 1);
    }

    public Read(collectionString: string, filter: any): Promise<T[]> {
        let collection: Collection<T> = this.Db.collection(collectionString);        
        return (collection.find(filter) as Cursor<T>).toArray();
    }

    public Delete(collectionString: string, objectToRemove: T): Promise<boolean> {
        let collection: Collection<T> = this.Db.collection(collectionString);        
        return collection.findOneAndDelete(objectToRemove).then((res) => res != null);
    }

    public GetAll(collectionString: string): Promise<T[]> {
        return this.Read(collectionString, {});
    };
}