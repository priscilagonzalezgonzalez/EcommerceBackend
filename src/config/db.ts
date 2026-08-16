import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

export const db = new Sequelize({
    dialect: 'postgres',
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_SERVER,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),

    models: [__dirname + '/../models/**/*'],
    
    retry: {
      max: 5, 
    },
    logging: true
})

export default db;