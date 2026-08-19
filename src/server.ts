import { env } from "./config/env";
import app from "./app";
import db from "./config/db";
import redis from "./config/redis";
import "./workers";

const port = env.PORT || 4000;

async function start() {
  try {
    await db.authenticate();
    console.log("Successfully connected to the database");

    await redis.client.connect();
    console.log("Successfully connected to Redis");

    app.listen(port, () => {
      console.log(`Running app in port ${port}...`);
    });
  } catch (error) {
    console.error("Server startup failed", error);
    process.exit(1);
  }
}

start();
