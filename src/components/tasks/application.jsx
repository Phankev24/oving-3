import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { FrontPage } from "./frontPage.jsx";
import { TaskPage } from "./taskPage.jsx";

export function Application() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  function addTask(task) {
    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((newTask) => setTasks([...tasks, newTask]));
  }

  function updateTask(id, changes) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...changes } : task)),
    );

    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <FrontPage
            tasks={tasks}
            onAddTask={addTask}
            onUpdateTask={updateTask}
          />
        }
      />
      <Route
        path="/tasks/:id"
        element={<TaskPage tasks={tasks} onUpdateTask={updateTask} />}
      />
    </Routes>
  );
}
