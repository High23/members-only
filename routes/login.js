const express = require("express")
const router = express.Router()
const passport = require('passport')

router.get("/", (req, res) => {
    if (req.session.messages) {
        return res.render("login", {invalid: req.session.messages})
    }
    res.render("login")
})

router.post("/", passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureMessage: "Invalid email/password" }));

module.exports = router