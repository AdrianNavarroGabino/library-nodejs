const express = require('express');
const bodyParser = require('body-parser');
const books = require('./routers/book');
const cors = require('cors');
let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', books);
app.listen(process.env.PORT || 8090);