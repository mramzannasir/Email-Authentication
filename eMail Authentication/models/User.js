const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  // You can put  unique: true for basic validationn it mean that users can't login with pne email two time simple mean that data base can't duplicate any thing
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
