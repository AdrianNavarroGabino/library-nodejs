const connection = require("../connection");
const fs = require('fs');

module.exports = class Book {
    constructor(book) {
        this.id = book.id;
        this.name = book.name;
        this.owned = book.owned;
    }

    static getBooks = async () => {
        try {
            const res = await connection.query("select * from books order by id");
            return res.rows.map(book => new Book(book));
        }
        catch(exception) {
            return {};
        }
    }

    static getBook = async id => {
        try {
            const res = await connection.query("select * from books where id = $1 order by id", [id]);
            return new Book(res.rows[0]);
        }
        catch(exception) {
            return {};
        }
    }

    static insertBook = async (id, name, owned) => {
        const res = await connection.query(`insert into books
                                            (id, name, owned)
                                            values
                                            ($1, $2, $3)`, [id, name, owned]);
                                        
        return res;
    }

    static readJson = () => {
        const data = fs.readFileSync('./json/db.json', {encoding:'utf8', flag:'r'});
        
        const books = JSON.parse(data).books;

        books.forEach(book => {
            connection.query(`insert into books
                            (id, name, owned)
                            values
                            ($1, $2, $3)`, [book.id, book.name, book.owned]);
        });

        
        return books.map(book => new Book(book));
    }
}