import React, { useContext, useState } from 'react';
import { ContextPage } from '../Context/ContextProvider';
import io from 'socket.io-client';
import { apiUrl } from '../utils/api_url';

const socket = io(`${apiUrl}`);

export default function CodePage() {

    const { chosenCodeBlock, normalizeCode } = useContext(ContextPage);
    const [code, setCode] = useState("");
    const [isSolutionCorrect, setIsSolutionCorrect] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false); // To track if user has made an attempt
/////////////////
    const [role, setRole] = useState('student');
    const [studentsCount, setStudentsCount] = useState(0);

    useEffect(() => {
      socket.emit('joinCodeBlock', chosenCodeBlock._id);

      socket.on('role', (data) => {
          setRole(data.role);
      });

      socket.on('studentsCount', count => {
          setStudentsCount(count);
      });

      socket.on('mentorDisconnected', () => {
          // Redirect to the lobby page if the mentor disconnects
          navigate('/');
      });

      return () => {
          // Cleanup when the component unmounts
          socket.disconnect();
      };
  }, [chosenCodeBlock._id, navigate]);


    const handleCodeChange = (event) => {
      const newCode = event.target.value;
      setCode(newCode);
      ////////////////////
      socket.emit('codeChange', { codeBlockId: chosenCodeBlock.id, code: newCode });
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

  return (
    <div>
        <div>
            <h1>{chosenCodeBlock.name}</h1>
            <div>Role: {role}</div>
            <div>Students in the room: {studentsCount}</div>
            <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', padding: '10px', marginBottom: '20px' }}>
                {/* Display the initial code as text */}
                {chosenCodeBlock.initialCode}
            </div>
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
