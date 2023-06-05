const express = require('express');
const session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
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
