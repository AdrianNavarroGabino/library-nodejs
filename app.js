const { clear } = require('console');
const fs = require('fs');
require('colors');
const { inquirerMenu,
    inquirerLanguage,
    inquirerNewBook,
    inquirerPause,
    inquirerSearch,
    inquirerEdit,
    inquirerDelete } = require('./helpers/inquirer');
data = {}

const getData = () => {
    try {
        data = JSON.parse(fs.readFileSync("./data/db.json"));
    }
    catch(exception) {
        data = {};
    }
}

const selectLanguage = async () => {
    let language = await inquirerLanguage();
    return language;
}

const menu = async () => {

    let opt = '';

    do {
        opt = await inquirerMenu(data.language);

        if(opt != '0') {
            await chooseOption(opt);
        }
    } while(opt !== '0');

    console.clear();

    return;
}

const chooseOption = async (opt) => {
    switch(opt) {
        case '1': 
            await addBook();
            break;
        case '2':
            await searchBook();
            break;
        case '3':
            await listBooks();
            break;
        case '4': 
            await listBooksIHave();
            break;
        case '5':
            await listBooksIDontHave();
            break;
        case '6':
            await editBooks();
            break;
        case '7':
            await deleteBook();
            break;
        case '8':
            await changeLanguage();
            break;
    }
}

const addBook = async () => {
    if(!data.books) {
        data.books = [];
    }

    let newBook;
    let repeated;

    do {
        newBook = await inquirerNewBook(data.language);

        repeated = data.books.some((b) => newBook && newBook == b.name);
        if(repeated) {
            if(data.language == "esp") {
                console.log("Este libro ya existe");
            }
            else if(data.language == "eng") {
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
        data.books.sort((b1, b2) => b1.id != b2.id ? b1.id - b2.id :
                                                    b1.name - b2.name);
        fs.writeFileSync("./data/db.json", JSON.stringify(data));
    }

    return newBook
}

const searchBook = async () => {
    console.clear();

    const search = (await inquirerSearch(data.language)).search
                                    .toLowerCase()
                                    .trim()
                                    .replace(/(\.|\,)/ig, " ")
                                    .split(" ")
                                    .filter(e => e.length > 2 || !isNaN(e));

    if(search && search.length > 0) {
        let count = 0;

        data.books
            .filter(b => search.some(e => (b.id + " " + b.name.toLowerCase())
                                                                .includes(e)))
            .forEach(b => {
                var book = b.id.toString().padEnd(6, ' ').red +
                            b.name.substring(0, 50).padEnd(50, ' ').black +
                            (b.owned ? "✅" : "❌");
                console.log(count % 2 ? book.bgYellow : book.bgCyan);
                count++;
        });

        await inquirerPause(data.language);
    }
}

const listBooks = async () => {
    console.clear();
    let count = 0;
    data.books.forEach(b => {
        var book = b.id.toString().padEnd(6, ' ').red +
                    b.name.substring(0, 50).padEnd(50, ' ').black +
                    (b.owned ? "✅" : "❌");
        console.log(count % 2 ? book.bgYellow : book.bgCyan);
        count++;
    });
    await inquirerPause(data.language);
}

const listBooksIHave = async () => {
    console.clear();
    let count = 0;
    data.books.filter(b => b.owned).forEach(b => {
        var book = b.id.toString().padEnd(6, ' ').red +
                    b.name.substring(0, 50).padEnd(50, ' ').black +
                    (b.owned ? "✅" : "❌");
        console.log(count % 2 ? book.bgYellow : book.bgCyan);
        count++;
    });
    await inquirerPause(data.language);
}

const listBooksIDontHave = async () => {
    console.clear();
    let count = 0;
    data.books.filter(b => !b.owned).forEach(b => {
        var book = b.id.toString().padEnd(6, ' ').red +
                    b.name.substring(0, 50).padEnd(50, ' ').black +
                    (b.owned ? "✅" : "❌");
        console.log(count % 2 ? book.bgYellow : book.bgCyan);
        count++;
    });
    await inquirerPause(data.language);
}

const editBooks = async () => {
    const response = await inquirerEdit(data.language, data.books.map(b => {
        return {name: `${b.id.toString().padEnd(6, ' ').red}${b.name}`,
                checked: b.owned,
                value: `${b.id} ${b.name}`};
    }));

    fs.writeFileSync("./data/db_backup.json", JSON.stringify(data));

    data.books.forEach(b => b.owned = response
                                        .some(e => e == `${b.id} ${b.name}`));
    fs.writeFileSync("./data/db.json", JSON.stringify(data));
}

const deleteBook = async() => {
    const response = await inquirerDelete(data.language, data.books.map(b => {
        return {name: `${b.id.toString().padEnd(6, ' ').red}${b.name}`,
                value: `${b.id} ${b.name}`};
    }).concat([{name: data.language == 'esp' ? 'Cancelar' :
            (data.language == 'eng' ? 'Cancel' : ''), value: 'cancelar'}]));

    if(response != 'cancelar') {
        fs.writeFileSync("./data/db_backup.json", JSON.stringify(data));
        data.books = data.books.filter(b => `${b.id} ${b.name}` != response);
        fs.writeFileSync("./data/db.json", JSON.stringify(data));
    }
}

const changeLanguage = async () => {
    let language = await selectLanguage();
    data.language = language;
    fs.writeFileSync("./data/db.json", JSON.stringify(data));
}

const main = async () => {
    getData();

    if(!data.language) {
        changeLanguage();
    }

    menu();
}

main();