let listProducts=[
    {
        idProduct:'1',
        name:"Bag",
        summary:"Very fine bag",
        price:45
    },
    {
        idProduct:'2',
        name:"Table",
        summary:"Very fine Table",
        price:455
    }
]

import productModel from '../model/product.model'


/**
 *
 * @param {{search?: string, skip?: number, limit?: number}} params
 */
export function getProductsList(params) {
    return productModel.find({}).exec();
}

export function getProductById(productId) {
     return productModel.find({'idProduct':productId}).exec();
}
export function deleteProductById(productId) {
    return productModel.deleteOne({'idProduct':productId}).exec();
}
export async function setProductById(productId) {

    const productFindExample=listProducts.find(
        (item)=>item.idProduct===productId);//для выборки

    if(productFindExample!==undefined) {

        const number = await productModel.countDocuments();
        productFindExample.idProduct=number+1;
        //должны получить весь объект Customer из post
        const newProduct = new productModel(productFindExample);//пока из тестовых данных
        productFindExample.idProduct=productId;//для выборки
         return newProduct.save();

    }
    return Promise.resolve({error:"Not Found Customer in list example"});
}