import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { google } from "googleapis";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/index-url", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    try {
      const serviceAccount = JSON.parse(process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT || "{}");
      const auth = new google.auth.GoogleAuth({
        credentials: serviceAccount,
        scopes: ["https://www.googleapis.com/auth/indexing"],
      });

      const indexing = google.indexing({ version: "v3", auth });
      const result = await indexing.urlNotifications.publish({
        requestBody: {
          url,
          type: "URL_UPDATED",
        },
      });

      res.json(result.data);
    } catch (error) {
      console.error("Error indexing URL:", error);
      res.status(500).json({ error: "Failed to index URL" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
