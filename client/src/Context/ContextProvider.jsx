import React, { createContext, useState } from 'react';
import { apiUrl } from '../utils/api_url';

export const ContextPage = createContext();

export default function ContextProvider(props) {
    
    // All code blocks items
    const [codeBlocks, setCodeBlocks] = useState([]);
    // const codeBlocks = [
    //     { id: 1, title: 'Math Operations' },
    //     { id: 2, title: 'Conditional Statements' },
    //     { id: 3, title: 'Switch' },
    //     { id: 4, title: 'Loops' },
    //     { id: 5, title: 'Regular Expressions' },
    // ];

    // Save the chosen code block
    const [chosenCodeBlock, setChosenCodeBlock] = useState();

    const LoadCodeBlocks = async () => {
        try {
          let res = await fetch(`${apiUrl}/api/codeBlocks`);
          let data = await res.json();
          console.log(data);
          setCodeBlocks(data);
        } catch (error) {
          console.log({ error } );
        }
      };

  return (
    <ContextPage.Provider value={{ codeBlocks, setCodeBlocks, chosenCodeBlock, setChosenCodeBlock, LoadCodeBlocks }}>
        {props.children}
    </ContextPage.Provider>
  )
}
