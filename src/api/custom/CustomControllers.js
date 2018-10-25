const bcrypt = require("bcryptjs");
const { Logins, Customers } = require("./CustomModel");
const Admins = require("../admin/AdminModel");
module.exports = {
  addUserCustom: async (req, res) => {
    const errors = {};
    const {
      username,
      password,
      phone,
      email,
      forename,
      surname,
      add1,
      add2,
      add3,
      postcode
    } = req.body;
    const user = await Logins.findOne({ where: { username: username } });
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }
    Admins.findOne({ where: { username: username } }).then(user => {
      if (user) {
        const errors = {};
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      }
      const newUser = {
        username: username,
        password,
        customer: {
          phone,
          forename,
          surname,
          postcode,
          email,
          add1,
          add2,
          add3
        }
      };
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser;
          Logins.create(newUser, {
            include: [Customers]
          })
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    });
  }
};
