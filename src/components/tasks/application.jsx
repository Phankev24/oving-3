import React, { useEffect, useState } from "react";
import { FrontPage } from "./frontPage.jsx";
import { Route, Routes } from "react-router-dom";
import { TaskRoute } from "./taskRoute";

export function Application() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  function handleNewTask(task) {
    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((newTask) => setTasks((old) => [...old, newTask]));
  }

  function handleUpdateTask(id, delta) {
    setTasks((old) => old.map((o) => (id === o.id ? { ...o, ...delta } : o)));

    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(delta),
    }).catch((err) => console.error("Error updating task:", err));
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
