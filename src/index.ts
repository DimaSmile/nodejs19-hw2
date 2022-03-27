import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { App } from './application';

if (!process.env.APP_PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.APP_PORT as string, 10);

const app = new App(PORT);

process
    .on('uncaughtException', error => {
        console.log(error.message);
        process.exit(1);
    })
    .on('unhandledRejection', (reason: any) => {
        console.log(reason);
        process.exit(1);
    });

app.listen();
