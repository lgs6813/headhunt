import * as koaRouter from "koa-router";
import {UserController} from "../controller/UserController";
import { Context } from "koa";
import {Connection} from "mysql";

export class UserRouter{
    private router: koaRouter;
    private userController: UserController;

    constructor(db: Connection){
        this.router = new koaRouter({
            prefix: "/user",
        });
        this.userController = new UserController(db);
    }

    private setRoutes(){
        this.router.get('/', (ctx: Context, next: Function) => this.userController.getUser(ctx, next));
    }

    public getRouter(){
        this.setRoutes();
        return this.router;
    }
}