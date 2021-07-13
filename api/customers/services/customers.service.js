import customerModel from '../model/customer.model'


/**
 *
 * @param {{search?: string, skip?: number, limit?: number}} params
 */
export function getCustomersList(params) {
    return customerModel.find({}).exec();
}

export function getCustomerById(userId) {
     return customerModel.find({'_id':userId}).exec();//
}
export function deleteCustomerById(userId) {
    return customerModel.deleteOne({'_id':userId}).exec();
}

export function updateCustomerById(userId,body) {
    console.log({...body});
    //return customerModel.findOneAndUpdate({'_id':userId},{...body},{new:true}).exec();
    return customerModel.updateOne({'_id':userId},{...body},{new:true}).exec();
}

export async function setCustomerById(body) {
        const newCustomer = new customerModel({...body});
        return newCustomer.save();
}