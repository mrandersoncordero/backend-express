const { Pool } = require('pg');

class Postgres {
    constructor() {
        this.config = {
            host: 'localhost',
            database: 'my_store',
            port: 5432,
            user: 'ander',
            password: 'admin123'
        };
        this.pool = null;
    }

    async connect() {
        try {
            if (!this.pool) {
                this.pool = new Pool(this.config);
                return await this.pool.connect();
            }
            return await this.pool.connect();
        } catch (err) {
            console.error('Error connecting to the database', err);
        }
    }

    async close() {
        if (this.pool) {
          await this.pool.end();
          this.pool = null;
        }
    }
}

module.exports = Postgres;
