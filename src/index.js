import "./db";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import movieRouter from "./movieRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(localsMiddleware);
app.use("/", movieRouter);

// Codesanbox does not need PORT :)
const PORT = 4002;
app.listen(PORT, () =>
  console.log(`✅  Server Ready! http://localhost:${PORT}`)
);
