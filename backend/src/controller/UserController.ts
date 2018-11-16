import { Context } from "koa";
import { RestController } from "./RestController";
import { Connection } from "mysql";
import { DBLibrary } from "../library/DbLibrary";
import { IUser } from "../interface/IUser";

export class UserController extends RestController {
    private dbLibrary: DBLibrary;
    constructor(db: Connection) {
        super();
        this.dbLibrary = new DBLibrary(db);
    }

    public async getMyInfo(ctx: Context, next: Function) {
        const userInfo: IUser = ctx['user']; 
        let result = {};
        try{
            switch(userInfo.type){
                case 'freelancer':
                result = (await this.dbLibrary.query("SELECT * FROM USER as U, FREELANCER as F WHERE U.UId=" + userInfo.UId))[0];
                result['freelancer_language'] = await this.dbLibrary.query("SELECT language, level FROM FREELANCER_LANGUAGE WHERE FId=" + result['FId']);
                result['team'] = await this.dbLibrary.query("SELECT T.name as teamName, T.type as teamType, U.name as leaderName, U.phone as leaderPhone FROM TEAM as T, TEAM_MEMBER as TM, USER as U WHERE T.type='team' AND TM.FId=" + result['FId']);
                break;
                case 'client':
                result = await this.dbLibrary.query("SELECT * FROM USER, CLIENT WHERE UId=" + userInfo.UId);
                break;
                case 'admin':
                result = await this.dbLibrary.query("SELECT * FROM USER WHERE UId=" + userInfo.UId);
                break;
            }
            
            delete result['password'];

            this.response(ctx, result);
        }catch(e){
            console.log(e);
        }
    }

    public async createUser(ctx: Context, next: Function) {

    }

    public async deleteUser(ctx: Context, next: Function) {}

    public async updateUser(ctx: Context, next: Function) {}
}
