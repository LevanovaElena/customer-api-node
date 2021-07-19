import {getCustomersList,getCustomerById} from "../controllers/customer.controller";
import {NotFoundError} from "../../core/error/notFoundError";


jest.mock("../services/customers.service.js", () => {
    return {
        getCustomersList: (params) => {
            switch (params.limit){
                case 0:return Promise.resolve({total:0,docs:[],...params});
                case 2:return Promise.resolve({total:2,docs:[{},{}],...params});
            }
        },
        getCustomerById:(id) => {return Promise.resolve({_id:'1'})}
    }
})


describe("Customer Controller Test", () => {
    test('Get Customer List should get correct default parameters',  async () => {
        const req={   //проверка на дефолтные значения
            query:{}
        };
        const res={
            json:jest.fn()
        };
        const next=jest.fn();
        await getCustomersList(req,res,next);
        expect(res.json).toBeCalledWith({search: '', skip: 0, limit: 100,total:1,docs:[{},{}]});
    })
    test('Get Customer List should get correct  parameters from query',  async () => {
        const req={   //проверка на дефолтные значения
            query:{search:'',skip:2,limit:2}
        };
        const res={
            json:jest.fn()
        };
        const next=jest.fn();
        await getCustomersList(req,res,next);
        expect(res.json).toBeCalledWith({search: '', skip: 2, limit: 2,total:2,docs:[{},{}]});

    })
    test('Get Customer List should return error ,when not customers',  async () => {

        const req={   //проверка на дефолтные значения
            query:{search:'',skip:2,limit:0}
        };
        const res={
            json:jest.fn()
        };
        const next=jest.fn();
        await getCustomersList(req,res,next);
        expect(next).toBeCalledWith(new NotFoundError("Not found error"));
    })

    test('Get Customer By Id should get correct Id',  async () => {
        const req={
            params:"1"
        };

        const res={
            json:jest.fn()
        };
        const next=jest.fn();
        await getCustomerById(req,res,next);
        expect(res.json).toBeCalledWith({_id:'1'});
    })

    test('Get Customer By Id should return error NotFound',  async () => {
        return {
            getCustomerById:(id) => {return Promise.resolve(null)}
        }
        const req={
            params:""
        };

        const res={
            json:jest.fn()
        };
        const next=jest.fn();
        await getCustomerById(req,res,next);
        expect(res.json).toBeCalledWith(new NotFoundError("Not found error"));
    })

});