const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
    text: String,
    date: String
});

const userSchema = new mongoose.Schema({
    username: String,
    messages: messagesSchema
});

const User = mongoose.model("user", userSchema);

module.exports = {
    User
}