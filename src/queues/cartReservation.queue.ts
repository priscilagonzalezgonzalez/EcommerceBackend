import { Queue } from "bullmq";
import { connection } from "../config/queue";
import {
  CART_RESERVATION_QUEUE,
} from "../constants/queues.constants";
import { CartReservationJobData } from "../types/queues.types";

export const cartReservationQueue = new Queue<CartReservationJobData>(
  CART_RESERVATION_QUEUE,
  { connection }
);
