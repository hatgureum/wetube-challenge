import express from "express";
import { home, movieDetail, getAdd, postAdd } from "./movieController";

const movieRouter = express.Router();

// create the '/' route
movieRouter.get("/", home);
// create the /:id route
movieRouter.get("/:id(\\d+)", movieDetail);
// create the /add route (GET + POST)
movieRouter.get("/add", getAdd).post("/add", postAdd);

export default movieRouter;
