import { Router } from 'express';
import productRoute from './productRoute';
import customerRoute from './customerRoute';
import socialRoute from './socialRoute';

const indexRoute = Router();

indexRoute.use('/products', productRoute);
indexRoute.use('/customers', customerRoute);
indexRoute.use('/', socialRoute);

export default indexRoute;
