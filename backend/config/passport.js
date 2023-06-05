const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./database');
const bcrypt = require('bcrypt')

const verifyCallback = (email, password, done) => {
    User.findOne({ email: email })
        .then(async (user) => {
            if (user == null) {
                return done(null, false, { message: "no user with email" })
            }
            try {
                if (await bcrypt.compare(password, user.hash)) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: "incorrect password" })
                }
            } catch (error) {
                console.log(error)
            }
        })
        .catch((err) => {
            done(err);
        });

}

const strategy = new LocalStrategy({ usernameField: "email", passwordField: "password" }, verifyCallback);

passport.use(strategy);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
