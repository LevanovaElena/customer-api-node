import {
  getCustomersList,
  getCustomerById,
} from "../controllers/customer.controller";
import { NotFoundError } from "../../core/error/notFoundError";

jest.mock("../services/customers.service.js", () => {
  return {
    getCustomersList: (params) => {
      switch (params.limit) {
        case 0:
          return Promise.resolve({ total: 0, docs: [], ...params });
        case 2:
          return Promise.resolve({ total: 2, docs: [{}, {}], ...params });
        case 100:
          return Promise.resolve({ total: 2, docs: [{}, {}], ...params });
      }
    },
    getCustomerById: (userId) => {
      switch (userId) {
        case "100":
          return Promise.resolve(null);
        case "1":
          return Promise.resolve({ _id: "1" });
        default:
          return Promise.reject(new Error("Error from getCustomerById"));
      }
    },
  };
});

describe("Customer Controller Test", () => {
  test("Get Customer List should get correct default parameters", async () => {
    const req = {
      //проверка на дефолтные значения
      query: {},
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();
    await getCustomersList(req, res, next);
    expect(res.json).toBeCalledWith({
      search: "",
      skip: 0,
      limit: 100,
      total: 2,
      docs: [{}, {}],
    });
  });
  test("Get Customer List should get correct  parameters from query", async () => {
    const req = {
      query: { search: "", skip: 2, limit: 2 },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();
    await getCustomersList(req, res, next);
    expect(res.json).toBeCalledWith({
      search: "",
      skip: 2,
      limit: 2,
      total: 2,
      docs: [{}, {}],
    });
  });
  test("Get Customer List should return error ,when not customers", async () => {
    const req = {
      query: { search: "", skip: 2, limit: 0 },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();
    await getCustomersList(req, res, next);
    expect(next).toBeCalledWith(new NotFoundError("Not found error"));
  });

  test("Get Customer By Id should get correct Id", async () => {
    const req = {
      params: { customerId: "1" },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();
    await getCustomerById(req, res, next);
    expect(res.json).toBeCalledWith({ _id: "1" });
  });

  test("Get Customer By Id should return error NotFound", async () => {
    const req = {
      params: { customerId: "100" },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();
    await getCustomerById(req, res, next);
    expect(next).toBeCalledWith(new NotFoundError("Not found error"));
  });
});
