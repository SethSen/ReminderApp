let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (database[username] != undefined) {
      if (database[username].password == password) {
        req.session.user = username;
        res.redirect("/reminders");
      } else {
        res.render("auth/login", { error: "Invalid password" });
      }
    } else {
      res.render("auth/login", { error: "Invalid username" });
    }
  },

  registerSubmit: (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (database[username] != undefined) {
      res.render("auth/register", { error: "Username already exists" });
    } else {
      database[username] = { password: password, reminders: [] };
      req.session.user = username;
      res.redirect("/reminders");
    }
  },
};

module.exports = authController;
