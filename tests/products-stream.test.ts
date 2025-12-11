import db from '../src/config/db'
import app from '../src/server'
import Product from '../src/models/Product';
import {EventSource} from 'eventsource'; 

const port = process.env.PORT || 4000

describe('products-stream', () => {
    let server;

    beforeAll(async() => {
        await db.authenticate();
        await new Promise<void>((resolve) => {
            server = app.listen(port, () => {
                resolve();
            });
        });
    });

    afterAll(async () => {
        if (server) {
            await new Promise<void>((resolve) => {
                server.close(() => {
                    resolve();
                });
            });
        }
        await db.close();
    });

    test('Sent SSE event to client', async () => {
        // Open SSE connection
        const sseUrl = 'http://localhost:4000/api/v1/products-stream/';

        // Product data
        const productId = 17;
        const expectedName = 'Rattan Outdoor';

        const messageReceived = new Promise<Product>((resolve, reject) => {
            const eventSource = new EventSource(sseUrl);

            eventSource.onopen = () => {
                console.log('SSE connection opened');
            };

            const timeout = setTimeout(() => {
                eventSource.close();
                reject(new Error('Timeout: No se recibió el mensaje SSE'));
            }, 10000);

            // Test message received
            eventSource.onmessage = (event) => {
                try {
                    const data: Product = JSON.parse(event.data);
                    eventSource.close();
                    resolve(data);
                } catch (error) {
                    reject(error);
                }                
            }
            eventSource.onerror = (error) => {
                clearTimeout(timeout);
                eventSource.close();
                reject(error);
            };
        });

        await new Promise(resolve => setTimeout(resolve, 900));

        // Update product
        const updatePromise = ( async () => {
            const updatedProduct: Product|null = await Product.findByPk(productId);
            if(!updatedProduct) {
                throw new Error('Product does not exist');
            }
            updatedProduct.stock = 10;
            await updatedProduct.save();
        })();

        const [receivedData] = await Promise.all([
            messageReceived,
            updatePromise
        ]);

        expect(receivedData).toBeDefined();
        expect(receivedData.id).toBe(productId);
        expect(receivedData.name).toBe(expectedName);
    }, 10000)

    
    
});