import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import adminRoutes from "./routes/adminRoutes";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import { apiLimiter } from "./middlewares/rateLimit";
import { initializeDatabase } from "./utils/db";

const app = express();
const port = Number(process.env.PORT ?? 9999);

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "PUT, POST, GET, DELETE, OPTIONS, PATCH",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());
app.use("/api", apiLimiter, adminRoutes);

app.use(errorHandlerMiddleware.notFoundHandler);
app.use(errorHandlerMiddleware.errorHandler);

if (process.env.NODE_ENV !== "test") {
  initializeDatabase()
    .then(() => {
      app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Failed to initialize database:", err);
      process.exit(1);
    });
}

export default app;
