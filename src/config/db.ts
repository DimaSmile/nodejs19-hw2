import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

export type dbConfigType = {
    connection: Dialect,
    host: string,
    port: number,
    database: string,
    username: string,
    password: string,
};

export const dbConfig: dbConfigType = {
    connection: (process.env.DB_CONNECTION ?? 'mysql') as Dialect,
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_DATABASE ?? 'postgres_db',
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? ''
} as const;

