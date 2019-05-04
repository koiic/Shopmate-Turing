import { Router } from 'express';
import ProductController from '../controllers/ProductController';
// import Validator from '../middlewares/validator';
// instantiate ProductRoute
const productRoutes = Router();

productRoutes.get('/', ProductController.viewAllProduct);
productRoutes.get('/:product_id', ProductController.viewSingleProduct);
productRoutes.get('/inCategory/:category_id', ProductController.viewProductByCategory);

export default productRoutes;
