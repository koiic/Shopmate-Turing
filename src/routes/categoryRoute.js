import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const categoryRoute = Router();

categoryRoute.get('/', CategoryController.fetchAllCategories);
categoryRoute.get('/:category_id', CategoryController.fetchSingleCategory);

export default categoryRoute;
