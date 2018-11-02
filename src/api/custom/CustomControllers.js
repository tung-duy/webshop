const bcrypt = require("bcryptjs");
const {
  Logins,
  Customers,
  Orders,
  Delivery_addresses,
  Order_items
} = require("./CustomModel");
const { Admins } = require("../login/LoginModel");

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
              return res.json(user);
            })
            .catch(err => {
              console.log(err);
              return res.json(err);
            });
        });
      });
    });
  },
  createOrder: async (req, res) => {
    const order = req.body;
    const newOrderItem = order.order_items;
    var total = 0;
    await newOrderItem.reduce((x, y) => {
      total = x.price * x.quantity + y.price * y.quantity;
    });
    const customer = await Customers.findById(req.user.id);
    if (customer) {
      Orders.create(
        {
          customer_id: req.user.id,
          registered: req.user.registered,
          payment_type: order.payment_type,
          total,
          status: 0,
          data: Date.now(),
          session: "xd23dnf304d998dcred83c34m5",
          delivery_address: {
            forename: customer.forename,
            surname: customer.surname,
            add1: customer.add1,
            postcode: customer.postcode,
            phone: customer.phone,
            email: customer.email
          },
          order_items: newOrderItem
        },
        {
          include: [Order_items, Delivery_addresses]
        }
      )
        .then(order => {
          if (order) {
            return res.json(order);
          }
        })
        .catch(err => {
          console.log(err);
          return json.json(err);
        });
    } else {
      return res.json({
        succces: "Chưa làm tính năng mua hàng không cần đăng nhập :D"
      });
    }
  }
};
