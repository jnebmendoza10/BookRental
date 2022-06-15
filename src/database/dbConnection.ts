import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import Logger from '../lib/Logger';

dotenv.config();

export const SqlDataSource = new DataSource({
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    options: {
        encrypt: false,
    },
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const checkConnection = async (logger: Logger) => {
    try {
        await SqlDataSource.initialize();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error(error);
    }
};
