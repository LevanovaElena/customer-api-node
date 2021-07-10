import mongoose from "mongoose";
const Schema = mongoose.Schema;


const customerSchema = new Schema({
    idCustomer:{
        type:String,
        required: true
    },
    firstName:{
        type:String,
        minLength:3,
        maxlength:100
    },
    lastName:{
        type:String,
        minLength:3,
        maxlength:100,
        required: true
    },
    phoneNumber:{
        type:String,
        //match:
        required: true
    },
    email:{
        type:String,
        //match:
        required: true
    },
    totalPurchasesAmount:{
        type:Schema.Types.Decimal128
    },
    notes:{
        type: [{
            idNote:Number,
            note:String
        }],
        required:true
    },
    addressesList:
        {
            type: [{
                idAddress: {
                    type:Number,
                    required:true
                },
                addressLine: {
                    type:String,
                    minLength:3,
                    maxlength:100
                },
                addressLine2: {
                    type:String,
                    minLength:3,
                    maxlength:100,
                    required:true
                },
                typeAddress: {
                    type:String,
                    enum:['Billing','Shipping'],
                    required:true
                },
                city: {
                    type:String,
                    minLength:3,
                    maxlength:100,
                    required:true
                },
                postalCode: {
                    type:String,
                    minLength:3,
                    maxlength:6,
                    required:true
                },
                state: {
                    type:String,
                    minLength:3,
                    maxlength:10,
                    required:true
                },
                country: {
                    type:String,
                    enum:['Canada','United States'],
                    required:true
                },
            }],
            required:true
        }
});

export default  mongoose.model('Customer', customerSchema);