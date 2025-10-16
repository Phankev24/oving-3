import React from "react";
import { Link } from "react-router-dom";

export function TaskList({ tasks, onUpdateTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) =>
              onUpdateTask(task.id, { completed: e.target.checked })
            }
          />

          <Link to={`/tasks/${task.id}`}>{task.summary}</Link>

          <div>
            <span> Task: {task.id} </span>
            {task.category && <span>- {task.category} </span>}
            {task.owner && <span>- {task.owner} </span>}
            {task.dueDate && <span>- {task.dueDate}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}
