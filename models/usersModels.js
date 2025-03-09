const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    password_confirmation: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);