import { Request, Response } from "express";
import Order from "../models/Order";
import { OrderService } from "../services/OrderService";
import { CreateOrderPayload } from "../types/order.types";

class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async reserveOrder(req: Request, res: Response) {
    try {
      const { cartBody } = req.body;
      const response = await this.orderService.reserveOrder(cartBody);

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error when reserving the order",
        error: (error as Error).message,
      });
    }
  }

  // Get order by id
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      return res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error when retrieving the order",
        error: (error as Error).message,
      });
    }
  }

  // Create order
  async create(req: Request, res: Response) {
    try {
      const body = req.validated?.body;

      if (!body) {
        return res.status(500).json("Missing body context");
      }

      const response = await this.orderService.createOrder(
        body as CreateOrderPayload,
      );

      return res.status(201).json({
        success: true,
        data: {
          order: response.order,
          orderProducts: response.orderProductsResult
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error when creating the order",
        error: (error as Error).message,
      });
    }
  }
}

export default OrderController;
