import { Router } from "express";
import OrderController from "../controllers/OrderController";
import { validateSchema } from "../middlewares/common/validateSchema";
import { createOrderSchema, orderIdParamsSchema } from "../schemas/order.schema";
import { orderService } from "../container";

const router = Router();
const orderController = new OrderController(orderService);

router.get(
  "/:id",
  validateSchema(orderIdParamsSchema, "params"),
  orderController.getById.bind(orderController),
);

router.post(
  "/",
  validateSchema(createOrderSchema, "body"),
  orderController.create.bind(orderController),
);

export default router;
