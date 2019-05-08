import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRoutes = Router();

productRoutes.get('/', ProductController.viewAllProduct);
productRoutes.get('/search', ProductController.searchProduct);
productRoutes.get('/:product_id', ProductController.viewSingleProduct);
productRoutes.get('/inCategory/:category_id', ProductController.viewProductByCategory);
productRoutes.get('/inDepartment/:department_id', ProductController.viewProductByDepartment);

export default productRoutes;
