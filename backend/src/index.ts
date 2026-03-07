import "dotenv/config";
import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes";
import errorHandlerMiddleware from "./middlewares/errorHandler";
const app = express();
const port = Number(process.env.PORT ?? 9999);

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "PUT, POST, GET, DELETE, OPTIONS, PATCH",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", adminRoutes);

app.use(errorHandlerMiddleware.notFoundHandler);
app.use(errorHandlerMiddleware.errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}

export default app;
