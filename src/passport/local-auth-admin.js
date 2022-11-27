import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import Admin from "../models/admin.js";

passport.use(
    new LocalStrategy(
      {
        adminField: "emailad",
      },
      async (emailad, passwordad, done) => {
        // Match Email's 
        const admin = await Admin.findOne({ emailad: emailad });
  
        if (!admin) {
          return done(null, false, { message: "Admin no encontrado." });
        }
  
        // Match Password's 
        const isMatch = await admin.comparePassword(passwordad);
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
  
