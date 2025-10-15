import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

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
    category: "Frontend",
    status: "Done",
    dueDate: "2025-10-17",
    owner: "Kevin",
  },
];

// GET all tasks
app.get("/api/tasks", (c) => c.json(tasks));

// POST new task
app.post("/api/tasks", async (c) => {
  const body = await c.req.json();
  const newTask = { id: Date.now(), ...body };
  tasks.push(newTask);
  return c.json(newTask, 201);
});

// PUT update task
app.put("/api/tasks/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return c.text("Not found", 404);
  tasks[index] = { ...tasks[index], ...body };
  return c.json(tasks[index]);
});

serve({ fetch: app.fetch, port: 3000 });
console.log("✅ Hono API running at http://localhost:3000");
