import './App.css';
import { Routes, Route } from 'react-router-dom';
import LobbyPage from './Components/LobbyPage';
import CodeBlockPage from './Components/CodeBlockPage';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ContextPage } from './Context/ContextProvider';
import { SocketProvider } from './Context/SocketProvider';

function App() {
 
  const { LoadCodeBlocks, codeBlocks } = useContext(ContextPage);
  
  useEffect(() => {
      LoadCodeBlocks();
      console.log(codeBlocks);
    }, []);

  return (
    <div className="App">
      <SocketProvider>
      <Routes>
        <Route path='/' element={<LobbyPage/>}></Route>
        <Route path='/codeBlockPage' element={<CodeBlockPage/>}></Route>
      </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
