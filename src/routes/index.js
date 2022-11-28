import { Router } from "express"
const router = Router();
import {renderSignUpForm,signup,renderSigninForm,signin,logout} from "../controllers/user.controller.js";
const passport= require('passport');

router.get('/',(req, res, next)=>{
  res.render('index');
});

router.get('/about',(req, res, next)=>{
  res.render('about');
});

router.get('/cursos',isAuthenticated,(req, res, next)=>{
  res.render('cursos');
});

router.get("/signup",renderSignUpForm);

router.post("/signup", signup);

router.get("/signin", renderSigninForm);

router.post("/signin", signin);

router.get("/logout", logout);

router.get('/pusuarios',isAuthenticated,(req, res, next)=>{
  res.render('pusuarios');
});

router.post('/adminin',(req, res, next)=>{
  if(req.body.password == "1234" && (req.body.emailad)== "admin@gmail.com"){
    res.render('adminp');
  }
  else{
    req.flash("error_msg", "Datos incorrectos");
    res.redirect('/adminin');
  }
});

router.get('/adminin',(req, res, next)=>{
  res.render('adminin');
});

function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Usted no esta autorizado.");
    res.redirect("/");
  };


export default router;