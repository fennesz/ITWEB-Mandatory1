import { MongoClient, Db, Collection, Cursor} from 'mongodb';

class DatabaseLayer {
    Url: string;
    Db: Db;

    public Connect(url: string): Promise<boolean> {
        if(url != "" && this.Url == null) {
            this.Url = url;
        }
        if(this.Db != null) {
            this.Db.close();
        }
        return MongoClient.connect(this.Url).then(db => {
            this.Db = db;
            return true;
        }).catch((err) => false);
    }

    public Insert(collectionString: string, ...data: any[]) : Promise<boolean> {
        if(data.length < 1) {
            return Promise.resolve(true);
        }
        let collection: Collection<any, any> = this.Db.collection(collectionString);        
        return collection.insertMany(data).then((res) => res.result.ok == 1);
    }

    public Find(collectionString: string, filter: any): Promise<any[]> {
        let collection: Collection<any, any> = this.Db.collection(collectionString);        
        return (collection.find(filter) as Cursor<any, any>).toArray();
    }
}