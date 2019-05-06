import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';
import AuthMiddleWare from '../middlewares/AuthMiddleware';
// instantiate ProductRoute
const customerRoute = Router();

customerRoute.post('/', AuthMiddleWare.validateSignUpRequest, CustomerController.registerCustomer);
customerRoute.post('/login', AuthMiddleWare.validateLoginRequest, CustomerController.authenticateCustomer);


export default customerRoute;
