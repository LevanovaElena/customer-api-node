import * as customerService from '../services/customers.service';
import {NotFoundError} from "../../core/error/notFoundError";


export function getCustomersList(req, res, next) {
    const {
        search = '',
        skip = '0',
        limit = '100'
    } = req.query;
    const params = {
        search,
        skip: parseInt(skip, 10),
        limit: parseInt(limit, 10)
    }
    return customerService.getCustomersList(params).then(result => {
        res.json(result);
    }).catch(next);
}

export function getCustomerById (req, res, next) {
    const {customerId} = req.params;
    return customerService.getCustomerById(customerId).then(result => {
        if(result!==null){
           return  res.json(result);
        }
        throw NotFoundError("Not found error");
    }).catch(next);
}

export function createCustomer (req, res, next) {
    return customerService.setCustomerById(req.body).then(result => {
        res.json(result);
    }).catch(next);

}
export function updateCustomer (req, res, next) {
    const {customerId} = req.params;
    return customerService.updateCustomerById(customerId,req.body).then(result => {
        res.json(result);
    }).catch(next);
}
export function updateCustomerAddAddress (req, res, next) {
    const {customerId} = req.params;
    return customerService.addAddress(customerId,req.body).then(result => {
        res.json(result);
    }).catch(next);
}
export function updateCustomerAddNote (req, res, next) {
    const {customerId} = req.params;
    return customerService.addNote(customerId,req.body).then(result => {
        res.json(result);
    }).catch(next);
}


export function deleteCustomerById (req, res,next) {
    const {customerId} = req.params;
    return customerService.deleteCustomerById(customerId).then(result => {
        res.json(result);
    }).catch(next);
}