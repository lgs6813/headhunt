import {Context} from "koa";
import { RestController } from "./RestController";
import { Connection} from "mysql";

export class UserController extends RestController{
    private db: Connection;
    constructor(db: Connection){
        super();
        this.db = db;
    }

    public getUser(ctx: Context, next: Function){
        console.log(ctx['user']);
        this.response(ctx, "wowyeah");
    }
}