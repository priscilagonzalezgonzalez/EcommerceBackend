import Product from "../models/Product";
import { Request, Response } from 'express';
import ProductInterface from '../interfaces/product.interface';

class ProductController {

    // List all products with pagination
    static async getAll( req: Request, res: Response ) {
        try {
            // Get pagination parameters from query string (default: page 1, limit 10)
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || page*8;
            const offset = 0;

            // Get products with pagination
            const { count, rows: products } = await Product.findAndCountAll({
                limit,
                offset,
                order: [['id', 'ASC']]
            });

            // Calculate total pages
            const totalPages = Math.ceil(count / limit);

            return res.status(200).json({
                success: true,
                data: products,
                //Optional
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems: count,
                    itemsPerPage: limit
                }
            });
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: 'Error when retrieving all products', 
                error: (error as Error).message
            });
        }
    }

    // Get one product by id
    static async getById( req: Request, res: Response ) {
        try {
            const { id } = req.params;
            const product: ProductInterface = await Product.findByPk(id);

            return res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error when retrieving the product', 
                error: (error as Error).message
            })
        }
    }

    // Add a new product
    static async create( req: Request, res: Response ) {
        
        try {
            const productData: Partial<ProductInterface> = req.body;
            const { name, description='', image, price, active, stock } = productData;
            const product: ProductInterface = await Product.create({
                name, description, image, price, active, stock
            })

            return res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error when adding a new product', 
                error: (error as Error).message
            });
        }
        
    }

    // Update existing product
    static async update( req: Request, res: Response ) {
        try {
            const productData: Partial<ProductInterface> = req.body;
            const { id } = req.params;
            const { name, description='', image, price, active, stock } = productData;

            // Modify given a product id
            const product = await Product.findByPk(id);
            
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            
            // Modify all posible attributes
            if(name !== undefined) product.name = name;
            if(description !== undefined) product.description = description;
            if(image !== undefined) product.image = image;
            if(price !== undefined) product.price = price;
            if(active !== undefined) product.active = active;
            if(stock !== undefined) product.stock = stock;

            await product.save();
            
            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: product
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error when updating the product', 
                error: (error as Error).message
            });
        }
    }

    // Delete a product by id
    static async delete(req: Request, res: Response) {
        try {
            const id = req.params.id
            const product = await Product.findByPk(id);
            product.destroy();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error when deleting the product', 
                error: (error as Error).message
            });
        }
    }

}

export default ProductController;