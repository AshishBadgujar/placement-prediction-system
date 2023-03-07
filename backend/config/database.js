const mongoose = require('mongoose');
const createAdmin = require('./createAdmin');

require('dotenv').config();

const conn = process.env.DB_STRING || "mongodb://localhost:27017/placement";

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
    createAdmin()
});

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    hash: String,
    admin: Boolean
}, { strict: false });

const StudentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { strict: false })

const RegistrationReqSchema = new mongoose.Schema({
    student: {
        email: String,
        name: String,
        mobile: Number,
        college: String,
        branch: String,
        year: Number,
        rollno: String
    }
}, { strict: false })


const User = mongoose.model('User', UserSchema);
const Student = mongoose.model('Student', StudentSchema);
const Request = mongoose.model('Request', RegistrationReqSchema);

// Expose the connection
module.exports = { User, Student, Request, db };