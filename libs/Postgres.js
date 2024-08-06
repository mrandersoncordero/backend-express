const { Pool } = require('pg');
const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

class Postgres {
    constructor() {
        this.config = { connectionString: URI };
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
