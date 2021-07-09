import express from 'express';
import {getCustomerById, getCustomersList, setCustomer,createCustomer} from "./controllers/customer.controller";
//import organizationsRouter from "../organizations/router";
const router = express.Router();

router.get('/', getCustomersList);

router.get('/:customerId', getCustomerById);
router.use('/get/:customerId', setCustomer);
router.use('/create/:customerId', createCustomer);

export default router;