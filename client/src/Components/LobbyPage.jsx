import React, { useContext } from "react";
import { ContextPage } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function LobbyPage() {

    const navigate = useNavigate();
    const { codeBlocks, setChosenCodeBlock } = useContext(ContextPage);

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
            {codeBlocks.map(block =><li key={block.id}><button onClick={() => handleNavigation(block)}>{block.title}</button></li>)}
        </ul>
      </div>
    </div>
  );
}
