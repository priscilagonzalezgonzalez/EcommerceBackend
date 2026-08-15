import { Request, Response } from 'express';
import { eventEmitter } from "../events/eventBus";
import Product from '../models/Product';

export const ProductsStreamController = (req: Request, res: Response) => {
  console.log("🔥 SSE HANDLER ATTACHED");

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const onUpdate = (data: Product) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    console.log(data);
  };

  eventEmitter.on("productUpdated", onUpdate);

  req.on("close", () => {
    eventEmitter.removeListener("productUpdated", onUpdate);
  });
};
