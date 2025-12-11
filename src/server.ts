import express from 'express';
import cors from 'cors'

// Routes imports
import productsRouter from './routes/productsRouter';
import ordersRouter from './routes/ordersRouter';
import productsSSERouter from './routes/productsSSERouter'

// DB
import db from './config/db';

export async function connectDB() {
    try {
        await db.authenticate()
        // await db.sync()
        console.log('Conexión exitosa a la BD')
        
    } catch (error) {
        // console.log(error)
        console.log('Falló la conexión a la BD', error.message)
    }
}

//connectDB()

const app = express();

// Middlewares
app.use( cors() )
app.use(express.json())

// REST endpoints
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/orders', ordersRouter)

// SSE endpoints
app.use("/api/v1/products-stream", productsSSERouter);
  

export default app;