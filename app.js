const fs = require('fs');
const { inquirerMenu, inquirerLanguage, inquirerNewBook } = require('./helpers/inquirer');

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

        if(opt != '0') {
            await chooseOption(opt, data);
        }
    } while(opt !== '0');

    console.clear();
}

const chooseOption = async (opt, data) => {
    switch(opt) {
        case '1': 
            await addBook(data.language, data);
            break;
        case '2': break;
        case '3': break;
        case '4': break;
        case '5': break;
        case '6': break;
        case '7': break;
    }
}

const addBook = async (lang, data) => {
    if(!data.books) {
        data.books = [];
    }

    let newBook;
    let repeated;

    do {
        newBook = await inquirerNewBook(lang);

        repeated = data.books.some((b) => newBook == b.name);
        if(repeated) {
            if(lang == "esp") {
                console.log("Este libro ya existe");
            }
            else if(lang == "eng") {
                console.log("This book already exists");
            }
        }
    } while(repeated);

    if(newBook) {
        let id;
        if(isNaN(newBook.substring(0,1))) {
            id = data.books ? Math.max(data.books.map(b => b.id)) + 1 : 1;
        }
        else {
            let count = 1;
            while(!isNaN(newBook.substring(0, count))) {
                count++;
            }

            id = parseInt(newBook.substring(0, count));
            newBook = newBook.substring(count);

            while(newBook.substring(0, 1).match(/(\.|\s|-|,)/)) {
                newBook = newBook.substring(1);
            }
        }

        data.books.push({id: id, name: newBook, owned: false});
        data.books.sort((b1, b2) => b1.id != b2.id ? b1.id - b2.id : b1.name - b2.name);
        fs.writeFileSync("./data/db.json", JSON.stringify(data));
    }

    return newBook
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