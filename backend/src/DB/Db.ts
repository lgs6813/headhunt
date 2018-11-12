import * as mysql from "mysql";
import {Config} from "../config/Config";

export class Db{
    private db: mysql.Connection;

    constructor(){
        this.db = mysql.createConnection(Config.databaseOption);
        this.db.connect();
    } 

    public getDB(){
        return this.db;
    }
}