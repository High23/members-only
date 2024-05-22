const express = require("express")
const router = express.Router()
const User = require("../models/user")
const {body, validationResult} = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

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
    body("email", "The email must be a valid email (gmail, outlook, protonmail, etc.).")
    .trim()
    .isLength({min: 3, max: 100})
    .isEmail()
    .custom(async value => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error('E-mail already in use');
        }
    })
    .escape(),
    body("password", "The password needs a uppercase(A), lowercase(A) character as well as a number(1) and a symbol(#).").isStrongPassword({
        minLength: 7,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
    }),
    body("confirmPassword", "The passwords NEED to match.").custom((value, {req}) => {
        return value === req.body.password;
    }),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            membershipStatus: false
        });
        
        if (!errors.isEmpty()) {
            res.render("sign-up-form", {
                user: user,
                errors: errors.array(),
            });
            return
        };
        await user.save();
        res.redirect("/login");
    })
]);

module.exports = router;