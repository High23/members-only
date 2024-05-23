const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.render('index', { title: 'Express', authenticated: true });
  }
  res.render('index', { title: 'Express' });
});

router.get('/logout', function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.render('logout', { authenticated: true });
  }
});

router.post('/logout', function(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
  
});

module.exports = router;
