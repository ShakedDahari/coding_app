import React, { useContext, useEffect } from "react";
import { ContextPage } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/api_url";

export default function LobbyPage() {

    const navigate = useNavigate();
    const { codeBlocks, setCodeBlocks, setChosenCodeBlock, LoadCodeBlocks } = useContext(ContextPage);

    // useEffect(() => {
    //         try {
    //           let res =  fetch(`${apiUrl}/api/codeBlocks`);
    //           let data =  res.json();
    //           console.log(data);
    //           setCodeBlocks(data);
    //         } catch (error) {
    //           console.log({ error } );
    //         }
    // });

    useEffect(() => {
        LoadCodeBlocks();
        console.log(codeBlocks);
    }, [LoadCodeBlocks()]);

    const handleNavigation = (block) => {
        if (block) {
          setChosenCodeBlock(block);
          navigate('/codeBlockPage');
        }
      };

  return (
    <div className="lobby-page">
      <div>
        <h1>Choose Code Block</h1>
        <ul>
            {codeBlocks.map(block =><li key={block._id}><button onClick={() => handleNavigation(block)}>{block.name}</button></li>)}
        </ul>
      </div>
    </div>
  );
}
