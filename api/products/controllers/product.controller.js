import * as productService from '../services/product.service';

export function getProductList(req, res, next) {
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
    return productService.getProductsList(params).then(result => {
        res.json(result);
    }).catch(next);
}

export function getProductById (req, res, next) {
    const {productId} = req.params;
    return productService.getProductById(productId).then(result => {
        res.json(result);
    }).catch(next);
}

export function createProduct (req, res, next) {
    const {productId} = req.params;
    return productService.setProductById(req.body).then(result => {
        res.json(result);

    }).catch(next);
}
export function updateProduct (req, res, next) {
    const {productId} = req.params;
    return productService.updateProduct(productId,req.body).then(result => {
        res.json(result);

    }).catch(next);
}

export function deleteProductById (req, res,next) {
    const {productId} = req.params;
    return productService.deleteProductById(productId).then(result => {
        res.json(result);

    }).catch(next);
}