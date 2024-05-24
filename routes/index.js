const express = require('express');
const { isAuth } = require('../public/javascripts/isAuth');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Message = require('../models/message');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();
const { format } = require('date-fns')

/* GET home page. */
router.get('/', expressAsyncHandler(async function(req, res, next) {
  const messages = await Message.find({}).populate("author").exec();

  if (req.isAuthenticated()) {
    return res.render('index', { 
      authenticated: true, 
      membership: req.user.membershipStatus, 
      messages: messages
    });
  };

  res.render('index', { messages: messages });
}));

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
    const user = await User.findByIdAndUpdate(req.user.id, userCopy, {}).exec();
    res.render('join', {authenticated: true, result: "You are now a member!! :)"})
  }
}));

router.get("/message/create", isAuth, expressAsyncHandler(async function(req, res, next) {
  return res.render("message-form")
}));

router.post("/message/create", isAuth, [
  body("title", "The message title must contain a character count of at least 3 and a max of 75")
  .trim()
  .isLength({min: 3, max: 75})
  .escape(),
  body("text", "The text must contain a character count of at least 3 and a max of 250")
  .trim()
  .isLength({min: 3, max: 250})
  .escape(),

  expressAsyncHandler(async function(req, res, next) {
    const errors = validationResult(req);
    const formattedDate = format(new Date(req.body.date), 'MM/dd/yyyy')
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      timestamp: formattedDate,
      author: req.user._id
    });

    if (!errors.isEmpty()) {
      res.render('message-form', {
        message: message,
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect('/');
    }
  })]
);

module.exports = router;
