import express from 'express';
const cors = require('cors');
import {
    getCustomerById,
    getCustomersList,
    createCustomer,
    deleteCustomerById,
    updateCustomer,
    updateCustomerAddAddress,
    updateCustomerAddNote
} from "./controllers/customer.controller";

const router = express.Router();

router.get('/', getCustomersList);

router.get('/:customerId', getCustomerById);
//router.post('/create/:customerId', setCustomer);
router.post('/', createCustomer);
router.delete('/:customerId',cors(), deleteCustomerById);
router.put('/:customerId', updateCustomer);
router.put('/add-address/:customerId', updateCustomerAddAddress);
router.put('/add-note/:customerId', updateCustomerAddNote);

export default router;