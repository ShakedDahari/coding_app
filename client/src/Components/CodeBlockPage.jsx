import React, { useContext, useEffect, useState } from 'react';
import { ContextPage } from '../Context/ContextProvider';
import io from 'socket.io-client';
import { apiUrl } from '../utils/api_url';
import { useSocket } from '../Context/SocketProvider';

const socket = io(`${apiUrl}`);

export default function CodePage() {

  const { socket, role, studentsCount } = useSocket();

    const { chosenCodeBlock, normalizeCode } = useContext(ContextPage);
    const [code, setCode] = useState("");
    const [isSolutionCorrect, setIsSolutionCorrect] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false); // To track if user has made an attempt

    const handleCodeChange = (event) => {
      const newCode = event.target.value;
      setCode(newCode);
      socket.emit('codeChange', { codeBlockId: chosenCodeBlock._id, code: newCode });
    };

    const handleCheckClick = () => {
      setHasAttempted(true); // Mark as attempted
      // const formattedCode = code.trim().replace(/\s+/g, '');
      // setIsSolutionCorrect(formattedCode === solution.trim().replace(/\s+/g, ''));

        // Normalize both the user input code and the solution
        const normalizedCode = normalizeCode(code);
        const normalizedSolution = normalizeCode(chosenCodeBlock.solution);

        console.log('Normalized User Code:', normalizedCode);
        console.log('Normalized Solution:', normalizedSolution);

        // Compare the normalized user input code with the normalized solution
        setIsSolutionCorrect(normalizedCode === normalizedSolution);
    };

    useEffect(() => {
      socket.emit('joinCodeBlock', chosenCodeBlock._id);

      socket.on('codeUpdate', (updatedCode) => {
          setCode(updatedCode);
      });

      return () => {
          socket.off('codeUpdate');
      };
  }, [chosenCodeBlock._id, socket]);

    
  return (
    <div>
        <div>
            <h1>{chosenCodeBlock.name}</h1>
            <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', padding: '10px', marginBottom: '20px' }}>
                {/* Display the initial code as text */}
                {chosenCodeBlock.initialCode}
            </div>
            {role === 'mentor' ? (
                <textarea value={code} readOnly />
            ) : (
                <textarea value={code} onChange={handleCodeChange} />
            )}
            <p>Students in room: {studentsCount}</p>
            <textarea
                value={code}
                onChange={handleCodeChange}
                rows="20"
                cols="80"
                style={{
                    fontFamily: 'monospace',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '10px',
                    width: '100%',
                    height: '500px',
                    overflow: 'auto'
                }}
            />
            <button
                onClick={handleCheckClick}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#4CAF50',
                    color: 'white'
                }}
            >
                Check
            </button>
            <div style={{ marginTop: '20px' }}>
                {isSolutionCorrect === true && <div style={{ fontSize: '48px', color: 'green' }}>😊</div>}
                {hasAttempted && isSolutionCorrect === false && <div style={{ fontSize: '24px', color: 'red' }}>Try Again</div>}
            </div>
        </div>
    </div>
  )
}
