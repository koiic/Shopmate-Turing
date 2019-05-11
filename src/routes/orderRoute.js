import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import TokenAuthenticator from '../middlewares/TokenAuthenticator';
// instantiate ProductRoute
const orderRoute = Router();

orderRoute.post('/', TokenAuthenticator.verifyToken, OrderController.createOrder);
orderRoute.get('/shortDetail/:order_id', TokenAuthenticator.verifyToken, OrderController.getOrderDetails);


export default orderRoute;
