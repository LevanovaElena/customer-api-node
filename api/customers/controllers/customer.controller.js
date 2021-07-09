import * as customerService from '../services/customers.service';

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
        res.json(result);
    }).catch(next);
}

export function setCustomer (req, res, next) {
    const {customerId} = req.params;
    return customerService.getCustomerById(customerId).then(user => {
        res.json(user);
        //return next();
    }).catch(next);
}
export function createCustomer (req, res, next) {
    const {customerId} = req.params;
    return customerService.setCustomerById(customerId).then(user => {
        res.json(user);
        //return next();
    }).catch(next);
}