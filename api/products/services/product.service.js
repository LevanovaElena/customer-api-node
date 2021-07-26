import productModel from '../model/product.model'



/**
 *
 * @param {{search?: string, skip?: number, limit?: number}} params
 */
export async function getProductsList(params) {
    const total= await productModel.countDocuments({}).exec();
    const docs= await productModel.find({}).skip(params.skip).limit(params.limit).exec();
    return {total,docs,skip:params.skip,limit:params.limit};
}

export function getProductById(productId) {
     return productModel.findOne({'_id':productId}).exec();
}
export function deleteProductById(productId) {
    return productModel.deleteOne({'_id':productId}).exec();
}
export function setProduct(body) {
    const newProduct = new productModel({...body});
    return newProduct.save();
}

export function updateProduct(productId,body) {
    return productModel.updateOne({'_id':productId},{...body},{new:true}).exec();
}