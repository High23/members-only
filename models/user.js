const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {type: String, minLength: 1, maxLength: 50, required: true},
    lastName: {type: String, minLength: 1, maxLength: 50, required: true},
    email: {type: String, minLength: 3, maxLength: 100, required: true},
    password: {type: String, minLength: 7, required: true},
    membershipStatus: {type: Boolean},
});

module.exports = mongoose.model("User", UserSchema)