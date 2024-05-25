const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {type: String, minLength: 1, maxLength: 50, required: true},
    lastName: {type: String, minLength: 1, maxLength: 50, required: true},
    email: {type: String, minLength: 3, maxLength: 100, required: true},
    password: {type: String, minLength: 7, required: true},
    membershipStatus: {type: Boolean},
    admin: {type: Boolean},
});

UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
})

module.exports = mongoose.model("User", UserSchema)