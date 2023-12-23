// src/App.js
import React from "react";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <div className="font-sans">
      <div className="bg-gray text-white py-4 text-center">
        <h1 className="text-4xl font-bold">
          Kanban Board
          <span className="text-sm block font-light">
            Created By ~{" "}
            <a
              href="https://github.com/itsrahulsehgal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              Rahul Sehgal
            </a>
          </span>
        </h1>
      </div>
      <div className="container mx-auto mt-8 p-4">
        <KanbanBoard />
      </div>
    </div>
  );
}

export default App;
