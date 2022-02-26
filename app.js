const fs = require('fs');
const { inquirerMenu } = require('./helpers/inquirer');

const main = () => {
    let data;
    try {
        data = fs.read("./data/db.json");
    }
    catch(exception) {
        data = {};
    }

    return data;
}

const menu = () => {

    let opt = '';

    do {
        opt = inquirerMenu();
    } while(opt != '0');
}