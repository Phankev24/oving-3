import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

let tasks = [
  { id: 0, summary: "Create package.json file", completed: true },
  { id: 1, summary: "List existing tasks", completed: true },
  { id: 2, summary: "Introduce JavaScript", completed: true },
  { id: 3, summary: "Update state for checkboxes", completed: false },
];

// 🟢 Get all tasks
app.get("/api/tasks", (c) => c.json(tasks));

// 🟢 Create new task
app.post("/api/tasks", async (c) => {
  const body = await c.req.json();
  const newTask = { id: Date.now(), ...body };
  tasks.push(newTask);
  return c.json(newTask, 201);
});

// 🟡 Update existing task
app.put("/api/tasks/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return c.text("Not found", 404);

  tasks[index] = { ...tasks[index], ...body };
  return c.json(tasks[index]);
});

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("✅ Hono API running at http://localhost:3000");
