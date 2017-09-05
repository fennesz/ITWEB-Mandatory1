import { MongoClient, Db, Collection, Cursor} from 'mongodb';

export class MongoDb {
    Url: string;
    Db: Db;

    public Connect(url: string): Promise<boolean> {
        if(url != "" && this.Url == undefined) {
            this.Url = url;
        }
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

    public Insert(collectionString: string, ...data: any[]) : Promise<boolean> {
        if(data.length < 1) {
            return Promise.resolve(true);
        }
        let collection: Collection<any> = this.Db.collection(collectionString);        
        return collection.insertMany(data).then((res) => res.result.ok == 1);
    }

    public Find(collectionString: string, filter: any): Promise<any[]> {
        let collection: Collection<any> = this.Db.collection(collectionString);        
        return (collection.find(filter) as Cursor<any>).toArray();
    }

    public Remove(collectionString: string, objectToRemove: any): Promise<boolean> {
        let collection: Collection<any> = this.Db.collection(collectionString);        
        return collection.findOneAndDelete(objectToRemove).then((res) => res != null);
    }

    public GetAll(collectionString: string): Promise<any[]> {
        return this.Find(collectionString, {});
    }
}