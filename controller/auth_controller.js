let database = require("../database");
const passport = require("../middleware/passport")

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })(req,res);
  },

  registerSubmit: (req, res) => {
    let user = userController.getUserByEmailIdAndPassword(
      req.body.email,
      req.body.password
    );
    if (user) {
      res.redirect("/register");
    } else {
      database.userModel.push({
        id: database.userModel.length + 1,
        email: req.body.email,
        password: req.body.password,
      });
      res.redirect("/login");
    }
  }
};

module.exports = authController;
