/*
You DONT have to import the User with your username.
Because it's a default export we can nickname it whatever we want.
So import User from "./models"; will work!
You can do User.find() or whatever you need like normal!
*/
import User from "./models/User";
import bcrypt from "bcrypt";

// Add your magic here!
export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};
export const getJoin = async (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { username, name, password, password2 } = req.body;
  const pageTitle = "Join";
  try {
    const exist = await User.findOne({ username });
    if (exist) {
      return res.status(400).render("join", {
        pageTitle,
        errmsg: "The username already exists",
      });
    }

    if (password !== password2) {
      return res.status(400).render("join", {
        pageTitle,
        errmsg: "wrong password confirmation",
      });
    }
  } catch (error) {
    console.log(error);
    return res.render("join", {
      pageTitle,
      errmsg: error.errmsg,
    });
  }

  await User.create({
    username,
    name,
    password,
  });

  return res.redirect("/login");
};

export const getLogin = async (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.render("login", {
      pageTitle,
      errmsg: "The username does not exist.",
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render("login", {
      pageTitle,
      errmsg: "wrong password",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};
