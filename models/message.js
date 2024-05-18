const mongoose = require("mongoose");
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    title: {type: String, minLength: 3, maxLength: 100, required: true},
    timestamp: {type: String, required: true},
    text: {type: String, minLength: 3, maxLength: 250, required: true}
});

module.exports = mongoose.model("Message", MessageSchema)