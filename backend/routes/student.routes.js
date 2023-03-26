const router = require('express').Router();
const passport = require('passport');
const { User, Student, Request } = require('../config/database');
const isAuth = require('./authMiddleware').isAuth;
const axios = require('axios')

require('dotenv').config();

const MODEL_URL = process.env.MODEL_URL || "http://localhost:5000";

router.post('/reqRegister', async (req, res, next) => {
    const { email, name, mobile, college, branch, year, rollno } = req.body
    let foundReq = await Request.findOne({ "student.email": email })
    let foundUser = await User.findOne({ email: email })
    if (foundReq) {
        return res.json({ message: "your request is pending", status: false })
    }
    if (foundUser) {
        return res.json({ message: "student present in the system", status: false })
    }
    const newReq = new Request({
        student: {
            email,
            name,
            mobile,
            college,
            branch,
            year,
            rollno
        }
    });

    newReq.save()
        .then((user) => {
            console.log(user);
            res.json({ message: "requested!", status: true })
        })
        .catch(err => console.log(err))
});


router.get('/:id', isAuth, async (req, res, next) => {
    const { id } = req.params
    try {
        let student = await Student.findOne({ userId: id }).populate('userId').select("-userId.hash")
        res.json(student)
    } catch (error) {
        console.log(error)
    }
})

router.patch('/predictPlacement/:userId', isAuth, async (req, res) => {
    const { userId } = req.params
    const { studentData } = req.body
    console.log("studentdata=", studentData)
    try {

        var clientServerOptions = {
            url: MODEL_URL + '/predict',
            data: studentData,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let resposne = await axios(clientServerOptions)

        if (resposne.data) {
            console.log("resposne=", resposne.data)
            studentData.placementStatus = resposne.data?.status || 0
            studentData.packageRange = resposne.data?.package_range || 0
            let student = await Student.findOneAndUpdate({ userId: userId }, {
                $set: { ...studentData }
            }, { new: true }).populate('userId').select("-userId.hash")
            return res.json(student)
        }

    } catch (error) {
        console.log(error)
    }
    res.json(null)
})

module.exports = router;