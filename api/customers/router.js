import express from 'express';
import {getCustomerById, getCustomersList, createCustomer,deleteCustomerById} from "./controllers/customer.controller";

//import organizationsRouter from "../organizations/router";
const router = express.Router();

router.get('/', getCustomersList);

router.get('/:customerId', getCustomerById);
//router.post('/create/:customerId', setCustomer);
router.post('/create/:customerId', createCustomer);
router.use('/delete/:customerId', deleteCustomerById);

export default router;