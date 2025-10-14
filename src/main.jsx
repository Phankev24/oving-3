// import React, { useState } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { FrontPage } from "./components/tasks/frontPage.jsx";
// import { TaskDetails } from "./components/tasks/taskDetails.jsx";
//
// function Application() {
//   const [tasks, setTasks] = useState([
//     { id: 0, summary: "Create npm app", description: "First", complete: true },
//     {
//       id: 1,
//       summary: "Create react app",
//       description: "Second",
//       complete: true,
//     },
//     {
//       id: 2,
//       summary: "Insert new tasks",
//       description: "Third",
//       complete: true,
//     },
//     {
//       id: 3,
//       summary: "Update task status",
//       description: "Fourth",
//       complete: false,
//     },
//   ]);
//
//   function handleNewTask(task) {
//     setTasks((old) => [...old, { id: old.length, ...task }]);
//   }
//
//   function handleChange(id, task) {
//     setTasks((old) => old.map((o) => (o.id === id ? { ...o, ...task } : o)));
//   }
//
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <FrontPage
//             tasks={tasks}
//             onItemChecked={(id, complete) => handleChange(id, { complete })}
//             onNewTask={handleNewTask}
//           />
//         }
//       />
//       <Route
//         path="/tasks/:id"
//         element={<TaskDetails tasks={tasks} onChange={handleChange} />}
//       />
//       <Route path="*" element={<h1>Not found</h1>} />
//     </Routes>
//   );
// }
//
// createRoot(document.getElementById("app")).render(
//   <BrowserRouter>
//     <Application />
//   </BrowserRouter>,
// );

import { createRoot } from "react-dom/client";
import React from "react";
import { HashRouter } from "react-router-dom";
import { Application } from "./components/tasks/application.jsx";

createRoot(document.getElementById("app")).render(
  <HashRouter>
    <Application />
  </HashRouter>,
);
