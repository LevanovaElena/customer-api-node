import express from 'express';
import {getCustomerById, getCustomersList, createCustomer,deleteCustomerById,updateCustomer} from "./controllers/customer.controller";

const router = express.Router();

router.get('/', getCustomersList);

router.get('/:customerId', getCustomerById);
//router.post('/create/:customerId', setCustomer);
router.post('/', createCustomer);
router.delete('/:customerId', deleteCustomerById);
router.put('/:customerId', updateCustomer);

export default router;