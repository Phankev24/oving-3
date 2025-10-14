// server.js
import { Hono } from "hono";
import http from "node:http";

const app = new Hono();

let tasks = [
  { id: 0, summary: "Create npm app", description: "First", complete: true },
  { id: 1, summary: "Create react app", description: "Second", complete: true },
  { id: 2, summary: "Insert new tasks", description: "Third", complete: true },
  {
    id: 3,
    summary: "Update task status",
    description: "Fourth",
    complete: false,
  },
];

// Routes
app.get("/api/tasks", (c) => c.json(tasks));

app.post("/api/tasks", async (c) => {
  const body = await c.req.json();
  const newTask = { id: tasks.length, ...body };
  tasks.push(newTask);
  return c.json(newTask);
});

app.patch("/api/tasks/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const delta = await c.req.json();
  tasks = tasks.map((t) => (t.id === id ? { ...t, ...delta } : t));
  const updated = tasks.find((t) => t.id === id);
  return c.json(updated);
});

app.delete("/api/tasks/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  tasks = tasks.filter((t) => t.id !== id);
  return c.json({ success: true });
});

// Use Node’s http server
const server = http.createServer(app.fetch);
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Hono server running on http://localhost:${PORT}`);
});
