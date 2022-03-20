import express from 'express';
import { apiRouter } from './routes/api';
import DB  from './database';

export class App {
    public app: express.Application;
    readonly port: number;

    public constructor(port: number) {
        this.app = express();
        this.port = port;

        this.bindMiddlewares();
        this.bindRoutes();
    }

    private bindMiddlewares() {
        this.app.use(express.json());
    }

    private bindRoutes() {
        this.app.use('/api', apiRouter);
    }

    public listen() {
        this.app.listen(this.port, async () => {
            console.log(`Listening on port ${this.port}`);

            await DB.checkDBConnection();
        });
    }
}
