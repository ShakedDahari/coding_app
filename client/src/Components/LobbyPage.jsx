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

    // const fetchApi = async() => {
    //     try {
    //         const res  = await fetch(`${apiUrl}/api/codeBlocks`);
    //         console.log('Fetching API...');
    //       console.log('res' + res);
    //       const data = await res.json();
    //       if (data) {
    //         console.log("Api Success");
    //         console.log('data fetchapi' + data);
    //         setCodeBlocks(data);
    //       }
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //   }

    const fetchApi = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/codeBlocks`, { mode: 'cors' });
            console.log('res', res);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log(JSON.stringify(data) + 'data');
            if (data) {
                console.log("API Success");
                console.log('Fetched Data:', data);
                setCodeBlocks(data);
            }
        } catch (error) {
            console.log('Fetch error:', error.message);
        }
    };

    useEffect(() => {
        // LoadCodeBlocks();
        fetchApi();
        console.log(codeBlocks);
    }, []);

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
