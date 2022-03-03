const express = require('express');
const bodyParser = require('body-parser');
const books = require('./routers/book');
let app = express();

app.use(bodyParser.json());
app.use('/', books);
app.listen(8090);