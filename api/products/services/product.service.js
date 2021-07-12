import productModel from '../model/product.model'


/**
 *
 * @param {{search?: string, skip?: number, limit?: number}} params
 */
export function getProductsList(params) {
    return productModel.find({}).exec();
}

export function getProductById(productId) {
     return productModel.find({'_id':productId}).exec();
}
export function deleteProductById(productId) {
    return productModel.deleteOne({'_id':productId}).exec();
}
export async function setProductById(body) {
    const newProduct = new productModel({...body});
    return newProduct.save();
}

export function updateProduct(productId,body) {
    //console.log({...body});
    return productModel.findOneAndUpdate({'_id':productId},{...body},{new:true}).exec();
}