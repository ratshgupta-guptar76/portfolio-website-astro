import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-5b156abf/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form endpoint
app.post("/make-server-5b156abf/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, message } = body;
    
    if (!name || !email || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const key = `contact_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const value = { name, email, message, timestamp: new Date().toISOString() };
    
    await kv.set(key, value);
    
    return c.json({ success: true, message: "Contact saved" });
  } catch (err) {
    console.error("Error saving contact:", err);
    return c.json({ error: "Internal server error", details: err.message }, 500);
  }
});

Deno.serve(app.fetch);