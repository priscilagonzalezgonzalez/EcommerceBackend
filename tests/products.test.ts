import ProductService from '../src/services/ProductService'
import db from '../src/config/db'

describe('products-stream', () => {

    beforeAll(async () => {
        await db.authenticate();
    });

    afterAll(async () => {
        await db.close();
    });

    test('getById.name should return Wall Mounted Desk', async () => {
        const id = "10";
        const product = await ProductService.getById(id);
        expect(product.name).toBe("Wall Mounted Desk");
    });

    test('getById should throw error when product does not exist', async () => {
        const id = "19";
        await expect(ProductService.getById(id)).rejects.toThrow("The product does not exist");
    });
    
});