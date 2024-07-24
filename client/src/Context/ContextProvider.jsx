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
  const [savedId, setSavedId] = useState();
  const [savedName, setSavedName] = useState();
  const [loading, setLoading] = useState(true);

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
        savedId,
        setSavedId,
        savedName, setSavedName,
        loading, setLoading
      }}
    >
      {props.children}
    </ContextPage.Provider>
  );
}
