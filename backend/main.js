const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
var routes = require('./routes');
var adminRouter = require('./routes/admin.routes');
var studentRouter = require('./routes/student.routes');
require('dotenv').config();
const cors = require("cors");

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
}));

app.use(cookieParser("secretcode"));

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});


app.use("/", routes);
app.use("/admin", adminRouter);
app.use("/student", studentRouter);

app.listen(8080);

//--------------------------------------------------------------------------

// const express = require('express')
// const app = express()
// const bcrypt = require('bcrypt')
// const passport = require('passport')
// const session = require('express-session')
// const initializePassport = require('./config/passport')

// initializePassport(passport,
//     email => users.find(user => user.email == email),
//     _id => users.find(user => user._id == _id)
// )
// const users = []

// require('dotenv').config();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())

// app.post('/login', passport.authenticate('local', {
//     failureFlash: true
// }))
// app.get('/', checkAuthenticated, (req, res) => {
//     res.json({ message: "welcome" })
// })
// app.post('/register', (req, res) => {
//     try {
//         const hashedPassword = bcrypt.hash(req.body.password, 10)
//         users.push({
//             _id: Date.now(),
//             name: req.body.name,
//             password: hashedPassword
//         })
//         res.json({ message: "registration successful" })
//     } catch (error) {
//         console.log(error)
//     }
// })


// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     } else {
//         res.json({ message: "not authenticated" })
//     }
// }

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         res.json({ message: "authenticated" })
//     } else {
//         next()
//     }
// }
// app.listen(3000);
