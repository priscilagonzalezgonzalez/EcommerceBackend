import "./types/express";
import express from "express";
import cors from "cors";

import productsRouter from "./routes/productsRouter";
import ordersRouter from "./routes/ordersRouter";
import productsSSERouter from "./routes/productsSSERouter";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// REST endpoints
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", ordersRouter);

// SSE endpoints
app.use("/api/v1/products-stream", productsSSERouter);

export default app;
