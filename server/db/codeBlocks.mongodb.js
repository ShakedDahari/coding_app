const database = 'CodingApp';

// The current database to use
use(database); 

 // Create the code blocks collection
db.createCollection("codeBlocks");

// Insert documents into the code blocks collection
db.codeBlocks.insertMany([
    { name: "Math Operations" },
    { name: "Conditional Statements" },
    { name: "Switch" },
    { name: "Loops" },
    { name: "Regular Expressions" },
]);
