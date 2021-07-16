import {getCustomersList} from "../controllers/customer.controller";

jest.mock("../services/customers.service.js", () => {
    return {
        getCustomersList: (params) => {return Promise.resolve(params)}
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
        expect(res.json).toBeCalledWith({search: '', skip: 0, limit: 100});
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
        expect(res.json).toBeCalledWith({search: '', skip: 2, limit: 2});
    })
});