import CustomerModel from '../model/customer.model'

/**
 *
 * @param {{search?: string, skip?: number, limit?: number}} params
 */
export function getCustomersList(params) {
    return CustomerModel.find({}).exec();
}

export function getCustomerById(userId) {
     return CustomerModel.findOne({'_id':userId}).exec();//
}
export function deleteCustomerById(userId) {
    return CustomerModel.deleteOne({'_id':userId}).exec();
}

export function updateCustomerById(userId,body) {
    console.log({...body});
    //return customerModel.findOneAndUpdate({'_id':userId},{...body},{new:true}).exec();
    return CustomerModel.updateOne({'_id':userId},{...body}, { runValidators: true }).exec();
}

export function setCustomerById(body) {
        const newCustomer = new CustomerModel({...body});
        return newCustomer.save( );
}

//db.getCollection('customers').updateOne({"_id":ObjectId("60ec89703858aa168043cb55")},{$push:{"addressesList":{"addressLine":"address new"}}})
export function addAddress(userId,body){
    return CustomerModel.updateOne({'_id':userId},{$push:{"addressesList":{...body}}})
}
export function addNote(userId,body){
    return CustomerModel.updateOne({'_id':userId},{$push:{"notes":{...body}}})
}