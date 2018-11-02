const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  key = require("./config"),
  { Admins } = require("../src/api/login/LoginModel");
const { Logins } = require("../src/api/custom/CustomModel");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.SecretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      if (jwt_payload.isAdmin) {
        Admins.findOne({ where: { id: jwt_payload.id } })
          .then(user => {
            if (user) {
              user.isAdmin = true;
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => done(err, false));
      } else {
        Logins.findOne({ where: { id: jwt_payload.id } })
          .then(user => {
            if (user) {
              user.isAdmin = false;
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => done(err, false));
      }
    })
  );
};
