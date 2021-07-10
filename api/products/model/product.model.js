import mongoose from "mongoose";
import {getProductsList} from "../services/product.service";
import {Decimal128} from "mongodb";
const Schema = mongoose.Schema;


const productSchema = new Schema({
    idProduct:{
        type:String,
        required: true
    },
    name:{
        type:String,
        minLength:3,
        maxlength:100,
        required: true
    },
    summary:{
        type:String,
        minLength:3,
        maxlength:300,

    },
    price:{
        type:Decimal128,
        //match:
        required: true
    }
});

export default  mongoose.model('Product', productSchema);