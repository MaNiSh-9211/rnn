// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { z } from "zod";
var bfhlRequestSchema = z.object({
  data: z.array(z.string()).min(0, "Data array is required")
});
var bfhlResponseSchema = z.object({
  is_success: z.boolean(),
  // 1. Status
  user_id: z.string(),
  // 2. User ID
  email: z.string(),
  // 3. Email ID  
  roll_number: z.string(),
  // 4. College Roll Number
  even_numbers: z.array(z.string()),
  // 5. Array for even numbers
  odd_numbers: z.array(z.string()),
  // 6. Array for odd numbers
  alphabets: z.array(z.string()),
  // 7. Array for alphabets, converted to uppercase
  special_characters: z.array(z.string()),
  // 8. Array for special characters
  sum: z.string(),
  // 9. Sum of numbers
  concat_string: z.string()
  // 10. Concatenation of alphabets in reverse with alternating caps
});
var errorResponseSchema = z.object({
  is_success: z.literal(false),
  error: z.string()
});

// server/routes.ts
import { ZodError } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/bfhl", (req, res) => {
    try {
      const validatedData = bfhlRequestSchema.parse(req.body);
      const { data } = validatedData;
      const oddNumbers = [];
      const evenNumbers = [];
      const alphabets = [];
      const specialCharacters = [];
      let sum = 0;
      data.forEach((item) => {
        if (/^\d+$/.test(item)) {
          const num = parseInt(item, 10);
          sum += num;
          if (num % 2 === 0) {
            evenNumbers.push(item);
          } else {
            oddNumbers.push(item);
          }
        } else if (/^[a-zA-Z]+$/.test(item)) {
          alphabets.push(item.toUpperCase());
        } else {
          const specialChars = item.replace(/[a-zA-Z0-9]/g, "");
          if (specialChars) {
            specialCharacters.push(...specialChars.split(""));
          }
          if (/^[^a-zA-Z0-9]+$/.test(item)) {
            specialCharacters.push(item);
          }
        }
      });
      const uniqueSpecialChars = Array.from(new Set(specialCharacters)).filter((char) => char.length > 0);
      let concatString = "";
      if (alphabets.length > 0) {
        const allAlphabets = alphabets.join("");
        const reversedString = allAlphabets.split("").reverse().join("");
        concatString = reversedString.split("").map((char, index) => {
          return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        }).join("");
      }
      const response = {
        is_success: true,
        user_id: "abhinav_rana_17091999",
        // Updated to Abhinav Rana
        email: "abhinav.rana@gmail.com",
        roll_number: "2211981008",
        // Updated student ID
        even_numbers: evenNumbers,
        odd_numbers: oddNumbers,
        alphabets,
        special_characters: uniqueSpecialChars,
        sum: sum.toString(),
        concat_string: concatString
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("BFHL API Error:", error);
      let errorResponse;
      if (error instanceof ZodError) {
        errorResponse = {
          is_success: false,
          error: "Invalid request format. " + error.errors.map((e) => e.message).join(", ")
        };
        res.status(400).json(errorResponse);
      } else {
        errorResponse = {
          is_success: false,
          error: "Internal server error occurred"
        };
        res.status(500).json(errorResponse);
      }
    }
  });
  app2.get("/api/bfhl", (req, res) => {
    res.status(200).json({
      operation_code: 1
    });
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import dotenv from "dotenv";
dotenv.config();
var app = express2();
app.use((req, res, next) => {
  if (req.path === "/api/bfhl") {
    next();
  } else {
    express2.json()(req, res, next);
  }
});
app.use("/api/bfhl", express2.raw({ type: "application/json" }), (req, res, next) => {
  if (Buffer.isBuffer(req.body)) {
    try {
      const jsonString = req.body.toString("utf8");
      const normalizedJson = jsonString.replace(/[，、‚‛„‟]/g, ",");
      req.body = JSON.parse(normalizedJson);
    } catch (e) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid JSON format"
      });
    }
  }
  next();
});
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
