import React, { createContext, useState } from 'react';

export const ContextPage = createContext();

export default function ContextProvider(props) {

    // All code blocks items
    const codeBlocks = [
        { id: 1, title: 'Math Operations' },
        { id: 2, title: 'Conditional Statements' },
        { id: 3, title: 'Switch' },
        { id: 4, title: 'Loops' },
        { id: 5, title: 'Regular Expressions' },
    ];

    // Save the chosen code block
    const [chosenCodeBlock, setChosenCodeBlock] = useState();

  return (
    <ContextPage.Provider value={{ codeBlocks, chosenCodeBlock, setChosenCodeBlock }}>
        {props.children}
    </ContextPage.Provider>
  )
}
