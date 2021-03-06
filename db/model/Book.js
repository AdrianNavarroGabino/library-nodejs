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

    static updateBook = async (id, owned) => {
        let extra = "id: " + id + " owned: " + owned;
        try { 
            let book = (await connection.query('select * from books where id = $1', [id])).rows[0];
            extra += " book: yes";
            const res = await connection.query('update books set owned = $1 where id = $2', [owned, id]);
            book.owned = owned;
            return {error: false, result: res, extra};
        }
        catch(e) {
            return {error: true, result: e, extra};
        }
    }

    static deleteBook = async id => {
        const res = await connection.query('delete from books where id = $1', [id]);
        return {error: res.rowCount > 0, result: res};
    }
}