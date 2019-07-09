const express = require('express');
const router = express.Router();
const users = require('../model/user');
const article = require('../model/article');
const mongoose = require('mongoose');
const validator = require('validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/ladingstatus',(req,res,next) => {
  if(req.session.user){
    let id = req.session.user._id;
    users.findOne({_id:id}).then(data => {
      res.json({
        code:200,
        num:1,
        data
      })
    })
  } else {
    res.json({
      code:400,
      num:0
    })
  }
})

router.get('/article',(req,res,next) => {
  article.find().populate({
    path: 'author',
    select:'-password -email'
  }).sort({_id:-1}).then(data => {
    res.json({
      code: 200,
      data
    })
  })
})

router.get('/write',function(req,res,next){
  res.render('write');
})

router.get('/details',(req,res,next)=>{
  res.render('details');
})

router.get('/detail',async (req, res, next) => {
    try {
        const id = req.query.id;
        const article1 = await article.findOne({_id:id}).populate({
                path: "author",
                select: "-password -email"
            })
        await article1.update({$inc: {
                looknums: 1
            }})
        res.json({
            code: 200,
            data: article1
        })
    }catch(err) {
        next(err)
    }
})

router.post('/writearticle',(req, res,next) =>{
      let {
          title,
          contentText,
          category
      } = req.body;
      if(req.session.user){ 
          article.create({
              title,
              contentText,
              category,
              author: mongoose.Types.ObjectId(req.session.user._id)
          })
          res.json({
              code: 200,
              msg: "文章添加成功"
          })
      } else { 
          res.json({
              code: 401,
              msg: "未登录不能发表笔记"
          })
      }
})

router.post('/login',async(req,res,next) => {
  try{
    const {email,password} = req.body;
    const user = await users.findOne({email});
    if(user){
      if(password == user.password){
        req.session.user = user;
        res.json({
          code: 200,
          data: {
            avatar: user.avatar,
            email: user.email,
            name: user.name
          }
        })
      } else {
        res.json({
          code:400,
          msg:'密码错误'
        })
      }
    } else {
      res.json({
        code: 400,
        msg: '账号错误或不存在！'
      })
    }
  } catch(err){

  }
})

router.get('/logooff',(req,res,next) => {
  req.session.user = "";
  res.redirect('http://localhost:3000')
})

router.post('/registe',(req,res,next) => {
  const {name, email, password} = req.body;

    console.log(name, email, password)
    users.findOne({email}).then(data => {
        if(data) {
            res.json({
                code: 400,
                msg: '该邮箱已注册'
            })
        }
        else {
            if(validator.isEmail(email)) {
                users.create({name, email, password}).then(data => {
                    res.json({
                        code: 200,
                        msg: '注册成功'
                    })
                })
            }
            else {
                res.json({
                    code: 401,
                    msg: '邮箱格式不正确!'
                })
            }

        }
    })
})

router.use('/register',(req,res,next)=>{
  res.render('register')
})

module.exports = router;
