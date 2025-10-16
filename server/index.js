import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

// In-memory tasks
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
    summary: "Learn React basics",
    completed: false,
    category: "Learning",
    status: "In progress",
    dueDate: "2025-10-20",
    owner: "Kevin",
  },
];

// API Routes
app.get("/api/tasks", (c) => {
  return c.json(tasks);
});

app.post("/api/tasks", async (c) => {
  const newTask = await c.req.json();

  newTask.id = tasks.length;
  newTask.completed = newTask.completed || false;

  tasks.push(newTask);
  return c.json(newTask);
});

app.put("/api/tasks/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const updates = await c.req.json();

  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, ...updates };
    }
    return task;
  });

  const updatedTask = tasks.find((task) => task.id === id);
  return c.json(updatedTask);
});

// Serve React app (AFTER API routes so API takes priority)
app.use("*", serveStatic({ root: "../dist" }));

// Start server - Use Heroku's PORT or default to 3000
serve(
  {
    fetch: app.fetch,
    port: parseInt(process.env.PORT || "3000"),
  },
  (info) => {
    console.log(`Server running on http://localhost:${info.port}`);
  },
);
