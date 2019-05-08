import { Router } from 'express';
import ShoppingCartController from '../controllers/ShoppingCartController';

const shoppingCartRoute = Router();

shoppingCartRoute.get('/generatecartid', ShoppingCartController.generateCartId);
// shoppingCartRoute.post('/add', ShoppingCartController.addToCart);
// shoppingCartRoute.get('/:cart_id', ShoppingCartController.viewCartsProduct);
// shoppingCartRoute.delete('/empty/:cart_id', ShoppingCartController.emptyCart);


export default shoppingCartRoute;
