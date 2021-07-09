import {Schema} from "mongoose";

let listCustomers=[
    {
        idCustomer:'1',
        firstName:"Ivan",
        lastName:"Ivanov",
        phoneNumber:"+7345663523",
        email:"ivan@gmail.com",
        totalPurchasesAmount:12,
        notes:["note1","note2","note3"],
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
        notes:["note1","note2","note3"],
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

/**
 *
 * @param {{search?: string, skip?: number, limit?: number}} params
 */
export function getCustomersList(params) {
/*    mongoose.connect(uri , {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));*/

    return customerModel.find({}).exec();
}

export function getCustomerById(userId) {
    mongoose.connect(uri , {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    return Promise.resolve( customerModel.find({'idCustomer':userId},(err,list) => {
        if (err) return console.log(err);
        return  list;
    }));
}



export function setCustomerById(userId) {
    mongoose.connect(uri , {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    const customerId=listCustomers.find((item)=>item.idCustomer===userId);

    if(customerId!==undefined) {
        const newCustomer = new customerModel(customerId);
        console.log(newCustomer);
        return Promise.resolve(
            newCustomer
                .save((err) => {
                    if (err) return console.log(err);
                }));
    }
    return Promise.resolve({error:"NotFound"});
    // db.once('open', function() {
    //     console.log("' we're connected!'");
    //
    //         /*.then(function(doc){
    //             console.log("Сохранен объект", doc);
    //             //mongoose.disconnect();  // отключение от базы данных
    //         })
    //         .catch(function (err){
    //             console.log(err);
    //            // mongoose.disconnect();
    //         });*/
    // });
    //return Promise.resolve({name:"Ok"});
}