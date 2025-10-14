import React from "react";
import { Link } from "react-router-dom";

export function TaskListItem({ task, onCompleted }) {
  const { id, summary, completed } = task;

  return (
    <li style={{ textDecoration: completed ? "line-through" : undefined }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onCompleted(task, e.target.checked)}
      />{" "}
      <Link to={`/tasks/${id}`}>{summary}</Link>
    </li>
  );
}
