const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, requird: true },
  email: { type: String, requird: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
