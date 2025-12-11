import Product from "../models/Product";

export default class ProductService {

    static async getAllWithStock(page, limit, offset): Promise<Product[]> {
        return
    }

    static async getById(id: string) {
        try {
            const product = await Product.findByPk(id);

            if(!product) {
                throw new Error("The product does not exist");
            }
            return product;
        } catch (error) {
            throw error;
        }
        
    }
}