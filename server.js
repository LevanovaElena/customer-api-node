import apiRouter from './api/router';

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const express = require('express')
const app = express()
const port = 4000
//const uri = "mongodb+srv://admin:customerp@s$w0rd@cluster0.n579g.mongodb.net/CustomerDB";
const uri="mongodb://localhost:27017/CustomerDB";

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
})

mongoose.set('useFindAndModify', false);

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
    //console.log(result);
    app.use('/', apiRouter);
}).catch(err => console.error(err));



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})