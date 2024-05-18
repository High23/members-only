const express = require("express")
const router = express.Router()
const User = require("../models/user")
const {body, validationResult} = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")

router.get("/", (req, res) => res.render("sign-up-form"));

router.post("/",[
    body("firstName")
    .trim()
    .isLength({min: 1, max: 50})
    .escape(),
    body("lastName")
    .trim()
    .isLength({min: 1, max: 50})
    .escape(),
    body("email")
    .trim()
    .isLength({min: 1, max: 50})
    .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        });
        if (!errors.isEmpty()) {
            res.render("sign-up-form", {
                user: user,
                errors: errors.array(),
            });
        };
        await user.save();
        res.redirect("/login");
    })
]);

module.exports = router;