const express = require("express")
const router = express.Router()
const passport = require('passport')

router.get("/", (req, res) => {
    if (req.session.messages) {
        return res.render("login", {invalid: req.session.messages})
    }
    res.render("login")
})

router.post("/", passport.authenticate('local', { failureRedirect: '/login', failureMessage: "Invalid email/password", successRedirect: '/'}));

module.exports = router