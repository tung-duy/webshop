const { Admins } = require("./LoginModel");
const { Logins } = require("../custom/CustomModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../../lib/config");

module.exports = {
  register: async (req, res) => {
    const errors = {};
    const { username, password } = req.body;
    Admins.findOne({ where: { username } }).then(user => {
      if (user) {
        errors.username = "Username already exists!";
        return res.status(404).json(errors);
      }
      const newUser = {
        username,
        password
      };
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) console.log(err);
          newUser.password = hash;
          Admins.create(newUser)
            .then(user => res.json({ success: true }))
            .catch(err => console.log(err));
        });
      });
    });
  },
  login: async (req, res) => {
    const errors = {};
    const { username, password } = req.body;
    const user = await Admins.findOne({ where: { username } });
    if (!user) {
      Logins.findOne({ where: { username } }).then(async user => {
        if (!user) {
          errors.username = "Username not found";
          return res.status(404).json(errors);
        } else {
          const checkPass = await bcrypt.compare(password, user.password);
          if (!checkPass) {
            errors.password = "Password incorrect!";
            return res.status(400).json(errors);
          } else {
            const payload = {
              id: user.id,
              username: user.username,
              isAdmin: false
            };
            jwt.sign(
              payload,
              key.SecretOrKey,
              { expiresIn: 60 * 60 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          }
        }
      });
    } else {
      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        errors.password = "Password incorrect!";
        return res.status(400).json(errors);
      } else {
        const payload = {
          id: user.id,
          username: user.username,
          isAdmin: true
        };
        jwt.sign(
          payload,
          key.SecretOrKey,
          { expiresIn: 60 * 60 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      }
    }
  }
};
