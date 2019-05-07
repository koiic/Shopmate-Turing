import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';
import AuthMiddleWare from '../middlewares/AuthMiddleware';
import TokenAuthenticator from '../middlewares/TokenAuthenticator';
// instantiate ProductRoute
const customerRoute = Router();

customerRoute.post('/', AuthMiddleWare.validateSignUpRequest, CustomerController.registerCustomer);
customerRoute.post('/login', AuthMiddleWare.validateLoginRequest, CustomerController.authenticateCustomer);
customerRoute.patch('/address', TokenAuthenticator.verifyToken, CustomerController.updateCustomerInfo);


export default customerRoute;
