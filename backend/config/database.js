const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
require('dotenv').config();

const conn = process.env.DB_STRING || "mongodb://localhost:27017/";

mongoose.connect(conn + 'placement', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", async function () {
    console.log("Connected successfully");
    await createAdmin()
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


const createAdmin = async () => {
    try {
        let hashedPassword = await bcrypt.hash("admin", 10)
        let admin = await User.find({ userId: 1 })
        if (admin) {
            return
        } else {
            await new User({
                userId: 1,
                email: "admin@gmail.com",
                hash: hashedPassword,
                admin: true
            }).save()
        }
    } catch (error) {
        console.log(error)
    }
}
// Expose the connection
module.exports = { User, Student, Request, db };