import {getCustomersList} from "../services/customers.service";
const mockingoose = require('mockingoose');
const Model = require('../model/customer.model');
const docs= [
    {
        _id: "60f000ac24545603546efd2f",
        firstName: "Елена",
        lastName: "Леванова",
        email: "ellevanova@yandex.ru",
        phoneNumber: "+79869137028",
        totalPurchasesAmount: 45,
        notes: [],
        addressesList: [],
        __v: 0
    },
    {
        _id: "60f000d224545603546efefb",
        firstName: "Adusrd",
        lastName: "Sokolov",
        email: "sokolov@yandex.ru",
        phoneNumber: "+79869137028",
        totalPurchasesAmount: 789,
        notes: [],
        addressesList: [],
    }
];

describe('User service test',()=>{
    test('Should Get Customer List With Correct Parameters',async ()=>{
        mockingoose(Model).toReturn((query) => {
             return docs.length;
        }, 'countDocuments');
        mockingoose(Model).toReturn((query) => {
            expect(query.getQuery()).toStrictEqual({});//объекты имеют одинаковые типы и структуру
            return docs;
        }, 'find');
        mockingoose(Model).toReturn((query) => {
            expect(query.getQuery()).toStrictEqual({skip:0});
            return docs;
        }, 'skip');
        mockingoose(Model).toReturn((query) => {
            expect(query.getQuery()).toStrictEqual({limit:1});
            return docs.slice(0, query.limit);
        }, 'limit');

        const list= await getCustomersList({skip:0,limit:1});
        expect(list.limit).toBe(1);
        expect(list.skip).toBe(0);
        expect(list.total).toBe(2);
        expect(list.docs.length).toBe(2);

        const list1= await getCustomersList({});
        expect(list1.limit).toBe(undefined);
        expect(list1.skip).toBe(undefined);
        expect(list1.total).toBe(2);
        expect(list1.docs.length).toBe(2);

    })

})