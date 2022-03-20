import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { App } from './application';

if (!process.env.APP_PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.APP_PORT as string, 10);

const app = new App(PORT);

app.listen();
