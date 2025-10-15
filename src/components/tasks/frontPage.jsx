import React from "react";
import { TaskList } from "./taskList.jsx";
import { TaskForm } from "./taskForm.jsx";

export function FrontPage({ tasks, onAddTask, onUpdateTask }) {
  return (
    <div>
      <h1>My Tasks</h1>
      <TaskList tasks={tasks} onUpdateTask={onUpdateTask} />

      <h2>Add New Task</h2>
      <TaskForm onAddTask={onAddTask} />
    </div>
  );
}
