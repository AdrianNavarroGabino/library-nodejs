const express = require('express');
const Book = require('../model/Book');
let router = express.Router();

router.get('/', async (req, res) => {
    res.send(await Book.getBooks());
});

router.get('/:id', async (req, res) => {
    res.send(await Book.getBook(req.params.id));
});

router.post('/', async (req, res) => {
    res.send(await Book.insertBook(req.body.id, req.body.name, req.body.owned));
});

module.exports = router;