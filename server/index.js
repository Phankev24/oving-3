import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

// In-memory tasks with all fields
let tasks = [
  {
    id: 0,
    summary: "Create package.json file",
    completed: true,
    category: "Setup",
    status: "Done",
    dueDate: "2025-10-15",
    owner: "Kevin",
  },
  {
    id: 1,
    summary: "List existing tasks",
    completed: true,
    category: "Planning",
    status: "Done",
    dueDate: "2025-10-16",
    owner: "Kevin",
  },
  {
    id: 2,
    summary: "Introduce JavaScript",
    completed: true,
    category: "Learning",
    status: "Done",
    dueDate: "2025-10-17",
    owner: "Kevin",
  },
  {
    id: 3,
    summary: "Update state for checkboxes",
    completed: false,
    category: "Development",
    status: "In progress",
    dueDate: "2025-10-18",
    owner: "Kevin",
  },
];

// Get all tasks
app.get("/api/tasks", (c) => c.json(tasks));

// Create new task
app.post("/api/tasks", async (c) => {
  const body = await c.req.json();
  const newTask = { id: tasks.length, completed: false, ...body };
  tasks.push(newTask);
  return c.json(newTask);
});

// Update task
app.put("/api/tasks/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const delta = await c.req.json();
  tasks = tasks.map((t) => (t.id === id ? { ...t, ...delta } : t));
  return c.json(tasks.find((t) => t.id === id));
});

// Start server
serve(app, { port: 3000 });
console.log("Hono server running on http://localhost:3000");
