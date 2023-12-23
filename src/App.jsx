// src/App.js
import React from "react";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <div>
      <header>
        <h1>Kanban Board App</h1>
      </header>
      <main>
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;
