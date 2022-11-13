import express from "express";
import {
  home,
  getUpload,
  postUpload,
  search,
  movieDetail,
  getEdit,
  postEdit,
  movieDelete,
} from "./movieController";

const movieRouter = express.Router();

// Add your magic here!
movieRouter.get("/", home);
movieRouter.route("/upload").get(getUpload).post(postUpload);
movieRouter.get("/search", search);
movieRouter.get("/movie/:id", movieDetail);
movieRouter.route("/movie/:id/edit").get(getEdit).post(postEdit);
movieRouter.get("/movie/:id/delete", movieDelete);

export default movieRouter;
