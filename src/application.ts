import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api';
import DB  from './database';
import errorMiddleware from './middlwares/error.handling';
import loggerMiddleware  from './middlwares/logger';
import { tracker } from './middlwares/tracker';
import { authenticateUser } from './middlwares/auth';

export class App {
    public app: express.Application;
    readonly port: number;

    public constructor(port: number) {
        this.app = express();
        this.port = port;

        this.bindMiddlewares();
        this.bindApiRoutes();

        this.bindErrorHandling();
    }

    private bindMiddlewares() {
        this.app.use(cors());
        this.app.use(tracker());
        this.app.use(express.json());
        this.app.use(loggerMiddleware());
        this.app.use(authenticateUser());
    }

    private bindApiRoutes() {
        this.app.use('/api', apiRouter);
    }

    private bindErrorHandling() {
        this.app.use(errorMiddleware());
    }

    public listen() {
        this.app.listen(this.port, async () => {
            console.log(`Listening on port ${this.port}`);

            await DB.checkDBConnection();
        });
    }
}
