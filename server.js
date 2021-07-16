import apiRouter from './api/router';
import {errorHandler} from "./api/core/error.handler";

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
//const uri = "mongodb+srv://admin:customerp@s$w0rd@cluster0.n579g.mongodb.net/CustomerDB";
const uri="mongodb://localhost:27017/CustomerDB";
//app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    res.header({"Access-Control-Allow-Methods":"POST, GET, OPTIONS, DELETE, PUT"});
    res.header({"Access-Control-Allow-Headers":"*"});
    next();
})

mongoose.set('useFindAndModify', false);

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
    app.use('/', apiRouter);
    app.use(errorHandler);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})