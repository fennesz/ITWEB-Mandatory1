import * as fs from 'fs';

export interface ConfigSettings {
    dataBaseConnectionString: string;
}

const defaultConf: ConfigSettings = { 
    dataBaseConnectionString: "mongodb://localhost:27017" 
};

export function LoadConfig(path: string): Promise<ConfigSettings> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                if (err.code == "ENOENT") {
                    fs.writeFile(path, JSON.stringify(defaultConf), (err) => {
                        if(err){
                            throw err;
                        }
                        else {
                            resolve(defaultConf);
                        }
                    });
                }
                else {
                    throw err;
                }
            }
            else
            {
                return resolve(JSON.parse(data.toString())as ConfigSettings);                
            }
        });
    });
}