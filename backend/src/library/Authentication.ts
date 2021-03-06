import { Context } from "koa";
import * as JWT from "jsonwebtoken";
import { Config } from "../config/Config";
import { IUser } from "../interface/IUser";
import * as NodeCache from "node-cache";

export class Authentication {
    private nodeCache: NodeCache;

    constructor(nodeCache: NodeCache){
        this.nodeCache = nodeCache;
    }

    public authentication(ctx: Context, next: Function) {
        ctx['user'] = {
            UId: 1,
            name: 'jongwan',
            phone: '123-1234-1234',
            type: 'freelancer',
            user_id: 'snn77',
            password: 'asdf',
            age: 26,
            create_date: 'w'
        }
        if (this.isException(ctx)) {
            return next();
        }

        const jwt = ctx.request.headers.jwt;

        if (!jwt) {
            return ctx.throw(400, "Token Not Found");
        }

        try {
            JWT.verify(jwt, Config.getTokenSecrete);
        }catch(e){
            return ctx.throw(400, "Bad Token");
        }

        const user: IUser = this.nodeCache.get(jwt);

        if (!user) {
            return ctx.throw(400, "Bad Token");
        }

        if (this.adminNeeded(ctx) && user.type != "admin") {
            return ctx.throw(403, "admin needed");
        }

        ctx['user'] = user;
        next();
    }

    private isException(ctx: Context) {
        // return (ctx.url.indexOf('guest') !== -1);
        return true;
    }

    private adminNeeded(ctx: Context) {
        return (ctx.url.indexOf('admin') !== -1);
    }
}