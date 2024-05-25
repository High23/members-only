const mongoose = require("mongoose");
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    title: {type: String, minLength: 2, maxLength: 75, required: true},
    timestamp: {type: String, required: true},
    text: {type: String, minLength: 2, maxLength: 250, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', default: undefined},
});

module.exports = mongoose.model("Message", MessageSchema)