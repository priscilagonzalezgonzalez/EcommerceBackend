import { Sequelize } from 'sequelize-typescript'
import { env } from "./env";

export const db = new Sequelize({
    dialect: 'postgres',
    database: env.POSTGRES_DB,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    host: env.POSTGRES_SERVER,
    port: env.POSTGRES_PORT,

    models: [__dirname + '/../models/**/*'],
    
    retry: {
      max: 5, 
    },
    logging: true
})

export default db;