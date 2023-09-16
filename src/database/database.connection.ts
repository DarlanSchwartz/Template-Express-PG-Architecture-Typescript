import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const db: Pool = new Pool({
    host: process.env.DATABASE_URL,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: process.env.NODE_ENV == "production" ? true : true
});

db.connect((error, client, done) => {
    if (error) {
        console.error('Error connecting to PostgreSQL', error);
    } else {
        console.log('--------------- Conected to PostgreSQL');
        done();
    }
});

export default db;