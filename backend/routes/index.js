const router = require('express').Router();
const passport = require('passport');
const { User } = require('../config/database');
const isAuth = require('./authMiddleware').isAuth;
const bcrypt = require('bcrypt');
const axios = require('axios')

require('dotenv').config();

const MODEL_URL = process.env.MODEL_URL || "http://localhost:5000";

router.get('/', (req, res) => {
    res.send("Hello from node")
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.json(info);
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.json(req.user);
                console.log(req.user);
            });
        }
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err)
    });
    res.send({ message: "logout!" })
});

router.patch('/changePassword', isAuth, async (req, res, next) => {
    const id = req.user._id
    const { oldPassword, newPassword } = req.body
    try {
        let user = await User.findById(id)
        if (await bcrypt.compare(oldPassword, user.hash)) {
            let hashedPassword = await bcrypt.hash(newPassword, 10)
            User.findByIdAndUpdate(id, {
                $set: { hash: hashedPassword }
            }).then(() => {
                res.json({ message: "password updated!" })
            }).catch(err => console.log(err))
        } else {
            res.json({ message: "old password incorrect" })
        }
    } catch (error) {
        console.log(error)
    }
});

router.get("/flask", async (req, res) => {
    try {
        let res = await axios.get(MODEL_URL)

        if (res.data) {
            console.log("resposne=", res.data)
        }

    } catch (error) {
        console.log(error)
    }
    res.json({ message: "check logs" })

})

module.exports = router;