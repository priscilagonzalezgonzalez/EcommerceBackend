import { eventEmitter } from "../events/eventBus";

export const ProductsStreamController = (req, res) => {
  console.log("🔥 SSE HANDLER ATTACHED");

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const onUpdate = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  eventEmitter.on("productUpdated", onUpdate);

  req.on("close", () => {
    eventEmitter.removeListener("productUpdated", onUpdate);
  });
};
