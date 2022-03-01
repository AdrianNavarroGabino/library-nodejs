const inquirer = require('inquirer');
require('colors');

const languages = [
    {
        type: 'list',
        name: 'language',
        message: 'Select your language',
        choices: [
            {
                value: 'eng',
                name: 'English'
            },
            {
                value: 'esp',
                name: 'Español'
            }
        ]
    }
];

const questions = {
    "esp": [
        {
            type: 'list',
            name: 'option',
            message: '¿Qué quieres hacer?',
            prefix: '>'.green,
            //suffix: ' (Usa las flechas)',
            choices: [
                {
                    value: '1',
                    name: '1. Añadir libro'
                },
                {
                    value: '2',
                    name: '2. Buscar libro'
                },
                {
                    value: '3',
                    name: '3. Listar libros'
                },
                {
                    value: '4',
                    name: '4. Listar libros que tengo'
                },
                {
                    value: '5',
                    name: '5. Listar libros que me faltan'
                },
                {
                    value: '6',
                    name: '6. Editar lista'
                },
                {
                    value: '7',
                    name: '7. Borrar libro'
                },
                {
                    value: '8',
                    name: '8. Cambiar idioma'
                },
                {
                    value: '0',
                    name: '0. Salir'
                }
            ]
        }
    ],
    "eng": [
        {
            type: 'list',
            name: 'option',
            message: 'What do you want to do?',
            prefix: '>'.green,
            //suffix: ' (Use arrow keys)',
            choices: [
                {
                    value: '1',
                    name: '1. Add book'
                },
                {
                    value: '2',
                    name: '2. Search book'
                },
                {
                    value: '3',
                    name: '3. List books'
                },
                {
                    value: '4',
                    name: '4. List books I have'
                },
                {
                    value: '5',
                    name: '5. List books I don\'t have'
                },
                {
                    value: '6',
                    name: '6. Edit books'
                },
                {
                    value: '7',
                    name: '7. Delete book'
                },
                {
                    value: '8',
                    name: '8. Change language'
                },
                {
                    value: '0',
                    name: '0. Exit'
                }
            ]
        }
    ]
};

const newBooks = {
    "esp": [
        {
            type: 'input',
            name: 'newBook',
            message: 'Introduce el título'.green,
            suffix: ' ' + '(En blanco para cancelar)'.bgBlue,
            prefix: ''
        }
    ],
    "eng": [
        {
            type: 'input',
            name: 'newBook',
            message: 'Enter the title'.green,
            suffix: ' ' + '(Empty to cancel)'.bgBlue,
            prefix: ''
        }
    ]
}

const pauseText = {
    "esp": [
        {
            name: 'pause',
            type: 'input',
            prefix: '',
            message: 'Intro para continuar'.green
        }
    ],
    "eng": [
        {
            name: 'pause',
            type: 'input',
            prefix: '',
            message: 'Enter to continue'.green
        }
    ]
}

const searchText = {
    "esp": [
        {
            name: 'search',
            type: 'input',
            prefix: '>'.green,
            message: 'Libro'
        }
    ],
    "eng": [
        {
            name: 'search',
            type: 'input',
            prefix: '>'.green,
            message: 'Book'
        }
    ],
}

const inquirerLanguage = async () => {
    console.clear();

    const {language} = await inquirer.prompt(languages);

    return language;
}

const inquirerMenu = async (lang) => {
    console.clear();

    console.log("==========================".green);
    if(lang == "esp") {
        console.log("  Seleccione una opción".green);
    }
    else if(lang == "eng") {
        console.log("  Choose an option".green);
    }
    console.log("==========================".green);
    console.log();

    const {option} = await inquirer.prompt(questions[lang]);
    
    return option;
}

const inquirerNewBook = async (lang) => {
    console.clear();

    const {newBook} = await inquirer.prompt(newBooks[lang]);

    return newBook;
}

const inquirerPause = async (lang) => {
    console.log();

    await inquirer.prompt(pauseText[lang]);
}

const inquirerSearch = async (lang) => {
    console.log();
    return await inquirer.prompt(searchText[lang]);
}

const inquirerEdit = async (lang, books) => {
    console.log();
    const {editBooks} = await inquirer.prompt(
        [
            {
                name: 'editBooks',
                prefix: '',
                suffix: '',
                type: 'checkbox',
                message: lang == 'esp' ? 'Libros' :
                                (lang == 'eng' ? 'Books' : ''),
                choices: books
            }
        ]
    );

    return editBooks;
}

const inquirerDelete = async (lang, books) => {
    console.log();
    const {deleteBook} = await inquirer.prompt(
        [
            {
                name: 'deleteBook',
                prefix: '',
                suffix: '',
                type: 'list',
                message: lang == 'esp' ? 'Libros' :
                                (lang == 'eng' ? 'Books' : ''),
                choices: books
            }
        ]
    );

    return deleteBook;
}

module.exports = {
    inquirerMenu,
    inquirerLanguage,
    inquirerNewBook,
    inquirerPause,
    inquirerSearch,
    inquirerEdit,
    inquirerDelete
};