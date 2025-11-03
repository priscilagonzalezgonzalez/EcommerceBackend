import sequelize from '../config/db'
import { Request, Response } from 'express';
import Order from '../models/Order';
// import { OrderItemsInterface } from '../interfaces/orderItems.interface';
import OrderProduct from '../models/OrderProduct';

class OrderController {

    // Get order by id
    static async getById( req: Request, res: Response ) {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id);

            return res.status(200).json({
                success: true, 
                data: order
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error when retrieving the order', 
                error: (error as Error).message
            });
        }
    }

    // Create order
    static async create(req: Request, res: Response) {
        const t = await sequelize.transaction();
        try {
            // Pass the data to create the Order and an array of OrderProduct
            //const { status, total, customerName, country, street, city, zipCode, phone, email, orderProducts } = req.body;
            const { status, total, shippingDetails, orderProducts } = req.body;
            const { customerName, country, street, city, zipCode, phone, email } = shippingDetails;
            
            // Create the order
            const order = await Order.create({
                status, total, customerName, country, street, city, zipCode, phone, email
            }, 
            { transaction: t })

            console.log(order);

            // Create order products.
            for (const orderProduct of orderProducts) {
                await OrderProduct.create({
                    orderId: order.id,
                    productId: orderProduct.productId,
                    quantity: orderProduct.quantity // TODO: Modify the stock of the product
                },
                { transaction: t });
            }

            // Commit the transaction
            await t.commit();

            return res.status(201).json({
                success: true, 
                data: {
                    order: order,
                    orderProducts: orderProducts,
                }
            })

        } catch (error) {
            // Rollback the transaction
            await t.rollback();
            return res.status(500).json({
                success: false,
                message: 'Error when creating the order', 
                error: (error as Error).message
            });
        }
    }

}

export default OrderController;