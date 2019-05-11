import { Router } from 'express';
import productRoute from './productRoute';
import customerRoute from './customerRoute';
import socialRoute from './socialRoute';
import shoppingCartRoute from './shoppingCartRoute';
import orderRoute from './orderRoute';
import stripeRoute from './stripeRoute';
import taxRoute from './taxRoute';
import departmentRoute from './departmentRoute';
import categoryRoute from './categoryRoute';


const indexRoute = Router();

indexRoute.use('/products', productRoute);
indexRoute.use('/customers', customerRoute);
indexRoute.use('/', socialRoute);
indexRoute.use('/shoppingcart', shoppingCartRoute);
indexRoute.use('/orders', orderRoute);
indexRoute.use('/tax', taxRoute);
indexRoute.use('/stripe', stripeRoute);
indexRoute.use('/departments', departmentRoute);
indexRoute.use('/categories', categoryRoute);

export default indexRoute;
