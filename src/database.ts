import { Sequelize } from 'sequelize-typescript';
import { dbConfig } from './config/db';

class DB {
    readonly sequelize: Sequelize;

    public constructor() {
        this.sequelize = this.connection();
    }

    protected connection() {
        return new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            host: dbConfig.host,
            dialect: dbConfig.connection,
            port: dbConfig.port,
            models: [`${__dirname  }/models`]
        });
    }

    public async checkDBConnection() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    }

    public async sync() {
        try {
            await this.sequelize.sync({ force: false });
        } catch (error) {
            console.error(error);
        }
    }
}

export default new DB();
