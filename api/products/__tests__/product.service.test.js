import {
    getProductsList,
    getProductById,
    setProduct,
    updateProduct,
    deleteProductById
} from "../services/product.service";
const mockingoose = require('mockingoose');
const Product = require('../model/product.model');
const mockProductsData= [
    {
        _id: "1",
        name: "Phone",
        summary: "Very good phone",
        price: 10000,
    },
    {
        name: "Table",
        summary: "Very good table",
        price: 1000,
    }
];

describe('Product service test',()=>{
    test('Should Get Product List With Correct Parameters',async ()=>{
        mockingoose(Product).toReturn(() => {
            return mockProductsData.length;
        }, 'countDocuments');
        mockingoose(Product).toReturn((query) => {
            expect(query.getQuery()).toStrictEqual({});
            return mockProductsData;
        }, 'find');
        mockingoose(Product).toReturn((query) => {
            expect(query.getQuery()).toStrictEqual({skip:0});
            return mockProductsData;
        }, 'skip');
        mockingoose(Product).toReturn((query) => {
            expect(query.getQuery()).toStrictEqual({limit:1});
            return mockProductsData.slice(0, query.limit);
        }, 'limit');

        const list= await getProductsList({skip:0,limit:1});
        expect(list.limit).toBe(1);
        expect(list.skip).toBe(0);
        expect(list.total).toBe(2);
        expect(list.docs.length).toBe(2);

        const list1= await getProductsList({});
        expect(list1.limit).toBe(undefined);
        expect(list1.skip).toBe(undefined);
        expect(list1.total).toBe(2);
        expect(list1.docs.length).toBe(2);

    });
    test('Should Get Product By Id With Correct Parameters',async ()=>{

        mockingoose(Product).toReturn((query) => {
            expect(query.getQuery()).toStrictEqual({"_id": "1"});
            return mockProductsData[0];
        }, 'findOne');

        const list= await getProductById("1");
        expect(list).not.toBeNull();
        expect(list.name).toBe("Phone");

    });

    test('Should Set Product By Id With Correct Parameters',async ()=>{

        mockingoose(Product).toReturn((body) => {
            expect(body).not.toBeNull();
            return body;
        }, 'save');

        const list= await setProduct(mockProductsData[1]);
        expect(list).not.toBeNull();
    });
    test('Should Update Product By Id With Correct Parameters',async ()=>{

        mockingoose(Product).toReturn((id,body) => {
            expect(id.getQuery()).toStrictEqual({"_id": "1"});
            expect(body).not.toBeNull();
            return body;
        }, 'updateOne');

        const list= await updateProduct("1",mockProductsData[1]);
        expect(list).not.toBeNull();
    });
    test('Should Delete Product By Id ',async ()=>{

        mockingoose(Product).toReturn((query) => {
            expect(query.getQuery()).toStrictEqual({"_id": "1"});
            return {};
        }, 'deleteOne');

        const list= await deleteProductById("1",mockProductsData[1]);
        expect(list).not.toBeNull();
    });

})