const mongoose = require('mongoose');

import apiRouter from './api/router';

const express = require('express')
const app = express()
const port = 3000
const uri = "mongodb+srv://admin:customerp@s$w0rd@cluster0.n579g.mongodb.net/CustomerDB";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
    console.log(result);
}).catch(err => console.error(err));

app.use('/', apiRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})