import { Router } from 'express';
import TaxController from '../controllers/TaxController';

// instantiate taxRoute
const taxRoute = Router();

taxRoute.get('/', TaxController.getAllTax);
taxRoute.get('/:tax_id', TaxController.fetchSingleTax);


export default taxRoute;
