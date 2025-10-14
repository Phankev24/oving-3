import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dialog } from "../dialog/dialog.jsx";

function TaskView({ task, onUpdateTask }) {
  const { id, summary, completed, description } = task;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draftDescription, setDraftDescription] = useState(description || "");

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateTask(id, { description: draftDescription });
    setIsDialogOpen(false);
  }

  return (
    <>
      <h1>Single task: {summary}</h1>
      <p>
        <Link to="/">All tasks</Link>
      </p>
      {completed && <p>Completed</p>}
      {description && (
        <>
          <h3>Description</h3>
          <p>{description}</p>
        </>
      )}
      <button onClick={() => setIsDialogOpen(true)}>Update description</button>

      <Dialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}>
        <form onSubmit={handleSubmit}>
          <h2>Task description</h2>
          <textarea
            value={draftDescription}
            onChange={(e) => setDraftDescription(e.target.value)}
          />
          <p>
            <button type="submit">Update</button>
          </p>
          <p>
            <button type="button" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </button>
          </p>
        </form>
      </Dialog>
    </>
  );
}

export function TaskRoute({ tasks, onUpdateTask }) {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) return <h1>Task {id} not found</h1>;
  return <TaskView task={task} onUpdateTask={onUpdateTask} />;
}
