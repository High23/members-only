const express = require('express');
const { isAuth } = require('../public/javascripts/isAuth');
const { body } = require('express-validator');
const User = require('../models/user');
const Message = require('../models/message');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const messages = Message.find({}).exec();

  if (req.isAuthenticated()) {
    return res.render('index', { 
      authenticated: true, 
      membership: req.user.membershipStatus, 
      messages: messages
    });
  };

  res.render('index', { messages: messages });
});

router.get('/logout', isAuth, function(req, res, next) {
  return res.render('logout', { authenticated: true });
});

router.post('/logout', function(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
  
});

router.get('/join-members', isAuth, function(req, res, next) {
  return res.render('join', {authenticated: true})
});

router.post('/join-members', isAuth, body('membersCode').trim(), expressAsyncHandler(async function(req, res, next) {
  if (req.body.membersCode === '123') {
    const userCopy = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      password: req.user.password,
      membershipStatus: true,
      _id: req.user.id
    }
    const user = await User.findByIdAndDelete(req.user.id, userCopy, {}).exec();
    res.render('join', {authenticated: true, result: "You are now a member!! :)"})
  }
}));

module.exports = router;
