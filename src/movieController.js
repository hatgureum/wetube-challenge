/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";

// Add your magic here!
export const home = async (req, res) => {
  try {
    const movies = await Movie.find({});
    return res.render("home", { pageTitle: "Home", movies });
  } catch (error) {
    return res.send("server-error : ", error);
  }
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload your movie !" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, summary, year, rating, genres },
  } = req;
  try {
    await Movie.create({
      title,
      summary,
      year,
      rating,
      genres: genres.split(","),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload your movie !",
      errmsg: error.errmsg,
    });
  }
};

export const search = async (req, res) => {
  let movies = [];
  const { keyword } = req.query;
  movies = await Movie.find({
    title: { $regex: new RegExp(`${keyword}`, "i") },
  });
  return res.render("search", { pageTitle: "Search movies !", movies });
};

export const movieDetail = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.render("404", { pageTitle: "No movie" });
  }
  return res.render("movieDetail", { pageTitle: `${movie.title}`, movie });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  return res.render("edit", { pageTitle: `Edit : ${movie.title}`, movie });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, summary, year, rating, genres } = req.body;
  try {
    await Movie.findByIdAndUpdate(id, {
      title,
      summary,
      year,
      rating,
      genres,
    });
    return res.redirect(`/movie/${id}`);
  } catch (error) {
    const movie = await Movie.findById(id);
    return res.render("edit", {
      pageTitle: `Edit : ${movie.title}`,
      movie,
      errmsg: error.errmsg,
    });
  }
};

export const movieDelete = async (req, res) => {
  const { id } = req.params;
  await Movie.findByIdAndDelete(id);
  return res.redirect("/");
};
