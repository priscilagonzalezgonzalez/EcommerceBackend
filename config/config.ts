require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_SERVER,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_SERVER,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "POSTGRES_URL",
    dialect: "postgres",
  },
};