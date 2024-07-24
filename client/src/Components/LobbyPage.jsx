import React, { useContext } from "react";
import { ContextPage } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../Context/SocketProvider";

export default function LobbyPage() {
  const navigate = useNavigate();
  const {
    codeBlocks,
    setChosenCodeBlock,
    loading,
    name, setName,
    intro, setIntro,
    initialCode, setInitialCode,
    solution, setSolution,
    isAdding, setIsAdding,
    addcodeBlock,
  } = useContext(ContextPage);

  const { role } = useSocket();

  const handleNavigation = (block) => {
    if (block) {
      setChosenCodeBlock(block);
      navigate("/codeBlockPage");
    }
  };

  const openAdd = () => {
    setIsAdding(true);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeIntro = (event) => {
    setIntro(event.target.value);
  };

  const handleChangeInitialCode = (event) => {
    setInitialCode(event.target.value);
  };

  const handleChangeSolution = (event) => {
    setSolution(event.target.value);
  };


  const handleAdd = async () => {
    const newCodeBlock = {
      name: name,
      intro: intro,
      initialCode: initialCode,
      solution: solution,
    };

    console.log(newCodeBlock);
    setIsAdding(false);

    if (name && intro && initialCode && solution) {
      await addcodeBlock(name, intro, initialCode, solution);
    }

    setName("");
    setIntro("");
    setInitialCode("");
    setSolution("");
  };

  if (loading) return <div className="loader"></div>;

  return (
    <div className="container mt-5">
      <h1
        className="text-center mb-4"
        style={{ fontSize: "60px" }}
      >
        Coding Challenges Lobby
      </h1>
      <p>
        Hey everyone! I'm Tom, and I've missed teaching you all while I've been
        in Thailand.<br></br>
        I'm excited to introduce you to my new project, This website is designed
        to keep you learning and practicing JavaScript just like we used to.
        <br></br>
        Here's how it works:<br></br>
        When you first enter, you'll see a list of code blocks to choose from.
        Each item represents a different coding challenge.
        <br></br> Once you select a challenge, you'll be taken to the code block
        page. If I'm around, I'll be the mentor and you'll be the student. I'll
        review your code, and you'll have the freedom to edit it. You can see
        code changes in real-time. Each challenge comes with a solution. When
        your code matches the solution, you'll be greeted with a big smiley face
        to celebrate your success! <br></br>
        Let's keep coding and learning together! Happy coding!
      </p>
      <div className="row">
        {codeBlocks.map((block) => (
          <div className="col-md-4 mb-4" key={block._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">{block.name}</h3>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleNavigation(block)}
                >
                  Join Challenge
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {role === "mentor" && (
        <div className="text-center mt-4">
          {!isAdding &&
          <button type="button" className="btn btn-success" onClick={() => openAdd()}>
            Create New Challenge
          </button>}
        </div>
      )}
      {isAdding &&
    <div style={{ margin: 20 }}>    
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <textarea
            placeholder="Name"
            value={name}
            onChange={handleChangeName}
            className="textarea"
            required
          />
          <textarea
          placeholder="Intro"
          value={intro}
          onChange={handleChangeIntro}
          className="textarea"
          required
          />
          <textarea
          placeholder="Initial Code"
          value={initialCode}
          onChange={handleChangeInitialCode}
          className="textarea"
          required
          />
          <textarea
            placeholder="Solution"
            value={solution}
            onChange={handleChangeSolution}
            className="textarea"
            required
          />
        <div style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <button type="button" className="btn btn-success" onClick={handleAdd}>Add</button>
        </div>
        </div>
      </div>
    }
    </div>
  );
}
