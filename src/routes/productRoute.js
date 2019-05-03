import { Router } from 'express';
import ProductController from '../controllers/ProductController';
// import Validator from '../middlewares/validator';
// instantiate ProductRoute
const productRoutes = Router();

productRoutes.get('/', ProductController.viewAllProduct);
productRoutes.get('/:product_id', ProductController.viewSingleProduct);

export default productRoutes;
