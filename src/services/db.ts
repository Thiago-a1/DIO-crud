import { Pool } from 'pg';

const connectionString = 'postgres://qbwoabnm:BxBvSbqyNz-6aEMuRM8_r6c9DH0fAM9h@kesavan.db.elephantsql.com/qbwoabnm';
const db = new Pool({ connectionString });

export default db;