const router = require('express').Router();
const passport = require('passport');
const { User, Student, Request } = require('../config/database');
const isAuth = require('./authMiddleware').isAuth;
const bcrypt = require('bcrypt')
const request = require('request')

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
    try {

        var clientServerOptions = {
            uri: 'http://localhost:5000/predict',
            body: JSON.stringify(studentData),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request(clientServerOptions, async function (error, response) {
            console.log(error, response.body);
            if (error) {
                return res.status(400)
            };
            if (response.body) {
                studentData.placementPrediction = JSON.parse(response.body).success
                let student = await Student.findOneAndUpdate({ userId: userId }, {
                    $set: { ...studentData }
                }, { new: true }).populate('userId').select("-userId.hash")

                return res.json(student)
            }
            res.json(null)
        });

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;