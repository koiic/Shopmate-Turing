import { Router } from 'express';
import DepartmentController from '../controllers/DepartmentController';

// instantiate taxRoute
const departmentRoute = Router();

departmentRoute.get('/', DepartmentController.fetchAllDepartment);
departmentRoute.get('/:department_id', DepartmentController.fetchSingleDepartment);


export default departmentRoute;
