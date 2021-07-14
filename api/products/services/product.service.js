import productModel from '../model/product.model'


/**
 *
 * @param {{search?: string, skip?: number, limit?: number}} params
 */
export function getProductsList(params) {
    return productModel.find({}).exec();
}

export function getProductById(productId) {
     return productModel.findOne({'_id':productId}).exec();
}
export function deleteProductById(productId) {
    return productModel.deleteOne({'_id':productId}).exec();
}
export function setProductById(body) {
    const newProduct = new productModel({...body});
    return newProduct.save();
}

export function updateProduct(productId,body) {
    return productModel.updateOne({'_id':productId},{...body},{new:true}).exec();
}