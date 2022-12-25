import { getAllClasses } from "./controllers/class.controller";
import express from "express";
import cors from "cors";
import routes from "./routes/index";
import cookieparser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

export const currentpath = __dirname;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieparser());

app.use(routes);
app.use(errorHandler);
export default app;
