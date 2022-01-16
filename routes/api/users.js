const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

//@route    GET api/users
//@desc     Register User
//@access   Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters."
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      //see if user exists
    let user = await User.findOne({ email });
    if (user) {
    return res.status(400).json({
        errors: [{ msg: "User already exists" }],
        });
    }
    const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
    });

    user = new User({
        name,
        email,
        avatar,
        password,
    });
    //salt
    const salt = await bcrypt.genSalt(10);
    //hash
    user.password = await bcrypt.hash(password, salt);
    //save
    await user.save();
    
    const payload = {
        user: {
            id: user.id,
        }
    }
    jwt.sign(
        payload, config.get('secret'), 
        { expiresIn: 360000 },
        (err, token) => {
            if (err) throw err;
            res.json({ 
                token
            })
        })
    } catch (err) {
    console.error(err.message);
    res.status(500).send(`There's a server error`);
    }
  }
);

module.exports = router;
