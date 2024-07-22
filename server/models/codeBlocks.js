const DB = require('../utils/DB');

class CodeBlock {
    static collection = 'codeBlocks';

    name;

    constructor(name) {
        this.name = name;
    }

    static async FindAllCodeBlocks() {
        return await new DB().FindAll(CodeBlock.collection);
    }
}


module.exports = CodeBlock;