import React, { useContext, useEffect } from "react";
import { ContextPage } from "../Context/ContextProvider";
import { useSocket } from "../Context/SocketProvider";

export default function CodePage() {

  const { socket, role, studentsCount } = useSocket();

  const {
    chosenCodeBlock,
    normalizeCode,
    code,
    setCode,
    isSolutionCorrect,
    setIsSolutionCorrect,
    hasAttempted,
    setHasAttempted,
  } = useContext(ContextPage);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);
    socket.emit("codeChange", {
      codeBlockId: chosenCodeBlock._id,
      code: newCode,
    });
  };

  const handleCheckClick = async () => {
    setHasAttempted(true); // Mark as attempted

    // Normalize both the user input code and the solution
    const normalizedCode = normalizeCode(code);
    const normalizedSolution = normalizeCode(chosenCodeBlock.solution);

    console.log("Normalized User Code:", normalizedCode);
    console.log("Normalized Solution:", normalizedSolution);

    // Compare the normalized user input code with the normalized solution
    await setIsSolutionCorrect(normalizedCode === normalizedSolution);

    // If the solution is correct, delete the code
    if (isSolutionCorrect) { 
      setTimeout(() => {
        socket.emit("codeDelete", chosenCodeBlock._id);
      }, 1000); 
    }
  };

  useEffect(() => {
    socket.emit("joinCodeBlock", chosenCodeBlock._id);

    socket.on("codeUpdate", (updatedCode) => {
      setCode(updatedCode);
    });

    socket.on("codeDelete", () => {
      setCode("");
    });

    return () => {
      socket.off("codeUpdate");
      socket.off("codeDelete");
    };
  }, [chosenCodeBlock._id, socket, setCode]);

  return (
    <div className="container my-4">
    <div className="row mb-4">
      <div className="col-12 text-center">
        <h1>{chosenCodeBlock.name}</h1>
        <p>Students in room: {studentsCount}</p>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="alert alert-dark" role="alert">
          <pre>{chosenCodeBlock.intro}</pre>
        </div>
          <h3>Challenge:</h3>
          <pre>{chosenCodeBlock.initialCode}</pre>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-md-8">
        {role === "mentor" ? (
          <div className="form-floating mb-3">
            <textarea
              disabled
              id="floatingInputDisabled"
              className="form-control"
              placeholder="Answer"
              style={{ height: "300px", fontSize: "16px" }}
              value={code}
              onChange={handleCodeChange}
            />
            <label>Answer</label>
            <p style={{ margin: 10, fontSize: "16px" }}>Solution:</p>
            <pre className="mt-2" style={{ textAlign: 'left' }}>{chosenCodeBlock.solution}</pre>
          </div>
        ) : (
          <div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                placeholder="Answer"
                style={{ height: "300px", fontSize: "16px" }}
                value={code}
                onChange={handleCodeChange}
              />
              <label>Answer</label>
            </div>
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={handleCheckClick}
            >
              Check
            </button>
          </div>
        )}
      </div>
    </div>
    <div className="row justify-content-center mt-4">
      <div className="col-12 text-center">
        {isSolutionCorrect === true && (
          <div className="display-1 text-success">😊</div>
        )}
        {hasAttempted && isSolutionCorrect === false && (
          <div className="h4 text-danger">Try Again</div>
        )}
      </div>
    </div>
  </div>
  );
}
