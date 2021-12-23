const express = require('express');
const { Post,User } = require('../models');
const router  = express.Router();
router.use((req, res, next) => {
    res.locals.user = req.user;
  
    next();
  });
  
router.get('/', async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        order: [['id', 'DESC']],
      });
      res.render('card', {
        title: 'twitrs',
        twits: posts,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  router.get('/', async (req, res, next) => {
    try {
      const posts = await User.findAll({
        order: [['id', 'DESC']],
      });
      res.render('card', {

        pro: posts,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  router.route('/:id').get(async(req,res)=>{
    try {
      
       await Post.destroy({where:{id:req.params.id}});
          res.redirect('/card');
    } catch (err) {
      console.error(err);
          next(err);
    }
  });
  module.exports = router;
module.exports=router;