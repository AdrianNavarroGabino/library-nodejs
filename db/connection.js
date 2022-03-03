const { data } = require('./data');
const pgCon = require('pg');
const connection = new pgCon.Pool(data);

module.exports = connection;
