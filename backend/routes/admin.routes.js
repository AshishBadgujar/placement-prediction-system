const router = require('express').Router();
const passport = require('passport');
const { User, Student, Request } = require('../config/database');
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;
const sendEmail = require('../config/emailService')
const bcrypt = require('bcrypt')

router.get('/', isAdmin, async (req, res) => {
    try {
        let admin = await User.findOne({ userId: 1 }).select('-hash')
        res.json(admin)
    } catch (error) {
        console.log(error)
    }
})

router.patch('/updateProfile', isAdmin, async (req, res) => {
    const { email, mobile, name, college } = req.body
    try {
        let updatedAdmin = await User.findOneAndUpdate({ userId: 1 }, {
            $set: {
                email,
                mobile,
                name,
                college,
            }
        }, { new: true }).select("-hash")
        res.json(updatedAdmin)

    } catch (error) {
        console.log(error)
    }
})

router.get('/getStudentReq', isAdmin, async (req, res) => {
    try {
        let requests = await Request.find()
        res.json(requests)
    } catch (error) {
        console.log(error)
    }
})
router.get('/getStudents', isAdmin, async (req, res) => {
    try {
        let students = await Student.find().populate('userId')
        res.json(students)
    } catch (error) {
        console.log(error)
    }
})

router.patch('/approveReq/:reqId', isAdmin, async (req, res) => {
    const { reqId } = req.params
    try {
        let request = await Request.findByIdAndRemove(reqId)
        if (!request) {
            return res.json({ message: "something went wrong", status: false })
        }
        let newPassword = String(Date.now())
        let hashedPassword = await bcrypt.hash(newPassword, 10)

        let newUser = await new User({
            hash: hashedPassword,
            admin: false,
            ...request.student
        }).save()

        await new Student({
            userId: newUser._id,
        }).save()

        sendEmail(request.student.email, "Your request approved", `Great your registration request approved by admin, now you can login with the following credentials \n email: ${request.student.email} \n password: ${newPassword}`)
        res.json({ message: "request approved", status: true })

    } catch (error) {
        console.log(error)
    }
})
router.patch('/rejectReq/:reqId', isAdmin, async (req, res) => {
    const { reqId } = req.params
    try {
        let request = await Request.findByIdAndRemove(reqId)
        if (!request) {
            return res.json({ message: "something went wrong", status: false })
        }
        await sendEmail(request.student.email, "Your Request is rejected", "Sorry admin rejected your registration request!")
        res.json({ message: "request rejected", status: true })
    } catch (error) {
        console.log(error)
    }
})

router.delete('/deleteStudent/:studentId', isAdmin, async (req, res, next) => {
    const { studentId } = req.params
    try {
        let student = await Student.findByIdAndDelete(studentId)
        await User.findByIdAndDelete(student.userId)
        res.json({ status: true })
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;