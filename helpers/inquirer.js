const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
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
                value: '0',
                name: '0. Salir'
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();

    console.log("==========================".green);
    console.log("  Seleccione una opción".green);
    console.log("==========================".green);
    console.log();

    const {opcion} = await inquirer.prompt(preguntas);
    
    return opcion;
}

module.exports = {
    inquirerMenu
};