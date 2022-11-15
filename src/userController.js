/*
You DONT have to import the User with your username.
Because it's a default export we can nickname it whatever we want.
So import User from "./models"; will work!
You can do User.find() or whatever you need like normal!
*/
import User from "./models/User";

// Add your magic here!
export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home", siteTitle: "Wetube" });
};
export const getJoin = async (req, res) => {
  return res.render("join", { pageTitle: "Join", siteTitle: "Wetube" });
};
export const postJoin = async (req, res) => {
  const { username, name, password, password2 } = req.body;
  return res.redirect("/");
};
export const getLogin = async (req, res) => {};
export const postLogin = async (req, res) => {};
