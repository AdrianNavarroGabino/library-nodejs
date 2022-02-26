const fs = require('fs');
const { inquirerMenu, inquirerLanguage } = require('./helpers/inquirer');

const getData = () => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync("./data/db.json"));
    }
    catch(exception) {
        data = {};
    }

    return data;
}

const selectLanguage = async () => {
    let language = await inquirerLanguage();
    return language;
}

const menu = async (data) => {

    let opt = '';

    do {
        opt = await inquirerMenu(data.language);
    } while(opt !== '0');

    console.clear();
}

const main = async () => {
    let data = getData();

    if(!data.language) {
        let language = await selectLanguage();
        data.language = language;
        fs.writeFileSync("./data/db.json", JSON.stringify(data));
    }

    menu(data);
}

main();