import { Router } from 'express';
import productRoute from './productRoute';
import customerRoute from './customerRoute';
import socialRoute from './socialRoute';
import shoppingCartRoute from './shoppingCartRoute';
import orderRoute from './orderRoute';
import stripeRoute from './stripeRoute';

const indexRoute = Router();

indexRoute.use('/products', productRoute);
indexRoute.use('/customers', customerRoute);
indexRoute.use('/', socialRoute);
indexRoute.use('/shoppingcart', shoppingCartRoute);
indexRoute.use('/orders', orderRoute);
indexRoute.use('/stripe', stripeRoute);

export default indexRoute;
