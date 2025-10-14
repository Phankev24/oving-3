// src/components/tasks/newTaskForm.jsx
import React, { useState } from "react";

export function NewTaskForm({ onNewTask }) {
  const [summary, setSummary] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onNewTask({ summary, complete: false, description: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <strong>Description: </strong>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <div>
        <button>Create</button>
      </div>
    </form>
  );
}
