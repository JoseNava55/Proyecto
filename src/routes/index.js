import { Router } from "express"
const router = Router();
import {renderSignUpForm,signup,renderSigninForm,signin,logout} from "../controllers/user.controller.js"
import { renderSignUpFormad,adminap,renderSigninFormad,adminin,logoutad } from "../controllers/admin.controller.js";
const passport= require('passport');




router.get('/',(req, res, next)=>{
  res.render('index');
});

router.get('/about',(req, res, next)=>{
  res.render('about');
});

router.get('/cursos',(req, res, next)=>{
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

router.get("/adminap",renderSignUpFormad);

router.post("/adminap", adminap);

router.get("/adminin", renderSigninFormad);

router.post("/adminin", adminin);

router.get("/logout", logoutad);

router.get('/cursosad',(req, res, next)=>{
  res.render('/cursosad');
});


function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Usted no esta autorizado.");
    res.redirect("/signin");
  };


export default router;