import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';
import AuthMiddleWare from '../middlewares/AuthMiddleware';
// instantiate ProductRoute
const customerRoute = Router();

customerRoute.post('/', AuthMiddleWare.validateSignUpRequest, CustomerController.registerCustomer);

export default customerRoute;
