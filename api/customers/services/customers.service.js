import CustomerModel from "../model/customer.model";

/**
 *
 * @param {{search?: string, skip?: number, limit?: number}} params
 */
export async function getCustomersList(params) {
  const total = await CustomerModel.countDocuments({}).exec();
  const docs = await CustomerModel.find({})
    .skip(params.skip)
    .limit(params.limit)
    .exec();
  return { total, docs, skip: params.skip, limit: params.limit };
}

/**
 *
 * @param userId
 * @returns {Promise<Document<any, any, unknown> | null>}
 */

export function getCustomerById(userId) {
  return CustomerModel.findOne({ _id: userId }).exec(); //
}
export function deleteCustomerById(userId) {
  return CustomerModel.deleteOne({ _id: userId }).exec();
}

export function updateCustomerById(userId, body) {
  //console.log({...body});
  return CustomerModel.updateOne(
    { _id: userId },
    { ...body },
    { runValidators: true }
  ).exec();
}

export function setCustomer(body) {
  const newCustomer = new CustomerModel({ ...body });
  return newCustomer.save();
}

/*export function addAddress(userId, body) {
  return CustomerModel.updateOne(
    { _id: userId },
    { $push: { addressesList: { ...body } } }
  );
}
export function addNote(userId, body) {
  return CustomerModel.updateOne(
    { _id: userId },
    { $push: { notes: { ...body } } }
  );
}*/
