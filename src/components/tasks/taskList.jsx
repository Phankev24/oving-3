// src/components/tasks/taskList.jsx
import React from "react";
import { Link } from "react-router-dom";

export function TaskList({ tasks, onItemChecked }) {
  return (
    <ul>
      {tasks.map(({ id, complete, summary }) => (
        <li
          key={id}
          style={{ textDecoration: complete ? "line-through" : undefined }}
        >
          <input
            type="checkbox"
            checked={complete}
            onChange={(e) => onItemChecked(id, e.target.checked)}
          />{" "}
          <Link to={`/tasks/${id}`}>{summary}</Link>
        </li>
      ))}
    </ul>
  );
}
