const CodeBlock = require('../models/codeBlocks');
const codeBlocksRoute = require('express').Router();
require('dotenv').config();

codeBlocksRoute.get('/', async (req, res) => {
    try {
        let data = await CodeBlock.FindAllCodeBlocks();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

codeBlocksRoute.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let data = await CodeBlock.FindById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

codeBlocksRoute.post('/add', async (req, res) => {
    try {
        let { name, intro, initialCode, solution } = req.body;
        let data = await new CodeBlock( name, intro, initialCode, solution ).InsertOne();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = codeBlocksRoute;