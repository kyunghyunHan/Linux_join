const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag, Payment, Comment } = require('../models');

const router = express.Router();

router.get((req, res, next) => {
  res.locals.user = req.user;

  next();
});


router.get('/',(req,res)=>{
  res.render('main');
});
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - 3e' });
});
router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('login', { title: '회원가입 - 3e' });
});
router.get('/logout', isLoggedIn, (req, res) => {
  res.render('logout', { title: '회원가입 - 3e' });
});

//게시글 전체 데이터 가져와서 불러오기

module.exports = router;