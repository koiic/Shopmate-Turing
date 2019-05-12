require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
    port: process.env.TEST_DB_PORT,
    define: {
      timestamps: false
    },
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    define: {
      timestamps: false
    },
  }
};
