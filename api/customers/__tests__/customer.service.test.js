import {
  getCustomerById,
  getCustomersList,
  deleteCustomerById,
  updateCustomerById,
  setCustomer,
} from "../services/customers.service";

const mockingoose = require("mockingoose");
const Model = require("../model/customer.model");
const docs = [
  {
    _id: "60f000ac24545603546efd2f",
    firstName: "Елена",
    lastName: "Леванова",
    email: "ellevanova@yandex.ru",
    phoneNumber: "+79869137028",
    totalPurchasesAmount: 45,
    notes: [],
    addressesList: [],
    __v: 0,
  },
  {
    firstName: "Ivan",
    lastName: "Ivanov",
    phoneNumber: "+73456635231",
    email: "ivan@gmail.com",
    totalPurchasesAmount: 12,
    notes: [{ note: "note1" }, { note: "note2" }, { note: "note3" }],
    addressesList: [
      {
        addressLine: "Address1",
        addressLine2: "Address2",
        typeAddress: "Billing",
        city: "City",
        postalCode: "123456",
        state: "State",
        country: "Canada",
      },
      {
        addressLine: "Address21",
        addressLine2: "Address22",
        typeAddress: "Billing",
        city: "City2",
        postalCode: "123456",
        state: "State2",
        country: "Canada",
      },
    ],
  },
];

describe("User service test", () => {
  test("Should Get Customer List With Correct Parameters", async () => {
    mockingoose(Model).toReturn(() => {
      return docs.length;
    }, "countDocuments");
    mockingoose(Model).toReturn((query) => {
      expect(query.getQuery()).toStrictEqual({}); //объекты имеют одинаковые типы и структуру
      return docs;
    }, "find");
    mockingoose(Model).toReturn((query) => {
      expect(query.getQuery()).toStrictEqual({ skip: 0 });
      return docs;
    }, "skip");
    mockingoose(Model).toReturn((query) => {
      expect(query.getQuery()).toStrictEqual({ limit: 1 });
      return docs.slice(0, query.limit);
    }, "limit");

    const list = await getCustomersList({ skip: 0, limit: 1 });
    expect(list.limit).toBe(1);
    expect(list.skip).toBe(0);
    expect(list.total).toBe(2);
    expect(list.docs.length).toBe(2);

    const list1 = await getCustomersList({});
    expect(list1.limit).toBe(undefined);
    expect(list1.skip).toBe(undefined);
    expect(list1.total).toBe(2);
    expect(list1.docs.length).toBe(2);
  });
  test("Should Get Customer List By Id With Correct Parameters", async () => {
    mockingoose(Model).toReturn((query) => {
      expect(query.getQuery()).toStrictEqual({ _id: "1" });
      return docs[0];
    }, "findOne");

    const list = await getCustomerById("1");
    expect(list).not.toBeNull();
  });

  test("Should Delete Customer By Id", async () => {
    mockingoose(Model).toReturn((query) => {
      expect(query.getQuery()).toStrictEqual({ _id: "1" });
      return {};
    }, "deleteOne");

    const list = await deleteCustomerById("1");
    expect(list).not.toBeNull();
  });

  test("Should Update Customer By Id", async () => {
    mockingoose(Model).toReturn((query) => {
      expect(query.getQuery()).toStrictEqual({ _id: "1" });
      return docs[1];
    }, "updateOne");

    const list = await updateCustomerById("1", docs[1]);
    expect(list).not.toBeNull();
  });

  test("Should Create Customer correct body", async () => {
    mockingoose(Model).toReturn((query) => {
      expect(query).not.toBeNull();
      return docs[1];
    }, "save");

    const list = await setCustomer(docs[1]);
    expect(list).not.toBeNull();
  });
});
