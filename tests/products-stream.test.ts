import db from '../src/config/db'
import app from '../src/server'
import Product from '../src/models/Product';
import request from 'supertest';
import http from 'http';

describe('products-stream', () => {
    let server: http.Server;

    beforeAll(async () => {
        await db.authenticate();
        // Create HTTP Server
        server = http.createServer(app);
        await new Promise<void>((resolve) => {
            server.listen(0, () => {
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
        const productId = 17;
        const expectedName = 'Rattan Outdoor';

        // Promise para recibir el mensaje SSE usando http nativo
        const messageReceived = new Promise<Product>((resolve, reject) => {
            const timeout = setTimeout(() => {
                req.destroy();
                reject(new Error('Timeout: No se recibió el mensaje SSE'));
            }, 10000);

            let buffer = '';
            const port = (server.address() as any)?.port;

            // Make the HTTP Request
            const req = http.request({
                hostname: 'localhost',
                port: port,
                path: '/api/v1/products-stream',
                method: 'GET',
                headers: {
                    'Accept': 'text/event-stream'
                }
            }, (res) => {
                //  Test response Headers
                expect(res.statusCode).toBe(200);
                expect(res.headers['content-type']).toContain('text/event-stream');
                
                res.on('data', (chunk: Buffer) => {
                    buffer += chunk.toString();
                    
                    // Parse SSE message (format: "data: {...}\n\n")
                    const messages = buffer.split('\n\n');
                    buffer = messages.pop() || ''; // Mantener el último fragmento incompleto
                    
                    for (const message of messages) {
                        if (message.trim()) {
                            const lines = message.split('\n');
                            for (const line of lines) {
                                if (line.startsWith('data: ')) {
                                    try {
                                        const data: Product = JSON.parse(line.substring(6));
                                        clearTimeout(timeout);
                                        req.destroy();
                                        resolve(data);
                                        return;
                                    } catch (error) {
                                        // Continue
                                    }
                                }
                            }
                        }
                    }
                });

                res.on('error', (error: Error) => {
                    clearTimeout(timeout);
                    req.destroy();
                    reject(error);
                });
            });

            req.on('error', (error: Error) => {
                clearTimeout(timeout);
                reject(error);
            });

            req.end();

            // Wait for the server connection to be stablished, then update the product
            setTimeout(async () => {
                try {
                    const updatedProduct: Product | null = await Product.findByPk(productId);
                    if (!updatedProduct) {
                        clearTimeout(timeout);
                        req.destroy();
                        reject(new Error('Product does not exist'));
                        return;
                    }
                    // Trigger the AfterUpdate Hook
                    updatedProduct.stock = updatedProduct.stock + 1;
                    console.log(`Updating product ${productId}: stock -> ${updatedProduct.stock}`);
                    await updatedProduct.save();
                    console.log('Product saved, event should be emitted');
                } catch (error) {
                    clearTimeout(timeout);
                    req.destroy();
                    reject(error);
                }
            }, 500);
        });

        // Test the expected data againts the one received 
        const receivedData = await messageReceived;

        expect(receivedData).toBeDefined();
        expect(receivedData.id).toBe(productId);
        expect(receivedData.name).toBe(expectedName);
    }, 15000);

    
    
});