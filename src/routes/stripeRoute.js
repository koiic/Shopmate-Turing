import express from 'express';
import StripeController from '../controllers/StripeController';
import TokenAuthenticator from '../middlewares/TokenAuthenticator';


const stripeRoute = express.Router();
stripeRoute.post('/charge', TokenAuthenticator.verifyToken, StripeController.stripePayment);
stripeRoute.post('/token', TokenAuthenticator.verifyToken, StripeController.generateStripeToken);


export default stripeRoute;
