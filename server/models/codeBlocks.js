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

    static async FindById(id) {
        return await new DB().FindByID(CodeBlock.collection, id);
    }
}


module.exports = CodeBlock;