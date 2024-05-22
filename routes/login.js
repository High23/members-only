const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => res.render("login"))

router.post("/", asyncHandler(async function(req, res) {
    
}));

module.exports = router