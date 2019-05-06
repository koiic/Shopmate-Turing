import { Router } from 'express';
import productRoute from './productRoute';
import customerRoute from './customerRoute';

const indexRoute = Router();

indexRoute.use('/products', productRoute);
indexRoute.use('/customers', customerRoute);

export default indexRoute;
