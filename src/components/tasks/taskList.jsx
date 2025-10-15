import React from "react";
import { Link } from "react-router-dom";

export function TaskList({ tasks, onItemChecked }) {
  return (
    <ul>
      {tasks.map(({ id, completed, summary, category, dueDate, owner }) => (
        <li
          key={id}
          // style={{ textDecoration: completed ? "line-through" : undefined }}
        >
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => onItemChecked(id, e.target.checked)}
          />{" "}
          <Link to={`/tasks/${id}`}>{summary}</Link>
          <div>
            {category && <span>{category} </span>}
            {owner && <span>{owner} </span>}
            {dueDate && <span>{dueDate}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}
