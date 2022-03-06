const express = require('express');
const Book = require('../model/Book');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send(await Book.getBooks());
});

router.get('/books/:id', async (req, res) => {
    res.send(await Book.getBook(req.params.id));
});

router.post('/books', async (req, res) => {
    res.send(await Book.insertBook(req.body.id, req.body.name, req.body.owned));
});

router.get('/readjson', async (req, res) => {
    res.send(Book.readJson());
});

router.put('/books/:id', async (req, res) => {
    console.log(req.body);
    res.send(await Book.updateBook(req.params.id, req.body.owned));
});

module.exports = router;