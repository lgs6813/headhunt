import { Context } from "koa";
import { RestController } from "./RestController";
import { Connection } from "mysql";
import { DBLibrary } from "../library/DbLibrary";

export class UserController extends RestController {
    private dbLibrary: DBLibrary;
    constructor(db: Connection) {
        super();
        this.dbLibrary = new DBLibrary(db);
    }

    public async getMyInfo(ctx: Context, next: Function) {
        const userInfo = ctx['user']; 
        try{
            this.response(ctx, userInfo);
        }catch(e){
            console.log(e);
        }
    }

    public async createUser(ctx: Context, next: Function) {

    }

    public async deleteUser(ctx: Context, next: Function) {}

    public async updateUser(ctx: Context, next: Function) {}
}
