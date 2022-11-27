import Admin from "../models/admin";
import passport from "passport";

export const renderSignUpFormad = (req, res) => res.render("adminap");

export const adminap = async (req, res) => {
  let errors = [];
  const {  emailad, passwordad} = req.body;

  if (passwordad.length < 4) {
    errors.push({ text: "La contraseña debe tener mas de 4 caracteres." });
  }

  if (errors.length > 0) {
    return res.render("adminap", {
      errors,
      emailad,
      passwordad,
    });
  }

  // Look for email coincidence
  const adminFound = await Admin.findOne({ emailad: emailad });
  if (adminFound) {
    req.flash("error_msg", "Este email ya esta en uso.");
    return res.redirect("/adminap");
  }

  // Saving a New User
  const newAdmin = new Admin({ emailad, passwordad });
  newAdmin.passwordad = await newAdmin.encryptPassword(passwordad);
  await newAdmin.save();
  req.flash("success_msg", "Administrador registrado.");
  res.redirect("/adminin");
};

export const renderSigninFormad = (req, res) => res.render("adminin");

export const adminin = passport.authenticate("local", {
  successRedirect: "/cursosad",
  failureRedirect: "/adminin",
  failureFlash: true,
});


export const logoutad = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Ya no estas logeado.");
    res.redirect("/");
  });
};