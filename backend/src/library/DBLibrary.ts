import * as mysql from "mysql";

export class DBLibrary{
    private db: mysql.Connection;

    constructor(db: mysql.Connection){
        this.db = db;
    }

    public async query(query: string){
        const promise = new Promise((resolve, reject) => {
            this.db.query(query, (err, results, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
        return await promise.then(res => res).catch(res => res);
    }
}