import { Context } from "koa";

export class RestController {
    public response(ctx: Context, result, statusCode = 200) {
        const response = {
            resultStatus: {
                hasError: false,
                errorMessage: null,
                errorCode: null
            },
            result: result
        };

        ctx.status = statusCode;
        ctx.body = response;
    }
}