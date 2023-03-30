import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
    ...(process.env.NODE_ENV === "prod" && {
        ssl: {
            rejectUnauthorized: false,
        },
    }),
};

export const db = new Pool(configDatabase);