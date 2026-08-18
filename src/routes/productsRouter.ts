import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { validateSchema } from '../middlewares/common/validateSchema';
import { productIdParamsSchema, updateProductPayloadSchema } from '../schemas/product.schema';

const router = Router();

router.get('/',
  ProductController.getAll
);

router.get('/:id', 
  validateSchema(productIdParamsSchema, "params"),
  ProductController.getById
);

router.put('/:id', 
  validateSchema(productIdParamsSchema, "params"),
  validateSchema(updateProductPayloadSchema, "body"),
  ProductController.update
);

router.post('/', 
  ProductController.create
);

router.delete('/:id', 
  validateSchema(productIdParamsSchema, "params"),
  ProductController.delete
);

export default router;
