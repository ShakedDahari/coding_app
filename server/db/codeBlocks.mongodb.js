const database = 'CodingApp';

// The current database to use
use(database); 

 // Create the code blocks collection
db.createCollection("codeBlocks");

// Insert documents into the code blocks collection
db.codeBlocks.insertMany([
    { name: "Math Operations", initialCode: "Calculate the average of 3 numbers: num1, num2, num3\nlet avg = ", solution: "(num1 + num2 + num3) / 3" },
    { name: "Conditional Statements", initialCode: "Calculate the average of 3 numbers: num1, num2, num3\nlet avg = ", solution: "(num1 + num2 + num3) / 3" },
    { name: "Switch", initialCode: "Calculate the average of 3 numbers: num1, num2, num3\nlet avg = ", solution: "(num1 + num2 + num3) / 3" },
    { name: "Loops", initialCode: "Calculate the average of 3 numbers: num1, num2, num3\nlet avg = ", solution: "(num1 + num2 + num3) / 3" },
    { name: "Regular Expressions", initialCode: "Calculate the average of 3 numbers: num1, num2, num3\nlet avg = ", solution: "(num1 + num2 + num3) / 3" },
]);
