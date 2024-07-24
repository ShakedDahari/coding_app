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

    async InsertOne() {
        return await new DB().Insert(CodeBlock.collection, this);
    }
}


module.exports = CodeBlock;