let listCustomers=[
    {
        idCustomer:'1',
        firstName:"Ivan",
        lastName:"Ivanov",
        phoneNumber:"+7345663523",
        email:"ivan@gmail.com",
        totalPurchasesAmount:12,
        notes:[
                {
                    idNote:1,
                    note:"note1"
                },
                {
                    idNote:2,
                    note:"note2"
                },
                {
                    idNote:3,
                    note:"note3"
                }
            ],
        addressesList:[
            {
                idAddress:1,
                addressLine:"Address1",
                addressLine2:"Address2",
                typeAddress:"Billing",
                city:"City",
                postalCode:"123456",
                state:"State",
                country:"Canada"
            },
            {
                idAddress:2,
                addressLine:"Address21",
                addressLine2:"Address22",
                typeAddress:"Billing",
                city:"City2",
                postalCode:"123456",
                state:"State2",
                country:"Canada"
            }
        ]
    },
    {
        idCustomer:'2',
        firstName:"Ivanka",
        lastName:"Ivanova",
        phoneNumber:"+7345622223",
        email:"ivanka@gmail.com",
        totalPurchasesAmount:12,
        notes:[
            {
                idNote:1,
                note:"noteIvanka1"
            },
            {
                idNote:2,
                note:"noteIvanka2"
            },
            {
                idNote:3,
                note:"noteIvanka3"
            }
        ],
        addressesList:[
            {
                idAddress:1,
                addressLine:"Address1",
                addressLine2:"Address2",
                typeAddress:"Billing",
                city:"City",
                postalCode:"123456",
                state:"State",
                country:"Canada"
            },
            {
                idAddress:2,
                addressLine:"Address21",
                addressLine2:"Address22",
                typeAddress:"Billing",
                city:"City2",
                postalCode:"123456",
                state:"State2",
                country:"Canada"
            }
        ]
    }
]
const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:customerp@s$w0rd@cluster0.n579g.mongodb.net/CustomerDB";
import customerModel from '../model/customer.model'
const autoIncrement = require('mongoose-auto-increment');

/**
 *
 * @param {{search?: string, skip?: number, limit?: number}} params
 */
export function getCustomersList(params) {
    return customerModel.find({}).exec();
}

export function getCustomerById(userId) {
     return customerModel.find({'idCustomer':userId}).exec();
}
export function deleteCustomerById(userId) {
    return customerModel.deleteOne({'idCustomer':userId}).exec();
}
export async function setCustomerById(userId) {

    const customerId=listCustomers.find((item)=>item.idCustomer===userId);//для выборки

    if(customerId!==undefined) {

        const number = await customerModel.countDocuments();
        customerId.idCustomer=number+1;
        //должны получить весь объект Customer из post
        const newCustomer = new customerModel(customerId);//пока из тестовых данных
        customerId.idCustomer=userId;//для выборки
         return newCustomer.save();

    }
    return Promise.resolve({error:"Not Found Customer in list example"});
}