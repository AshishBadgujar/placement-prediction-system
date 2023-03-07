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

// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser((userId, done) => {
//     User.findById(userId)
//         .then((user) => {
//             done(null, user);
//         })
//         .catch(err => done(err))
// });

//----------------------------------------------------------------------------

// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')

// function initialize(passport, getUserByEmail, getUserById) {
//     const authenticateUser = async (email, password, done) => {
//         const user = getUserByEmail(email)
//         if (user == null) {
//             return done(null, false, { message: "no user with email" })
//         }
//         try {
//             if (await bcrypt.compare(password, user.password)) {
//                 return done(null, user)
//             } else {
//                 return done(null, false, { message: "incorrect password" })
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser))
//     passport.serializeUser((user, done) => done(null, user._id))
//     passport.deserializeUser((_id, done) => {
//         return done(null, getUserById(_id))
//     })
// }

// module.exports = initialize