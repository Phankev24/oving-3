import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

// Example route
app.get("/", (c) => c.text("Hello from Hono backend!"));

app.get("/api/tasks", (c) =>
  c.json([
    { id: 0, summary: "Create npm app", description: "First", complete: true },
    {
      id: 1,
      summary: "Create React app",
      description: "Second",
      complete: false,
    },
  ]),
);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`✅ Hono server running at http://localhost:${info.port}`);
  },
);
