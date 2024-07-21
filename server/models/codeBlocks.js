const DB = require('../utils/DB');

class CodeBlock {
    static collection = 'codeBlocks';

    name;

    constructor(name) {
        this.name = name;
    }
}

module.exports = CodeBlock;