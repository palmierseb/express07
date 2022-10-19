import dotenv from 'dotenv';
dotenv.config();

import { createConnection } from 'mysql2';

const database = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


export default database;