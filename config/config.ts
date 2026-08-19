import dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_SERVER,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres" as const,
    seederStorage: "sequelize",
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_SERVER,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres" as const,
    seederStorage: "sequelize",
  },
  production: {
    use_env_variable: "POSTGRES_URL",
    dialect: "postgres" as const,
    seederStorage: "sequelize",
  },
};

export default config;