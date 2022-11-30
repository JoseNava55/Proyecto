import express from "express";
import exphbs from "express-handlebars";
import indexRoutes from './routes/index';
import path from "path";
import { create } from 'express-handlebars';
import session from "express-session";
import morgan from "morgan";
import passport, { Passport } from "passport";
import "./passport/local-auth";
import flash from "connect-flash";
import multer from "multer";

const storage=multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
})

const app = express();


app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir:path.join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");


//Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'miclave',
    resave: false,
    saveUninitialized:false
    
}));


app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

app.use(multer({
  storage,
  dest: path.join(__dirname, "public/uploads")
}).single("image"));
//Routes
app.use(indexRoutes);

//Static Files
app.use(express.static(path.join(__dirname, "public")));

export default app;