import { Worker } from "bullmq";
import { connection } from "../config/queue";
import {
  CART_RESERVATION_QUEUE,
} from "../constants/queues.constants";
import { orderService } from "../container";
import { CartReservationJobData } from "../types/queues.types";

export const cartReservationWorker = new Worker<CartReservationJobData>(
  CART_RESERVATION_QUEUE,
  async (job) => {
    await orderService.freeOrder(job.data.userId);
  },
  { connection }
);

cartReservationWorker.on("completed", (job) => {
  console.log(`Cart reservation job ${job.id} completed`);
});

cartReservationWorker.on("failed", (job, err) => {
  console.log(`Cart reservation job ${job?.id} failed: ${err.message}`);
});
