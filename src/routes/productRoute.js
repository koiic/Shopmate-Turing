import { Router } from 'express';
import ProductController from '../controllers/ProductController';

// instantiate ProductRoute
const productRoutes = Router();

productRoutes.get('/', ProductController.viewAllProduct);

export default productRoutes;
