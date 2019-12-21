// Update with your config settings.

module.exports = {

  test: {
    client: 'sqlite3',
    connection: {
      filename: './data/devdeskq-test.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/devdeskq-dev.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
