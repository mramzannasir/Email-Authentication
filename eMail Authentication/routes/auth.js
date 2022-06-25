const { json } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const { findOne } = require("../models/User");
// Create a User using Post " ". Doesn't require any auth

router.post(
  "/",
  [
    body("name", "invalid name").isLength({ min: 4 }),
    // email must be an email
    body("email", "enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be 8 charcter").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res
        .status(400)
        .json({ error: "Invalid email this email already exist" });
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    // .then((user) => res.json(user))
    // .catch((err) => {
    //   console.log(err);
    //   res.json({ err: "Only  unique user can login" });
    // });
    res.json({"Statue": "Done"})
  }
);

module.exports = router;
