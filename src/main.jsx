import { createRoot } from "react-dom/client";
import React from "react";
import { HashRouter } from "react-router-dom";
import { Application } from "./components/tasks/application.jsx";

createRoot(document.getElementById("app")).render(
  <HashRouter>
    <Application />
  </HashRouter>,
);
