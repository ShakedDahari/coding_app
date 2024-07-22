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

module.exports = codeBlocksRoute;