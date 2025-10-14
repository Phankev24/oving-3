import React, { useEffect, useState } from "react";
import { FrontPage } from "./frontPage.jsx";
import { Route, Routes } from "react-router-dom";
import { TaskRoute } from "./taskRoute";

const initialTasks = [
  { id: 0, summary: "Create package.json file", completed: true },
  { id: 1, summary: "List existing tasks", completed: true },
  { id: 2, summary: "Introduce JavaScript", completed: true },
  { id: 3, summary: "Update state for checkboxes", completed: false },
];

export function Application() {
  const [tasks, setTasks] = useState(() => {
    const existingTasks = localStorage.getItem("tasks");
    return existingTasks ? JSON.parse(existingTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleNewTask(task) {
    setTasks((old) => [...old, { id: old.length, ...task }]);
  }

  function handleUpdateTask(id, delta) {
    setTasks((old) => old.map((o) => (id === o.id ? { ...o, ...delta } : o)));
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <FrontPage
            tasks={tasks}
            onCompleted={({ id }, completed) =>
              handleUpdateTask(id, { completed })
            }
            onNewTask={handleNewTask}
          />
        }
      />
      <Route
        path="/tasks/:id"
        element={<TaskRoute tasks={tasks} onUpdateTask={handleUpdateTask} />}
      />
    </Routes>
  );
}
