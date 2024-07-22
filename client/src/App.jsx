import './App.css';
import { Routes, Route } from 'react-router-dom';
import LobbyPage from './Components/LobbyPage';
import CodeBlockPage from './Components/CodeBlockPage';
import { apiUrl } from './utils/api_url';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ContextPage } from './Context/ContextProvider';
import CodeBlocks from './Components/CodeBlocks';

function App() {

  // const fetchApi = async() => {
  //   try {
  //     const res  = await fetch(`${apiUrl}/api/codeBlocks`);
  //     console.log('res' + res);
  //     const data = await res.json();
  //     if (data) {
  //       console.log("Api Success");
  //       console.log('data fetchapi' + data);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // useEffect(() =>{
  //   fetchApi();
  //   console.log('appppp');
  // }, []);

  // const { LoadCodeBlocks, CodeBlocks } = useContext(ContextPage);

  // useEffect(() => {
  //   LoadCodeBlocks();
  //   console.log('App loaded and data fetched' + CodeBlocks);
  // }, [LoadCodeBlocks]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LobbyPage/>}></Route>
        <Route path='/codeBlockPage' element={<CodeBlockPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
