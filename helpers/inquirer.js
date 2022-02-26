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
            choices: [
                {
                    value: '1',
                    name: '1. Añadir libro'
                },
                {
                    value: '2',
                    name: '2. Listar libros'
                },
                {
                    value: '3',
                    name: '3. Listar libros que tengo'
                },
                {
                    value: '4',
                    name: '4. Listar libros que me faltan'
                },
                {
                    value: '5',
                    name: '5. Editar lista'
                },
                {
                    value: '6',
                    name: '6. Borrar libro'
                },
                {
                    value: '7',
                    name: '7. Cambiar idioma'
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
            choices: [
                {
                    value: '1',
                    name: '1. Add book'
                },
                {
                    value: '2',
                    name: '2. List books'
                },
                {
                    value: '3',
                    name: '3. List books I have'
                },
                {
                    value: '4',
                    name: '4. List books I don\'t have'
                },
                {
                    value: '5',
                    name: '5. Edit books'
                },
                {
                    value: '6',
                    name: '6. Delete book'
                },
                {
                    value: '7',
                    name: '7. Change language'
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

module.exports = {
    inquirerMenu,
    inquirerLanguage,
    inquirerNewBook
};