import { Router } from "express"
const router = Router();
import {renderSignUpForm,signup,renderSigninForm,signin,logout} from "../controllers/user.controller.js";
const passport= require('passport');
import Curso from "../models/curso"

router.get('/',(req, res, next)=>{
  res.render('index');
});

router.get('/about',(req, res, next)=>{
  res.render('about');
});

router.get('/cursos',isAuthenticated,async(req, res, next)=>{
  const cursos = await Curso.find().lean();

  res.render('cursos',{cursos:cursos});
});

router.get("/signup",renderSignUpForm);

router.post("/signup", signup);

router.get("/signin", renderSigninForm);

router.post("/signin", signin);

router.get("/logout", logout);

router.get('/pusuarios',isAuthenticated,(req, res, next)=>{
  res.render('pusuarios');
});

router.post('/adminin',async(req, res, next)=>{
  if(req.body.password == "1234" && (req.body.emailad)== "admin@gmail.com"){
    res.redirect('adminp');
  }
  else{
    req.flash("error_msg", "Datos incorrectos");
    res.redirect('/adminin');
  }
});

router.get('/adminin',async(req, res, next)=>{
  res.render('adminin');
});
router.get('/adminp',async(req, res, next)=>{
  const cursos = await Curso.find().lean();
    res.render('adminp',{cursos});
});
router.post('/adminp',async(req, res, next)=>{
        const curso =Curso(req.body)
        curso.path='uploads/' + req.file.filename;
        const cursoSaved = await curso.save();
        console.log(cursoSaved);
        res.redirect('/adminp');
});

router.get("/edit/:id",async(req,res)=>{
  //console.log(req.params.id)
const curso = await Curso.findById(req.params.id).lean()

 // res.render("edit");
  res.render("edit",{curso});
});

router.post("/edit/:id",async(req,res)=>{
  console.log(req.params.id);
  const path = 'uploads/' + req.file.filename;
  const {title, description,pricing,video} = req.body;
  await Curso.findByIdAndUpdate(req.params.id,{ title, description,pricing,path,video})
  res.redirect('/adminp');
})

router.get("/delete/:id",async(req,res)=>{
  const { id } = req.params;
  await Curso.findByIdAndDelete(id)
  res.redirect('/adminp');
})

function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Usted no esta autorizado.");
    res.redirect("/");
  };


export default router;