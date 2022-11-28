import passport from "passport";
import { Strategy as LocalStrategy2 } from "passport-local";

import Admin from "../models/admin.js";

passport.use(
  new LocalStrategy2(
    {
      usernameField: "emailad",
    },
    async (emailad, password, done) => {
      // Match Email's Admin
      const admin = await Admin.findOne({ emailad:emailad});

      if (!admin) {
        return done(null, false, { message: "Admin no encontrado." });
      }

      // Match Password's Admin
      const isMatch = await admin.comparePassword(password);
      if (!isMatch)
        return done(null, false, { message: "Contraseña incorrecta." });
      
      return done(null, admin);
    }
  )
);

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser((id, done) => {
  Admin.findById(id, (err, admin) => {
    done(err, admin);
  });
});