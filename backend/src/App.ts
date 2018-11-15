import * as Koa from "koa";
import { UserRouter } from "./router/UserRouter";
import { Context } from "koa";
import * as NodeCache from "node-cache";  
import { Authentication } from "./library/Authentication";
import { Connection} from "mysql";
import { Db} from "./DB/Db";

export class App{
    private app: Koa; 
    private nodeCache: NodeCache;
    private db: Connection;

    constructor(){ 
        this.app = new Koa();
        this.nodeCache = new NodeCache(); 
        this.db = new Db().getDB(); 
        this.setMiddleware();  
        this.setRoutes();
    } 

    public setMiddleware(){ 
        const auth = new Authentication(this.nodeCache);
        this.app.use((ctx: Context, next: Function) => auth.authentication(ctx, next));
    } 

    public setRoutes(){ 
        const userRouter = new UserRouter(this.db).getRouter();
        this.app.use(userRouter.routes()).use(userRouter.allowedMethods())
    }

    public getApp(){    
        return this.app; 
    }
}