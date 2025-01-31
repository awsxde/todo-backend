import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "./config/passport.config";
import "./jobs/expire-todos.job";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";

dotenv.config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
