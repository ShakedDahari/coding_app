require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5500;

const DB = require('../server/utils/DB');
const db = new DB();

const server = express();  
server.use(cors());
server.use(express.json());

server.use('/api/codeBlocks', require('./routes/codeBlocksRoute'));

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});