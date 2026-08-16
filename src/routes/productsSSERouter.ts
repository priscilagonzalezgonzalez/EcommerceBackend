import { Router } from "express";
import { ProductsStreamController } from "../controllers/ProductStreamController";

const router = Router();

router.get("/", 
    ProductsStreamController
);

export default router;