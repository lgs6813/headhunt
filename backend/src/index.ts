import { App } from "./App";

process.env.TZ = "Asia/Seoul";
const app = new App().getApp();
app.listen(8080);
