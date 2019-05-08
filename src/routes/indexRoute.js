import { Router } from 'express';
import productRoute from './productRoute';
import customerRoute from './customerRoute';
import socialRoute from './socialRoute';
import shoppingCartRoute from './shoppingCartRoute';

const indexRoute = Router();

indexRoute.use('/products', productRoute);
indexRoute.use('/customers', customerRoute);
indexRoute.use('/', socialRoute);
indexRoute.use('/shoppingcart', shoppingCartRoute);

export default indexRoute;
