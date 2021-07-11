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

export function createCustomer (req, res, next) {
    const {customerId} = req.params;
    return customerService.setCustomerById(customerId).then(result => {
        res.json(result);

    }).catch(next);
}
export function updateCustomer (req, res, next) {
    const {customerId} = req.params;
    const changeCustomer={
        idCustomer:customerId,
        firstName:req.header('firstName'),
        lastName:req.body.lastName,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email,
        totalPurchasesAmount:req.body.totalPurchasesAmount,
        notes:req.body.notes,
        addressesList:req.body.addressesList
    }
    console.log(req.body);
    console.log(req.header('firstName'));
    return customerService.updateCustomerById(customerId,changeCustomer).then(result => {
        res.json(result);

    }).catch(next);
}

export function deleteCustomerById (req, res,next) {
    const {customerId} = req.params;
    return customerService.deleteCustomerById(customerId).then(result => {
        res.json(result);

    }).catch(next);
}