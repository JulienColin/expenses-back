import { Pool } from 'pg';

const pool: Pool = new Pool({
    database: 'expenses',
    host: '127.0.0.1',
    password: 'aragorn13!',
    port: 5432,
    user: 'julien'
});

export default pool;
