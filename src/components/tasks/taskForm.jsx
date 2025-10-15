import React, { useState } from "react";

export function TaskForm({ onAddTask }) {
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [owner, setOwner] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddTask({
      summary,
      category,
      status,
      dueDate,
      owner,
      completed: false,
    });

    setSummary("");
    setCategory("");
    setStatus("");
    setDueDate("");
    setOwner("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Summary (required):</label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select status</option>
          <option value="Not started">Not started</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div>
        <label>Owner:</label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </div>

      <button type="submit">Create Task</button>
    </form>
  );
}
