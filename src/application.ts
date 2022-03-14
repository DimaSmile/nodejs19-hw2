import express from "express";
import { apiRouter } from "./routes/api";

export default class App {
    public app: express.Application;
    public port: number;

    public constructor(port: number) {
        this.app = express();
        this.port = port;


        this.app.use(express.json());
        this.app.use('/api', apiRouter);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }
}