import React from "react";
import { TaskList } from "./taskList.jsx";
import { NewTaskForm } from "./newTaskForm.jsx";

export function FrontPage(props) {
  return (
    <>
      <h1>Tasks</h1>
      <TaskList tasks={props.tasks} onItemChecked={props.onItemChecked} />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={props.onNewTask} />
    </>
  );
}
