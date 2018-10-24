const Admins = require("./AdminModel");
const bcrypt = require("bcryptjs");

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
  }
};
