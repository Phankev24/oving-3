import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export function TaskPage({ tasks, onUpdateTask }) {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return <h1>Task not found</h1>;
  }

  return <TaskView task={task} onUpdateTask={onUpdateTask} />;
}

function TaskView({ task, onUpdateTask }) {
  const [showDialog, setShowDialog] = useState(false);
  const [description, setDescription] = useState(task.description || "");

  function saveDescription(e) {
    e.preventDefault();
    onUpdateTask(task.id, { description });
    setShowDialog(false);
  }

  return (
    <div>
      <h1>{task.summary}</h1>
      <Link to="/">Back to all tasks</Link>

      {task.completed && <p>✅ Completed</p>}

      {task.description && (
        <div>
          <h3>Description</h3>
          <p>{task.description}</p>
        </div>
      )}

      <button onClick={() => setShowDialog(true)}>Edit Description</button>

      {showDialog && (
        <dialog
          open
          onClick={(e) => e.target === e.currentTarget && setShowDialog(false)}
        >
          <form onSubmit={saveDescription}>
            <h2>Edit Description</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              style={{ width: "100%" }}
            />
            <div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowDialog(false)}>
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
}
