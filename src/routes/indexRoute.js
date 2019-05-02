import { Router } from 'express';
import productRoute from './productRoute';

const indexRoute = Router();

indexRoute.use('/products', productRoute);

export default indexRoute;
