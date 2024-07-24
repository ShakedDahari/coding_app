import React, { useContext, useEffect, useState } from "react";
import { ContextPage } from "../Context/ContextProvider";
import io from "socket.io-client";
import { apiUrl } from "../utils/api_url";
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

  const handleCheckClick = () => {
    setHasAttempted(true); // Mark as attempted

    // Normalize both the user input code and the solution
    const normalizedCode = normalizeCode(code);
    const normalizedSolution = normalizeCode(chosenCodeBlock.solution);

    console.log("Normalized User Code:", normalizedCode);
    console.log("Normalized Solution:", normalizedSolution);

    // Compare the normalized user input code with the normalized solution
    setIsSolutionCorrect(normalizedCode === normalizedSolution);

    // If the solution is correct, delete the code
    if (isSolutionCorrect) {
      setTimeout(() => {
        socket.emit("codeDelete", chosenCodeBlock._id);
      }, 1000); // Add a delay if you want to show the smiley emoji for a while
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
  }, [chosenCodeBlock._id, socket]);

  return (
    <div>
      <div>
        <h1>{chosenCodeBlock.name}</h1>
        <p>Students in room: {studentsCount}</p>
        <div
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          {chosenCodeBlock.intro}
          {chosenCodeBlock.initialCode}
        </div>
        {role === "mentor" ? (
          <div>
            <div
              className="form-floating"
              style={{
                margin: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <textarea
                disabled
                id="floatingInputDisabled"
                className="form-control"
                placeholder="Answer"
                style={{ width: "500px", height: "300px", fontSize: "16px" }}
                value={code}
                onChange={handleCodeChange}
              />
            </div>
            <p>Solution: {chosenCodeBlock.solution}</p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="form-floating" style={{ margin: "20px" }}>
              <textarea
                className="form-control"
                placeholder="Answer"
                style={{ width: "500px", height: "300px", fontSize: "16px" }}
                value={code}
                onChange={handleCodeChange}
              />
              <label>Answer</label>
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleCheckClick}
            >
              Check
            </button>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          {isSolutionCorrect === true && (
            <div style={{ fontSize: "100px", color: "green" }}>😊</div>
          )}
          {hasAttempted && isSolutionCorrect === false && (
            <div style={{ fontSize: "24px", color: "red" }}>Try Again</div>
          )}
        </div>
      </div>
    </div>
  );
}
