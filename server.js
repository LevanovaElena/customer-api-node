const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');

import apiRouter from './api/router';

const express = require('express')
const app = express()
const port = 3000


app.use('/', apiRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})