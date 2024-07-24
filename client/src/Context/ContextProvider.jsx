import React, { createContext, useState } from "react";
import { apiUrl } from "../utils/api_url";

export const ContextPage = createContext();

export default function ContextProvider(props) {
  // All code blocks items
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [chosenCodeBlock, setChosenCodeBlock] = useState();
  const [code, setCode] = useState("");
  const [isSolutionCorrect, setIsSolutionCorrect] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false); // To track if user has made an attempt
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [intro, setIntro] = useState('');
  const [initialCode, setInitialCode] = useState('');
  const [solution, setSolution] = useState('');
  const [isAdding, setIsAdding] = useState(false);


  const LoadCodeBlocks = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/codeBlocks`);
      const data = await res.json();
      setCodeBlocks(data);
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchCodeBlockData = async (id) => {
    try {
      let res = await fetch(`${apiUrl}/api/codeBlocks/${id}`);
      let data = await res.json();
      setChosenCodeBlock(data);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to normalize code by removing unnecessary spaces
  const normalizeCode = (code) => {
    // Remove spaces around operators and between tokens, and convert to lowercase
    return code
      .replace(/\s*([+\-*/=(){};])\s*/g, "$1") // Remove spaces around operators and symbols
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .trim(); // Trim leading and trailing spaces
  };

  const addcodeBlock = async (user) => {
    try {
      let res = await fetch(`${apiUrl}/api/codeBlock/add`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      LoadCodeBlocks();
    }
  };
  

  return (
    <ContextPage.Provider
      value={{
        codeBlocks,
        setCodeBlocks,
        chosenCodeBlock,
        setChosenCodeBlock,
        LoadCodeBlocks,
        fetchCodeBlockData,
        normalizeCode,
        code,
        setCode,
        isSolutionCorrect,
        setIsSolutionCorrect,
        hasAttempted,
        setHasAttempted,
        loading, setLoading,
        name, setName,
        intro, setIntro,
        initialCode, setInitialCode,
        solution, setSolution,
        isAdding, setIsAdding,
        addcodeBlock,
      }}
    >
      {props.children}
    </ContextPage.Provider>
  );
}
