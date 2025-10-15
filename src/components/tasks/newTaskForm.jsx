import React, { useState } from "react";

export function NewTaskForm({ onNewTask }) {
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [owner, setOwner] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onNewTask({
      summary,
      completed: false,
      category,
      status,
      dueDate,
      owner,
    });

    // Reset form
    setSummary("");
    setCategory("");
    setStatus("");
    setDueDate("");
    setOwner("");
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <strong>Summary:</strong>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>

      <div>
        <strong>Category:</strong>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <strong>Status:</strong>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select status</option>
          <option value="Not started">Not started</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div>
        <strong>Due Date:</strong>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div>
        <strong>Owner:</strong>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </div>

      <div>
        <button>Create Task</button>
      </div>
    </form>
  );
}
