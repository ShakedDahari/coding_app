const database = 'CodingApp';

// The current database to use
use(database); 

 // Create the code blocks collection
db.createCollection("codeBlocks");

// Insert documents into the code blocks collection
db.codeBlocks.insertMany([
    {   
        name: "Math Operations", 
        intro: "Math operations allow you to perform calculations, manipulate data, and solve complex problems. The basic arithmetic operations include addition, subtraction, multiplication, and division.", 
        initialCode: "Calculate the average of 3 numbers: 'num1', 'num2', 'num3'.\n", 
        solution: "(num1 + num2 + num3) / 3" 
    },
    { 
        name: "Conditional Statements", 
        intro: "Conditional statements allow you to execute different code blocks based on certain conditions. They are fundamental for controlling the flow of your program.", 
        initialCode: "There are two variables: 'x' and 'y'. Return the greatest value. If equal return the sum of the values.", 
        solution: "if (x > y) {\n    return x\n} else if (y > x) {\n    return y\n} else {\n    return x + y\n}"  
    },
    { 
        name: "Switch Statements", 
        intro: "Switch statements allow you to execute one code block among many based on the value of an expression. They are an alternative to multiple if-else-if statements.", 
        initialCode: "There is a variable called 'day' (1-7). Return the day of the week it represents.", 
        solution: "switch (day) {\n    case 1:\n        return 'Sunday';\n    case 2:\n        return 'Monday';\n    case 3:\n        return 'Tuesday';\n    case 4:\n        return 'Wednesday';\n    case 5:\n        return 'Thursday';\n    case 6:\n        return 'Friday';\n    case 7:\n        return 'Saturday';\n}"
    },
    { 
        name: "Loops", 
        intro: "Loops are used to execute a block of code repeatedly. The most common types of loops are for, while, and do-while loops.", 
        initialCode: "Write a loop that prints numbers from 1 to 5.", 
        solution: "for (let i = 1; i <= 5; i++) {\n    console.log(i);\n}" 
    },
    { 
        name: "Regular Expressions", 
        intro: "Regular expressions are patterns used to match character combinations in strings. They are powerful tools for string manipulation and validation.", 
        initialCode: "Match a string that contains only lowercase letters.", 
        solution: "/^[a-z]+$/"  
    },
]);
