import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const usersFilePath = path.join(__dirname, "src/data/users.json");
  const ordersFilePath = path.join(__dirname, "src/data/orders.json");

  // Helper functions to read/write JSON
  const getUsers = () => {
    try {
      if (fs.existsSync(usersFilePath)) {
        return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
      }
    } catch (e) {
      console.error("Error reading users file", e);
    }
    return [
      {
        id: "admin-1",
        email: "admin@gmail.com",
        password: "Admin!@#007",
        name: "Royal Attar Admin",
        role: "admin",
      },
    ];
  };

  const getOrders = () => {
    try {
      if (fs.existsSync(ordersFilePath)) {
        return JSON.parse(fs.readFileSync(ordersFilePath, "utf-8"));
      }
    } catch (e) {
      console.error("Error reading orders file", e);
    }
    return [];
  };

  const saveOrders = (orders: any[]) => {
    try {
      fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), "utf-8");
    } catch (e) {
      console.error("Error saving orders file", e);
    }
  };

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Royal Attar API" });
  });

  // Admin Login Endpoint (reads from users.json)
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(
      (u: any) => u.email.toLowerCase() === (email || "").toLowerCase() && u.password === password
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = `token-${user.id}-${Date.now()}`;
    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  });

  // Verify Admin Session Endpoint
  app.get("/api/admin/verify", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.includes("token-admin-")) {
      return res.status(401).json({ authenticated: false });
    }
    const users = getUsers();
    const user = users[0];
    return res.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  });

  // Get All Orders Endpoint
  app.get("/api/orders", (req, res) => {
    const orders = getOrders();
    return res.json(orders);
  });

  // Create Order Endpoint
  app.post("/api/orders", (req, res) => {
    const newOrder = req.body;
    if (!newOrder || !newOrder.orderId) {
      return res.status(400).json({ error: "Invalid order data" });
    }
    const orders = getOrders();
    orders.unshift(newOrder); // Add to top
    saveOrders(orders);
    return res.json({ success: true, order: newOrder });
  });

  // Update Order Status Endpoint
  app.patch("/api/orders/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const orders = getOrders();
    const orderIndex = orders.findIndex((o: any) => o.orderId === id);
    if (orderIndex === -1) {
      return res.status(404).json({ error: "Order not found" });
    }
    orders[orderIndex].status = status;
    saveOrders(orders);
    return res.json({ success: true, order: orders[orderIndex] });
  });

  // Delete Order Endpoint
  app.delete("/api/orders/:id", (req, res) => {
    const { id } = req.params;
    let orders = getOrders();
    orders = orders.filter((o: any) => o.orderId !== id);
    saveOrders(orders);
    return res.json({ success: true });
  });

  // Serve Vite in development / Static in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
  });
}

startServer();
